import Web3 from "web3";
import { types, flow } from "mobx-state-tree";

const Web3Model = types
  .model("Web3", {
    account: types.maybe(types.string),
    networkId: types.maybe(types.number),
    notSupported: false
  })
  .volatile<{ web3?: Web3 }>(self => ({
    web3: undefined
  }))
  .views(self => ({
    get exists() {
      return !!self.web3;
    },
    get unlocked() {
      return !!self.account;
    }
  }))
  .actions(self => ({
    setAccount(account: string) {
      self.account = account;
    },
    setNetworkId(networkId: number) {
      self.networkId = networkId;
    }
  }))
  .actions(self => ({
    initialize: flow<void, any[]>(function* initialize() {
      // Modern dapp browsers...
      if (window.ethereum) {
        self.web3 = new Web3(window.ethereum);
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        self.web3 = new Web3(window.web3.currentProvider);
      }
      // Non-dapp browsers...
      else {
        self.notSupported = true;
        console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }

      // update current account
      if (self.web3) {
        const [initialAccount] = yield self.web3.eth.getAccounts();
        self.setAccount(initialAccount);

        const networkId = yield self.web3.eth.net.getId();
        self.setNetworkId(networkId);
      }

      // keep track of networkId and account
      if (window.ethereum) {
        window.ethereum
          .on("chainChanged", (networkId: number) => {
            self.setNetworkId(networkId);
          })
          .on("accountsChanged", ([newAccount]: string[]) => {
            if (self.account === newAccount) return;
            self.setAccount(newAccount);
          });
      }
    })
  }))
  .actions(self => ({
    afterCreate() {
      self.initialize();
    }
  }));

export default Web3Model;
