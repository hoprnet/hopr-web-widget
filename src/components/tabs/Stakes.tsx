import React from "react";
import Input from "../Input";
import Table from "../Table";
import Button from "../Button";

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
    status: "WITHDRAW"
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
    status: "WITHDRAW"
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

const Stakes = () => {
  return (
    <div id="stake-container" className="content-container">
      <div className="top">
        <h2>Open New Channel</h2>

        <div className="wallet-info">Your Wallet Address: 0xaBc123...</div>
        <div className="wallet-info">Balance: 123.45 HOPR</div>
      </div>

      <div className="align-inputs">
        <Input
          type="text"
          label="FROM:"
          undertext="(That's usually your address)"
        />
        <Input
          type="text"
          label="TO:"
          undertext="(Some other relayer's address)"
        />
        <Input type="number" label="AMOUNT:" undertext="(In HOPR tokens)" />
      </div>
      <Button>STAKE</Button>
      <div className="title">
        <h2>You Staked</h2>
      </div>

      <Table headers={tableHeaders} data={tableData} />
      <style>{`
        .align-inputs {
          height: 150px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .input-and-label {
          width: 570px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .wallet-info {
          font-size: 12px;
        }
        input {
          background: var(--input-color);
          border: 2px solid var(--input-border-color);
          height: 33px;
          width: 390px;
        }

        input:focus {
          outline: none !important;
          border: 2px solid var(--input-focused);
        }

        .top {
          text-align: center;
          margin-bottom: 15px;
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

export default Stakes;
