import React from "react";
import { observer } from "mobx-react";
import TableModel from "src/models/Table";
import hopr from "src/stores/hopr";
import Table from "src/components/Table";
import Chart from "src/components/Chart";

const Stats = observer(() => {
  const table = TableModel(Array.from(hopr.channels.values()));

  return (
    <div className="container">
      <div className="chart-container">
        <div className="title">
          <h2>HOPR Staking Statistics</h2>
          <div className="thin">
            The chart below shows the amount of HOPR tokens staked by relay
            nodes (solid line) and the number of open payment channels
          </div>
        </div>
        {/* <div className="chart">[coming soon...]</div> */}
        <div className="chart">
          <Chart />
        </div>
      </div>

      <div className="table-container">
        <div className="title">
          <h2>List of HOPR Payment Channels</h2>
          <div className="thin">
            The table below shows all HOPR payment channels (past, present and
            pending)
          </div>
        </div>
        <Table columns={table.columns} rows={table.rows} />
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .chart-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 90%;
        }

        .table-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .title {
          text-align: center;
          margin-bottom: 5px;
          justify-content: center;
          align-items: center;
          display: flex;
          flex-direction: column;
        }

        .thin {
          width: 570px;
        }

        .chart {
          background: var(--bg-color);
          border: 2px solid var(--secondary-color);
          width: 100%;
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
});

export default Stats;
