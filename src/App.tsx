import React, { useState } from "react";
// import { getSnapshot } from "mobx-state-tree";
// import Web3 from "web3";
// import hopr from "./stores/hopr";
import Stakes from "./components/tabs/Stakes";
import Stats from "./components/tabs/Stats";
import Votes from "./components/tabs/Votes";
import Toggle from "./components/Toggle";
import Tabbar from "./components/Tabbar";
import { light, dark } from "./themes";

const App = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [view, setView] = useState<"stats" | "stake" | "votes">("stats");

  return (
    <div className="App" style={theme === "light" ? light : dark}>
      <div className="background">
        <Tabbar selected={view} onSelect={newView => setView(newView)} />
        <Toggle
          selected={theme}
          onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
        />

        {view === "stats" ? (
          <Stats />
        ) : view === "stake" ? (
          <Stakes />
        ) : (
          <Votes />
        )}
      </div>

      {/* <div>
        <button
          onClick={() => {
            hopr
              .mint({
                recipient: "0x044c12ca8A14EB9BF67B7325BA7C2Fa7B2e2d1Fd",
                amount: Web3.utils.toWei("1", "ether")
              })
              .then(console.log)
              .catch(console.error);
          }}
        >
          mint
        </button>
        <button
          onClick={() => {
            hopr
              .approve({
                amount: Web3.utils.toWei("1", "ether")
              })
              .then(console.log)
              .catch(console.error);
          }}
        >
          approve
        </button>
        <button
          onClick={() => {
            hopr
              .setHashedSecret()
              .then(console.log)
              .catch(console.error);
          }}
        >
          set hashed secret
        </button>
        <pre>{JSON.stringify(getSnapshot(hopr), null, 2)}</pre>
      </div> */}

      <style>{`
        * {
          font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
          color: var(--font-color);
        }

        body {
          font-style: normal;
          font-weight: bold;
          font-size: 18px;
        }

        h2 {
          font-size: 22px;
          text-align: center;
        }

        a {
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        .font-12 {
          font-size: 12px;
          font-weight: normal;
        }

        .background {
          background: var(--bg-color);
          height: 700px;
          width: 620px;
          border: 2px solid var(--secondary-color);
          align-items: center;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
        }

        .content-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: column;
          width: 620px;
          height: 630px;
        }

        i {
          font-size: 27px;
          color: white;
          margin: 2px;
          margin-top: 4px;
          border: 1px transparent solid;
        }
        .h2-alt-margin {
          margin-bottom: 5px;
        }
      `}</style>
    </div>
  );
};

export default App;
