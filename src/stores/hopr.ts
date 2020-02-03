import { when, reaction } from "mobx";
import Hopr from "src/models/Hopr";
import web3Store from "src/stores/web3";

const hopr = Hopr.create();

// initialize once web3 is unlocked
when(
  () => web3Store.ready,
  () => {
    hopr.initialize().catch(console.error);
  }
);

// update balance when account changes
let previousAccount = web3Store.account;
reaction(
  () => {
    if (typeof previousAccount === "undefined") return false;
    if (previousAccount === web3Store.account) return false;

    return true;
  },
  () => {
    hopr.updateBalance().catch(console.error);
  }
);

// reset hopr when networkId changes
let previousNetworkId = web3Store.networkId;
reaction(
  () => {
    if (typeof previousNetworkId === "undefined") return false;
    if (previousNetworkId === web3Store.networkId) return false;

    return true;
  },
  () => {
    hopr.initialize().catch(console.error);
  }
);

export default hopr;
