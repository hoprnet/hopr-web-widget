import { types } from "mobx-state-tree";
import Web3 from "web3";
import Input from "src/models/Input";
import Transaction from "src/models/Transaction";

const Stake = types
  .model("stake", {
    from: types.optional(
      Input({
        valueType: "",
        validation: value => {
          if (typeof value === "undefined") return undefined;
          if (Web3.utils.isAddress(value)) return undefined;

          return "invalid 'from' address";
        }
      }),
      {}
    ),
    to: types.optional(
      Input({
        valueType: "",
        validation: value => {
          if (typeof value === "undefined") return undefined;
          if (Web3.utils.isAddress(value)) return undefined;

          return "invalid 'to' address";
        }
      }),
      {}
    ),
    unitAmount: types.optional(
      Input({
        valueType: "",
        validation: value => {
          if (typeof value === "undefined") return undefined;
          if (!isNaN(Number(value))) return undefined;

          return "invalid amount";
        }
      }),
      {}
    ),
    approveTx: types.optional(Transaction, {}),
    createtx: types.optional(Transaction, {})
  })
  .views(self => ({
    get amount() {
      if (self.unitAmount.value === "") return "0";

      return Web3.utils.toWei(self.unitAmount.value, "ether");
    },

    get disabled() {
      const valuesUnset = [self.from, self.to, self.unitAmount].some(o => {
        return !o.updatedOnce;
      });
      const valuesNotOk = [self.from, self.to, self.unitAmount].some(o => {
        return !o.isOk;
      });

      return valuesUnset || valuesNotOk;
    }
  }));

export default Stake;
