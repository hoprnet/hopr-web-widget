import { Instance } from "mobx-state-tree";
import { toCustomDateFormat } from "src/utils";
import { Channel } from "src/models/Hopr";

export type IColumn = string;

export type IRow = {
  from: string;
  to: string;
  amount: string;
  createdAt: string;
  status: string;
  channel: Instance<typeof Channel>;
};

export type ITable = (
  channels: Instance<typeof Channel>[]
) => {
  columns: IColumn[];
  rows: IRow[];
};

const Table: ITable = channels => ({
  columns: ["From", "To", "Amount", "Opened", "Status"],
  rows: channels.map(channel => ({
    from: channel.sender,
    to: channel.recipient,
    amount: channel.depositInHopr,
    createdAt: toCustomDateFormat(channel.createdAt),
    status: channel.status,
    channel
  }))
});

export default Table;
