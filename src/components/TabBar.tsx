import React from "react";
import { observer } from "mobx-react";
import tabs from "src/components/tabs";
import Button from "src/components/Button";
import Toggle, { IToggleProps } from "src/components/Toggle";
import web3 from "src/stores/web3";

interface ITabBarProps {
  selectedTheme: IToggleProps["selected"];
  onToggleTheme: IToggleProps["onToggle"];
  selectedView: keyof typeof tabs;
  onSelectView: (view: ITabBarProps["selectedView"]) => any;
}

const TabBar = observer(
  ({
    selectedTheme,
    onToggleTheme,
    selectedView,
    onSelectView
  }: ITabBarProps) => {
    return (
      <div className="container">
        <div className="tabs">
          <div
            id="stats-tab"
            className={`tab ${selectedView === "Stats" ? "selected" : ""}`}
            onClick={() => onSelectView("Stats")}
          >
            Stats
          </div>
          <div
            id="stake-tab"
            className={`tab ${selectedView === "Stake" ? "selected" : ""}`}
            onClick={() => onSelectView("Stake")}
          >
            Stake
          </div>
          <div
            id="votes-tab"
            className={`tab ${selectedView === "Votes" ? "selected" : ""}`}
            onClick={() => onSelectView("Votes")}
          >
            Vote
          </div>
        </div>
        <div className="utilities">
          {!web3.unlocked ? (
            <Button onClick={web3.unlock} style={{ height: "40px" }}>
              Unlock Account
            </Button>
          ) : (
            <span>{` `}</span>
          )}
          <Toggle selected={selectedTheme} onToggle={onToggleTheme} />
        </div>

        <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
            margin: 10px 0 0 0;
            width: 90%;
            min-height: 100px;
          }

          .tabs {
            display: flex;
            flex-direction: row;
            justify-content: center;
            height: 40px;
            background: var(--primary-color);
          }

          .tab {
            display: flex;
            line-height: 27px;
            align-items: center;
            width: 190px;
            justify-content: center;
            border: 2px solid var(--primary-color);
            background: var(--primary-color);
            color: var(--alt-font-color);
            font-size: 24px;
            cursor: pointer;
          }

          .tab:hover {
            opacity: 80%;
            background-color: var(--secondary-color);
          }

          .selected {
            background-color: var(--secondary-color);
          }

          .utilities {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            height: 40px;
            margin-top: 5px;
          }
        `}</style>
      </div>
    );
  }
);

export default TabBar;
