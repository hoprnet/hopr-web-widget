import React from "react";
import Table from "../Table";

const tableHeaders = ["From", "To", "Amount", "Opened", "Status"];

const tableData = [
  {
    from: {
      link:
        "https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
      address: "0xde0..."
    },
    to: {
      link:
        "https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
      address: "0xde0..."
    },
    amount: 12345.23,
    date: "Aug 1 '19",
    status: "CLOSED"
  },
  {
    from: {
      link:
        "https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
      address: "0xde0..."
    },
    to: {
      link:
        "https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
      address: "0xde0..."
    },
    amount: 12345.23,
    date: "Aug 2 '19",
    status: "PENDING"
  },
  {
    from: {
      link:
        "https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
      address: "0xde0..."
    },
    to: {
      link:
        "https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
      address: "0xde0..."
    },
    amount: 12345.23,
    date: "Aug 3 '19",
    status: "OPEN"
  },
  {
    from: {
      link:
        "https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
      address: "0xde0..."
    },
    to: {
      link:
        "https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
      address: "0xde0..."
    },
    amount: 12345.23,
    date: "Aug 4 '19",
    status: "CLOSED"
  },
  {
    from: {
      link:
        "https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
      address: "0xde0..."
    },
    to: {
      link:
        "https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
      address: "0xde0..."
    },
    amount: 12345.23,
    date: "Aug 5 '19",
    status: "PENDING"
  },
  {
    from: {
      link:
        "https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
      address: "0xde0..."
    },
    to: {
      link:
        "https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
      address: "0xde0..."
    },
    amount: 12345.23,
    date: "Aug 6 '19",
    status: "OPEN"
  }
];

const Stats = () => {
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
};

export default Stats;
