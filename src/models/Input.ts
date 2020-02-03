import { types } from "mobx-state-tree";

export type IInputProps<V extends any> = {
  valueType: V;
  // TODO: improve types
  validation: (value: any) => string | undefined;
};

const Input = <V extends any>({ valueType, validation }: IInputProps<V>) => {
  return types
    .model("Input", {
      value: valueType,
      updatedOnce: false
    })
    .views(self => ({
      get error(): string | undefined {
        if (!self.updatedOnce) {
          return undefined;
        }

        return validation(self.value);
      }
    }))
    .views(self => ({
      get isOk() {
        return typeof self.error === "undefined";
      }
    }))
    .actions(self => ({
      set(value: typeof self["value"]) {
        if (!self.updatedOnce) {
          self.updatedOnce = true;
        }

        self.value = value;
      }
    }));
};

export default Input;
