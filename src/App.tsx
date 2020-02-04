import React, { useState } from "react";
import tabs from "src/components/tabs";
import TabBar from "src/components/TabBar";
import { themes, constants } from "src/styles";

const App = () => {
  const { light, dark } = themes;
  const [theme, setTheme] = useState<keyof typeof themes>("light");
  const [view, setView] = useState<keyof typeof tabs>("Stats");

  const themeClassName =
    theme === "light" ? "global-light-theme" : "global-dark-theme";

  return (
    <div className={`container global-constants ${themeClassName}`}>
      <TabBar
        selectedView={view}
        onSelectView={newView => setView(newView)}
        selectedTheme={theme}
        onToggleTheme={() => setTheme(theme === "light" ? "dark" : "light")}
      />

      {view === "Stats" ? (
        <tabs.Stats />
      ) : view === "Stake" ? (
        <tabs.Stake />
      ) : (
        <tabs.Votes />
      )}

      {/* initialize themes */}
      <style jsx global>
        {constants}
      </style>
      <style jsx>{light}</style>
      <style jsx>{dark}</style>

      <style jsx>{`
        .container {
          display: flex;
          min-height: 700px;
          min-width: 620px;
          justify-content: flex-start;
          flex-direction: column;
          align-items: center;
          background: var(--bg-color);
          border: 2px solid var(--secondary-color);
          color: var(--font-color);
        }
      `}</style>
    </div>
  );
};

export default App;
