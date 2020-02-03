import { Instance } from "mobx-state-tree";
import { minifyAddress, toCustomDateFormat } from "src/utils";
import { Channel } from "src/models/Hopr";

type IRow = {
  from: string;
  to: string;
  amount: string;
  date: string;
  status: string;
};

type ITable = (
  channels: Instance<typeof Channel>[]
) => {
  columns: string[];
  rows: IRow[];
};

const Table: ITable = channels => ({
  columns: ["From", "To", "Amount", "Opened", "Status"],
  rows: channels.map(channel => ({
    from: minifyAddress(channel.sender),
    to: minifyAddress(channel.recipient),
    amount: channel.depositInHopr,
    date: toCustomDateFormat(channel.createdAt),
    status: channel.status
  }))
});

export default Table;
