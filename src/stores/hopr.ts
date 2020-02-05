import { when, reaction } from "mobx";
import Hopr, { events } from "src/models/Hopr";
import web3Store from "src/stores/web3";

const hopr = Hopr.create();

// initialize once web3 is unlocked
when(
  () => web3Store.ready,
  () => {
    hopr.initialize().catch(console.error);
  }
);

// update user's balance when account changes
// let previousAccount = web3Store.account;
reaction(
  () => web3Store.account,
  () => {
    hopr.initialize().catch(console.error);
  }
);

// reset hopr when networkId changes
let allEventsSubscription: any;
reaction(
  () => web3Store.networkId,
  () => {
    hopr
      .initialize()
      .then(() => {
        events.clear();

        if (typeof allEventsSubscription !== "undefined") {
          try {
            allEventsSubscription.__proto__
              .bind(allEventsSubscription)
              .unsubscribe();
          } catch (error) {
            console.error(error);
          }
        }

        allEventsSubscription = hopr
          .hoprChannels!.events.allEvents({
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
              return hopr.onOpenedChannel({
                ...data.returnValues,
                createdAt
              });
            } else if (data.event === "ClosedChannel") {
              return hopr.onClosedChannel(data.returnValues);
            } else if (data.event === "Withdrawed") {
              return hopr.onWithdrawed(data.returnValues);
            } else if (data.event === "InitiatedChannelClosure") {
              return hopr.onInitiatedChannelClosure(data.returnValues);
            }
          });
      })
      .catch(console.error);
  }
);

export default hopr;
