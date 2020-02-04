import React from "react";

const Votes = () => {
  return (
    <div id="votes-container" className="content-container">
      <div className="title">
        <h2>Voting for HOPR DAO</h2>
      </div>
      <div className="content font-12">[coming soon...]</div>

      <style jsx>{`
        .title {
          text-align: center;
          width: 570px;
          margin-bottom: 5px;
          justify-content: center;
          align-items: center;
          display: flex;
          flex-direction: column;
        }
        .green-border {
          border: 2px solid #33ff00;
        }
        .red-border {
          border: 2px solid #ff0000;
        }
        .align-buttons {
          display: flex;
          width: 570px;
          justify-content: space-between;
          margin: 25px;
        }
        .circle-green {
          background: #00950f;
          border-radius: 50px;
          width: 15px;
          height: 15px;
          margin: 10px;
        }
        .circle-red {
          background: #a50000;
          border-radius: 50px;
          width: 15px;
          height: 15px;
          margin: 10px;
        }
        .vote-results {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 200px;
        }
        .hopr-amount {
          color: var(--hopr-amount-color);
          margin: 10px;
        }
        .vote-percentage {
          margin: 10px;
        }
        .description {
          width: 570px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .votes-bar {
          width: 570px;
          height: 10px;
          display: flex;
          align-items: center;
        }
        .current-votes {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .green-bar {
          width: 287px;
          height: 10px;
          background: #00950f;
          border: 1px solid #000000;
        }
        .red-bar {
          width: 287px;
          height: 10px;
          background: #a50000;
          border: 1px solid #000000;
        }
        .white-bar {
          width: 3px;
          height: 20px;
          background: #ffffff;
          border: 1px solid #000000;
          position: absolute;
          left: 310px;
        }

        .hidden {
          display: none;
        }

        .hidden-icons {
          opacity: 0%;
          width: 0px;
          height: 0px;
          margin: 0px !important;
        }

        .content {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default Votes;

/*
  // Votes UI
    <div className="title">
      <h2>Vote Title</h2>
      <div className="font-12">Created by 0ex13..A915</div>
    </div>
    <div className="description">
      <h2>Description</h2>
      <div className="font-12">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed
        metus sit amet arcu posuere consequat. Nullam sed metus id ex luctus
        dapibus non maximus felis. Vestibulum facilisis dui id fringilla
        pulvinar. Nullam molestie sed dui nec accumsan. Sed non justo
        malesuada, mollis augue et, tempor mauris. Aenean rhoncus velit
        libero, a commodo elit elementum a.
      </div>
    </div>
    <div className="current-votes">
      <h2>Current Votes</h2>
      <div className="votes-bar">
        <div className="green-bar"></div>
        <div className="white-bar"></div>
        <div className="red-bar"></div>
      </div>
    </div>

    <div className="voting-info">
      <div className="vote-results font-12">
        <div className="circle-green"></div>
        YES <span className="vote-percentage">50%</span>
        <span className="hopr-amount">10 HOPR</span>
      </div>
      <div className="vote-results font-12">
        <div className="circle-red"></div>
        NO <span className="vote-percentage">50%</span>
        <span className="hopr-amount">10 HOPR</span>
      </div>
    </div>

      <div className="align-buttons">
        <Button style={{border: "2px solid #33ff00"}}>YES</Button>
        <Button style={{border: "2px solid #ff0000"}}>NO</Button>
    </div>
*/
