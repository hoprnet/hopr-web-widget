import React from "react";
import { observer } from "mobx-react";
import hopr from "../../stores/hopr";
import Table from "../Table";
import { channelsToTableData } from "../../utils";

const tableHeaders = ["From", "To", "Amount", "Opened", "Status"];

const Stats = observer(() => {
  const tableData = channelsToTableData(Array.from(hopr.channels.values()));

  return (
    <div id="stats-container" className="content-container">
      <div className="title">
        <h2 className="h2-alt-margin">HOPR Staking Statistics</h2>
        <div className="font-12 thin">
          The chart below shows the amount of HOPR tokens staked by relay nodes
          (solid line) and the number of open payment channels
        </div>
      </div>

      <div className="chart font-12">[coming soon...]</div>
      <div className="title">
        <h2 className="h2-alt-margin">List of HOPR Payment Channels</h2>
        <div className="font-12 thin">
          The table below shows all HOPR payment channels (past, present and
          pending)
        </div>
      </div>
      <Table headers={tableHeaders} data={tableData} />

      <style>{`
        .chart {
          background: var(--bg-color);
          border: 2px solid var(--secondary-color);
          width: 570px;
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .thin{
          width: 570px;
        }
        .title {
          text-align: center;
          width: 570px;
          margin-bottom: 5px;
          justify-content: center;
          align-items: center;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
});

export default Stats;
