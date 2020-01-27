import React from "react";
import Stakes from "./components/tabs/Stakes";
import Stats from "./components/tabs/Stats";
import Votes from "./components/tabs/Votes";
import Toggle from "./components/Toggle";
import Tabbar from "./components/Tabbar";

const theme = {
  light: {
    "--primary-color": "#2f2e2e",
    "--secondary-color": "#424242",
    "--font-color": "black",
    "--alt-font-color": "white",
    "--bg-color": "#ececec",
    "--border-color": "#2f2e2e",
    "--btn-border": "black",
    "--chart-content-color": "#d6d6d6",
    "--input-color": "#ffffff",
    "--input-border-color": "#cccccc",
    "--hopr-amount-color": "#828282",
    "--input-focused": "#2f2e2e",
    "--toggle-flex-direction": "row-reverse"
  } as React.CSSProperties,
  dark: {
    "--primary-color": "black",
    "--secondary-color": "#3a3a3a",
    "--font-color": "white",
    "--alt-font-color": "white",
    "--bg-color": "#252525",
    "--border-color": "black",
    "--btn-border": "#3a3a3a",
    "--chart-content-color": "#464646",
    "--input-color": "#313131",
    "--input-border-color": "#5a5454",
    "--hopr-amount-color": "#828282",
    "--input-focused": "white",
    "--toggle-flex-direction": "row"
  } as React.CSSProperties
};

export default class App extends React.Component {
  state = { stats: "active", stakes: "", votes: "", theme: theme.light };

  changeTab = (tab: string) => {
    if (tab === "stake") {
      this.setState({
        stats: "",
        stakes: "active",
        votes: ""
      });
    } else if (tab === "votes") {
      this.setState({
        stats: "",
        stakes: "",
        votes: "active"
      });
    } else {
      this.setState({
        stats: "active",
        stakes: "",
        votes: ""
      });
    }
  };

  toggleTheme = () => {
    if (this.state.theme === theme.light) {
      this.setState({
        theme: theme.dark
      });
    } else {
      this.setState({
        theme: theme.light
      });
    }
  };

  returnContent = () => {
    if (this.state.votes === "active") {
      return <Votes />;
    } else if (this.state.stakes === "active") {
      return <Stakes />;
    } else {
      return <Stats />;
    }
  };

  render() {
    return (
      <div className="App" style={this.state.theme}>
        <div className="background">
          <Tabbar onClick={this.changeTab} state={this.state} />
          <Toggle onClick={this.toggleTheme} />

          {this.returnContent()}
        </div>
        <style>{`
          * {
            font-family: Courier New;
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
  }
}
