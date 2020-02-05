import { observable } from "mobx";
import { types, flow } from "mobx-state-tree";
import getContract, { Contract } from "src/contracts/getContract";
import web3Store from "src/stores/web3";

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
      return web3Store.web3!.utils.fromWei(self.deposit, "ether")!;
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

export const events = observable<any>([]);

const Hopr = types
  .model("Hopr", {
    balance: "0",
    channels: types.map(Channel),
    // used for development
    devMode:
      window.location.origin.includes("localhost") ||
      window.location.origin.includes("127.0.0.1")
  })
  .views(self => ({
    get balanceInHopr() {
      return web3Store.web3!.utils.fromWei(self.balance, "ether")!;
    }
  }))
  .volatile<{
    hoprToken?: Contract;
    hoprChannels?: Contract;
  }>(self => ({
    hoprToken: undefined,
    hoprChannels: undefined
  }))
  .actions(self => ({
    updateBalance: flow(function* updateBalance() {
      // get balance
      self.balance = yield self
        .hoprToken!.methods.balanceOf(web3Store.account)
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

      const toBN = web3Store.web3!.utils.toBN!;

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
        yield self
          .hoprChannels!.methods.setHashedSecret(
            web3Store.web3!.utils.keccak256(web3Store.web3!.utils.randomHex(32))
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
        yield self.hoprToken!.methods.mint(recipient, amount).send({
          from: web3Store.account
        });
      }),

      approve: flow(function* createChannel({ amount }: { amount: string }) {
        yield self
          .hoprToken!.methods.approve(
            self.hoprChannels!.options.address,
            amount
          )
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
        yield self
          .hoprChannels!.methods.createChannel(
            funder,
            sender,
            recipient,
            amount
          )
          .send({
            from: web3Store.account
          });
      }),

      initialize: flow(function* initialize() {
        self.hoprToken = getContract({
          web3: web3Store.web3!,
          name: "HoprToken",
          networkId: web3Store.networkId!
        });

        self.hoprChannels = getContract({
          web3: web3Store.web3!,
          name: "HoprChannels",
          networkId: web3Store.networkId!
        });

        if (!web3Store.unlocked) {
          yield web3Store.unlock();
        }

        if (web3Store.unlocked) {
          // get balance
          yield self.updateBalance();
        }

        // listen to hopr events
        if (typeof allEventsSubscription !== "undefined") {
          allEventsSubscription.__proto__
            .bind(allEventsSubscription)
            .unsubscribe();
        }

        allEventsSubscription = self.hoprChannels.events
          .allEvents({
            fromBlock: 0,
            toBlock: "latest"
          })
          .on("data", async (data: any) => {
            const block = await web3Store.web3!.eth.getBlock(data.blockNumber)!;
            const createdAt = Number(block.timestamp) * 1e3;

            events.push({
              data,
              createdAt
            });

            if (data.event === "OpenedChannel") {
              return self.onOpenedChannel({
                ...data.returnValues,
                createdAt
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
