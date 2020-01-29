import React from "react";

interface ITabbarProps {
  selected: "stats" | "stake" | "votes";
  onSelect: (view: ITabbarProps["selected"]) => any;
}

const Tabbar = ({ selected, onSelect }: ITabbarProps) => {
  return (
    <div className="tab-bar">
      <div
        id="stats-tab"
        className={`tab ${selected === "stats" ? "selected" : ""}`}
        onClick={() => onSelect("stats")}
      >
        Stats
      </div>
      <div
        id="stake-tab"
        className={`tab ${selected === "stake" ? "selected" : ""}`}
        onClick={() => onSelect("stake")}
      >
        Stake
      </div>
      <div
        id="votes-tab"
        className={`tab ${selected === "votes" ? "selected" : ""}`}
        onClick={() => onSelect("votes")}
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

        .selected {
          opacity: 100%;
          background-color: var(--secondary-color);
        }
      `}</style>
    </div>
  );
};

export default Tabbar;
