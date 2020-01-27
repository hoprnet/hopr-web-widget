import React from "react";

interface ITabbar {
  onClick?: any;
  state?: any;
}

const Tabbar = ({ onClick, state }: ITabbar) => {
  return (
    <div className="tab-bar">
      <div
        id="stats-tab"
        className={`tab ${state.stats}`}
        onClick={() => onClick("stats")}
      >
        Stats
      </div>
      <div
        id="stake-tab"
        className={`tab ${state.stakes}`}
        onClick={() => onClick("stake")}
      >
        Stake
      </div>
      <div
        id="votes-tab"
        className={`tab ${state.votes}`}
        onClick={() => onClick("votes")}
      >
        Vote
      </div>
      <style>{`
        .tab-bar {
            height: 42px;
            display: flex;
            margin: 25px;
            margin-bottom: 0px;
            background: var(--primary-color);
        }
        .active {
            background: var(--secondary-color) !important;
            border: 2px solid var(--border-color);
            color: var(--alt-font-color);
        }

        .tab {
            background: var(--primary-color);
            border: 2px solid var(--primary-color);
            color: var(--alt-font-color);
            width: 190px;
            font-size: 24px;
            line-height: 27px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }

        .tab:hover {
            opacity: 80%;
            background-color: var(--secondary-color);
        }

        .tab:active {
            opacity: 100%;
            background-color: var(--secondary-color);
        }
        `}</style>
    </div>
  );
};

export default Tabbar;
