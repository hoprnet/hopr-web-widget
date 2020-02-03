import { types } from "mobx-state-tree";
import Web3 from "web3";
import Input, { IInputProps } from "src/models/Input";

const validateAddress: IInputProps<any>["validation"] = value => {
  if (typeof value === "undefined") return undefined;
  if (Web3.utils.isAddress(value)) return undefined;

  return "invalid address";
};

const Stake = types
  .model("stake", {
    from: Input({
      valueType: "",
      validation: validateAddress
    }),
    to: Input({
      valueType: "",
      validation: validateAddress
    }),
    unitAmount: Input({
      valueType: "",
      validation: value => {
        if (typeof value === "undefined") return undefined;
        if (!isNaN(Number(value))) return undefined;

        return "invalid amount";
      }
    })
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
