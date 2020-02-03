import React, { useState } from "react";
import { observer } from "mobx-react";
import BN from "bn.js";
import Input from "src/components/Input";
import Table from "src/components/Table";
import Button from "src/components/Button";
import StakesModel from "src/models/Stake";
import web3 from "src/stores/web3";
import hopr from "src/stores/hopr";
import { minifyAddress } from "src/utils";
import TableModel from "src/models/Table";

const store = StakesModel.create({
  from: {
    value: ""
  },
  to: {
    value: ""
  },
  unitAmount: {
    value: ""
  }
});

const Stakes = observer(() => {
  const [txError, setTxError] = useState<string | undefined>(undefined);
  const error = [
    txError,
    store.from.error,
    store.to.error,
    store.unitAmount.error
  ].find(v => !!v);

  const list = Array.from(hopr.channels.values()).filter(channel => {
    return channel.sender === web3.account;
  });

  const table = TableModel(list);

  const stake = async () => {
    setTxError(undefined);

    try {
      const funder = web3.account!;
      const amount = web3.web3!.utils.toWei(store.unitAmount.value, "ether")!;

      // not enough hopr
      if (new BN(amount).gt(new BN(hopr.balance))) {
        // testing purposes
        if (hopr.devMode) {
          await hopr.mint({
            recipient: funder,
            amount
          });
        } else {
          return setTxError("not enough HOPR");
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
        sender: store.from.value,
        recipient: store.to.value,
        amount
      });

      setTxError(undefined);
    } catch (error) {
      console.error(error);
      setTxError("Unexpected error");
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
          onChange={e => store.from.set(e.target.value)}
          value={store.from.value}
          errored={!store.from.isOk}
        />
        <Input
          title="An ethereum address"
          type="text"
          label="TO:"
          undertext="(Some other relayer's address)"
          onChange={e => store.to.set(e.target.value)}
          value={store.to.value}
          errored={!store.to.isOk}
        />
        <Input
          title="A number of HOPR tokens"
          type="number"
          label="AMOUNT:"
          undertext="(In HOPR tokens)"
          onChange={e => store.unitAmount.set(e.target.value)}
          value={store.unitAmount.value}
          errored={!store.unitAmount.isOk}
        />
      </div>
      <Button disabled={store.disabled} onClick={stake}>
        STAKE
      </Button>
      {typeof error !== "undefined" ? error : null}
      <div className="title">
        <h2>You Staked</h2>
      </div>

      <Table headers={table.columns} data={table.rows} />

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
