import moment from "moment";
import { Instance } from "mobx-state-tree";
import { Channel } from "./models/Hopr";
import { ITableProps } from "./components/Table";

export const minifyAddress = (address: string) => {
  return `${address.substr(0, 5)}...`;
};

export const toCustomDateFormat = (timestamp: number) => {
  return moment(timestamp).format("MMM Do [']YY");
};

export const channelsToTableData = (
  channels: Instance<typeof Channel>[]
): ITableProps["data"] => {
  return channels.map(channel => ({
    from: {
      link: `https://etherscan.io/address/${channel.sender}`,
      address: minifyAddress(channel.sender)
    },
    to: {
      link: `https://etherscan.io/address/${channel.recipient}`,
      address: minifyAddress(channel.recipient)
    },
    amount: channel.depositInHopr,
    date: toCustomDateFormat(channel.createdAt),
    status: channel.status
  }));
};
