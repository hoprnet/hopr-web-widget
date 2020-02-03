import React, { useState } from "react";
import { observer } from "mobx-react";
import BN from "bn.js";
import Input from "../Input";
import Table from "../Table";
import Button from "../Button";
import web3 from "../../stores/web3";
import hopr from "../../stores/hopr";
import { minifyAddress, channelsToTableData } from "../../utils";

const tableHeaders = ["From", "To", "Amount", "Opened", "Status"];

const Stakes = observer(() => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [unitAmount, setUnitAmount] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const stakingDisabled = from === "" || to === "" || unitAmount === "";

  const list = Array.from(hopr.channels.values()).filter(channel => {
    return channel.sender === web3.account;
  });

  const tableData = channelsToTableData(list);

  const stake = async () => {
    setError(undefined);

    try {
      const funder = web3.account!;
      const amount = web3.web3?.utils.toWei(unitAmount, "ether")!;

      // not enough hopr
      if (new BN(amount).gt(new BN(hopr.balance))) {
        // testing purposes
        if (hopr.devMode) {
          await hopr.mint({
            recipient: funder,
            amount
          });
        } else {
          return setError("not enough HOPR");
        }
      }

      // unlock hopr
      const allowance = await hopr
        .hoprToken!.methods.allowance(
          funder,
          hopr.hoprChannels!.options.address
        )
        .call();
      if (new BN(amount).gt(new BN(allowance))) {
        await hopr.approve({ amount });
      }

      // create channel
      await hopr.createChannel({
        funder,
        sender: from,
        recipient: to,
        amount
      });

      setError(undefined);
    } catch (error) {
      console.error(error);
      setError("Unexpected error");
    }
  };

  return (
    <div id="stake-container" className="content-container">
      <div className="top">
        <h2>Open New Channel</h2>

        <div className="wallet-info">
          Your Wallet Address:{" "}
          {web3.account ? (
            <a
              href={`https://etherscan.io/address/${web3.account}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {minifyAddress(web3.account)}
            </a>
          ) : (
            "?"
          )}
        </div>
        <div className="wallet-info">
          Balance: {web3.account ? hopr.balanceInHopr : "?"} HOPR
        </div>
      </div>

      <div className="align-inputs">
        <Input
          title="An ethereum address"
          type="text"
          label="FROM:"
          undertext="(That's usually your address)"
          onChange={e => setFrom(e.target.value)}
          value={from}
        />
        <Input
          title="An ethereum address"
          type="text"
          label="TO:"
          undertext="(Some other relayer's address)"
          onChange={e => setTo(e.target.value)}
          value={to}
        />
        <Input
          title="A number of HOPR tokens"
          type="number"
          label="AMOUNT:"
          undertext="(In HOPR tokens)"
          onChange={e => setUnitAmount(e.target.value)}
          value={unitAmount}
        />
      </div>
      <Button disabled={stakingDisabled} onClick={stake}>
        STAKE
      </Button>
      {typeof error !== "undefined" ? error : null}
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
});

export default Stakes;
