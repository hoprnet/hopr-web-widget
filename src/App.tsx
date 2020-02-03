import React, { useState } from "react";
import tabs from "src/components/tabs";
import Toggle from "src/components/Toggle";
import TabBar from "src/components/TabBar";
import themes from "src/themes";

const App = () => {
  const [theme, setTheme] = useState<keyof typeof themes>("light");
  const [view, setView] = useState<keyof typeof tabs>("Stats");

  return (
    <div className="App" style={theme === "light" ? themes.light : themes.dark}>
      <div className="background">
        <TabBar selected={view} onSelect={newView => setView(newView)} />
        <Toggle
          selected={theme}
          onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
        />

        {view === "Stats" ? (
          <tabs.Stats />
        ) : view === "Stake" ? (
          <tabs.Stake />
        ) : (
          <tabs.Votes />
        )}
      </div>

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
