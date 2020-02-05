import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = () => {
  return (
    <div className="loading">
      <CircularProgress
        style={{
          position: "absolute",
          color: "var(--alt-font-color)",
          width: "2vh",
          height: "2vh",
          margin: "1vh",
          top: "-4px",
          left: "108px"
        }}
      />
    </div>
  );
};

export default Loading;
