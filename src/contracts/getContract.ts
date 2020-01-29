import Web3 from "web3";
import HoprTokenAbi from "./abis/HoprToken.json";
import HoprChannelsAbi from "./abis/HoprChannels.json";
import addresses from "./addresses.json";

type Contract = InstanceType<Web3["eth"]["Contract"]>;

const contracts = {
  HoprToken: {
    abi: HoprTokenAbi,
    addresses: {
      5777: {
        address: addresses["5777"].HoprToken,
        contract: undefined
      }
    }
  },
  HoprChannels: {
    abi: HoprChannelsAbi,
    addresses: {
      5777: {
        address: addresses["5777"].HoprChannels,
        contract: undefined
      }
    }
  }
} as {
  [name: string]: {
    abi: any;
    addresses: {
      [networkId: number]: {
        address: string;
        contract?: Contract;
      };
    };
  };
};

const getContract = ({
  web3,
  name,
  networkId
}: {
  web3: Web3;
  name: keyof typeof contracts; // TODO: improve ts name resolution
  networkId: number;
}): Contract => {
  const abi = contracts[name].abi;
  const address = contracts[name].addresses[networkId].address;
  let contract = contracts[name].addresses[networkId].contract;

  if (contract) {
    return contract;
  }

  contract = new web3.eth.Contract(abi, address);
  contracts[name].addresses[networkId].contract = contract;

  return contract;
};

export default getContract;
