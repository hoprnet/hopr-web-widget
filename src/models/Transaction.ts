import { types, flow, SnapshotOut } from "mobx-state-tree";
import { PromiEvent } from "web3-core";

const Transaction = types
  .model("Transaction", {
    status: types.optional(
      types.enumeration(["NONE", "PENDING", "MINED", "ERROR"]),
      "NONE"
    ),
    hash: types.maybeNull(types.string),
    error: types.maybeNull(types.string)
  })
  .actions(self => ({
    // TODO: improve typing
    update(mutation: any) {
      for (const key in mutation) {
        (self as any)[key] = mutation[key];
      }
    },

    reset() {
      self.status = "NONE";
      self.hash = null;
      self.error = null;
    }
  }))
  .actions(self => ({
    run: flow(function* run(fn: () => PromiEvent<any>) {
      if (self.status !== "NONE") {
        self.reset();
      }

      self.update({
        status: "PENDING"
      });

      yield new Promise((resolve, reject) => {
        fn()
          .on("transactionHash", hash => {
            self.update({
              hash: hash
            });
          })
          .on("receipt", receipt => {
            self.update({
              status: "MINED"
            });

            resolve(receipt);
          })
          .on("error", error => {
            self.update({
              status: "ERROR",
              error: error.toString()
            });

            reject(self.error);
          });
      });
    })
  }));

export default Transaction;
