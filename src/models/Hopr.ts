import { types, flow } from "mobx-state-tree";
import getContract from "../contracts/getContract";
import web3Store from "../stores/web3";

export const Channel = types
  .model("Channel", {
    id: types.identifier,
    createdAt: types.number,
    funder: types.string,
    sender: types.string,
    recipient: types.string,
    deposit: types.string,
    unsettled: types.string,
    closureTime: types.number,
    isOpen: types.boolean
  })
  .views(self => ({
    get depositInHopr() {
      return web3Store.web3?.utils.fromWei(self.deposit, "ether")!;
    },

    get status(): "OPEN" | "PENDING" | "CLOSED" {
      if (self.closureTime !== 0) {
        return "PENDING";
      }

      if (self.isOpen) {
        return "OPEN";
      }

      return "CLOSED";
    }
  }));

const Hopr = types
  .model("Hopr", {
    balance: "0",
    channels: types.map(Channel)
  })
  .views(self => ({
    get balanceInHopr() {
      return web3Store.web3?.utils.fromWei(self.balance, "ether")!;
    }
  }))
  .actions(self => ({
    updateBalance: flow(function* updateBalance() {
      const hoprToken = getContract({
        web3: web3Store.web3!,
        name: "HoprToken",
        networkId: web3Store.networkId!
      });

      // get balance
      self.balance = yield hoprToken.methods
        .balanceOf(web3Store.account)
        .call();
    }),

    onOpenedChannel({
      createdAt,
      funder,
      sender,
      recipient,
      deposit
    }: {
      createdAt: number;
      funder: string;
      sender: string;
      recipient: string;
      deposit: string;
    }) {
      const id = `${sender}-${recipient}`;

      self.channels.set(id, {
        id,
        createdAt,
        funder,
        sender,
        recipient,
        deposit,
        unsettled: "0",
        closureTime: 0,
        isOpen: true
      });
    },

    onClosedChannel({
      sender,
      recipient,
      senderAmount,
      recipientAmount
    }: {
      sender: string;
      recipient: string;
      senderAmount: string;
      recipientAmount: string;
    }) {
      const id = `${sender}-${recipient}`;

      const channel = self.channels.get(id);
      if (!channel) return;

      channel.isOpen = false;
    },

    onWithdrawed({
      sender,
      recipient,
      recipientAmount
    }: {
      sender: string;
      recipient: string;
      recipientAmount: string;
    }) {
      const id = `${sender}-${recipient}`;

      const channel = self.channels.get(id);
      if (!channel) return;

      const toBN = web3Store.web3?.utils.toBN!;

      channel.deposit = toBN(channel.deposit!)
        .sub(toBN(recipientAmount))
        .toString();
    },

    onInitiatedChannelClosure({
      sender,
      recipient,
      closureTime
    }: {
      sender: string;
      recipient: string;
      closureTime: number;
    }) {
      const id = `${sender}-${recipient}`;

      const channel = self.channels.get(id);
      if (!channel) return;

      channel.closureTime = closureTime;
    }
  }))
  .actions(self => {
    let allEventsSubscription: any;

    return {
      setHashedSecret: flow(function* createChannel() {
        const hoprChannels = getContract({
          web3: web3Store.web3!,
          name: "HoprChannels",
          networkId: web3Store.networkId!
        });

        yield hoprChannels.methods
          .setHashedSecret(
            web3Store.web3?.utils.keccak256(web3Store.web3?.utils.randomHex(32))
          )
          .send({
            from: web3Store.account
          });
      }),

      mint: flow(function* mint({
        recipient,
        amount
      }: {
        recipient: string;
        amount: string;
      }) {
        const hoprToken = getContract({
          web3: web3Store.web3!,
          name: "HoprToken",
          networkId: web3Store.networkId!
        });

        yield hoprToken.methods.mint(recipient, amount).send({
          from: web3Store.account
        });
      }),

      approve: flow(function* createChannel({ amount }: { amount: string }) {
        const hoprToken = getContract({
          web3: web3Store.web3!,
          name: "HoprToken",
          networkId: web3Store.networkId!
        });
        const hoprChannels = getContract({
          web3: web3Store.web3!,
          name: "HoprChannels",
          networkId: web3Store.networkId!
        });

        yield hoprToken.methods
          .approve(hoprChannels.options.address, amount)
          .send({
            from: web3Store.account
          });
      }),

      createChannel: flow(function* createChannel({
        funder,
        sender,
        recipient,
        amount
      }: {
        funder: string;
        sender: string;
        recipient: string;
        amount: string;
      }) {
        const hoprChannels = getContract({
          web3: web3Store.web3!,
          name: "HoprChannels",
          networkId: web3Store.networkId!
        });

        yield hoprChannels.methods
          .createChannel(funder, sender, recipient, amount)
          .send({
            from: web3Store.account
          });
      }),

      initialize: flow(function* initialize() {
        const hoprChannels = getContract({
          web3: web3Store.web3!,
          name: "HoprChannels",
          networkId: web3Store.networkId!
        });

        // get balance
        yield self.updateBalance();

        // listen to hopr events
        if (typeof allEventsSubscription !== "undefined") {
          allEventsSubscription.__proto__
            .bind(allEventsSubscription)
            .unsubscribe();
        }

        allEventsSubscription = hoprChannels.events
          .allEvents({
            fromBlock: 0,
            toBlock: "latest"
          })
          .on("data", async (data: any) => {
            if (data.event === "OpenedChannel") {
              const block = await web3Store.web3?.eth.getBlock(
                data.blockNumber
              )!;

              return self.onOpenedChannel({
                ...data.returnValues,
                createdAt: Number(block.timestamp) * 1e3
              });
            } else if (data.event === "ClosedChannel") {
              return self.onClosedChannel(data.returnValues);
            } else if (data.event === "Withdrawed") {
              return self.onWithdrawed(data.returnValues);
            } else if (data.event === "InitiatedChannelClosure") {
              return self.onInitiatedChannelClosure(data.returnValues);
            }
          });
      })
    };
  });

export default Hopr;
