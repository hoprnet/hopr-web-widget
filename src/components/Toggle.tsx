import React from "react";
import { WbSunny, Brightness3 } from "@material-ui/icons";

interface IToggleProps {
  selected: "light" | "dark";
  onToggle: () => any;
}

const Toggle = ({ selected, onToggle }: IToggleProps) => {
  return (
    <div className="toggle-container">
      <div className="toggle" onClick={onToggle}>
        <div className="square"></div>
        <div className="icon">
          {selected === "light" ? <WbSunny /> : <Brightness3 />}
        </div>
      </div>
      <style>{`
        .toggle {
          background: var(--secondary-color);
          display: flex;
          cursor: pointer;
          flex-direction: var(--toggle-flex-direction);
        }

        .square {
          background: var(--primary-color);
          border: 2px solid var(--secondary-color);
          height: 33px;
          width: 33px;
        }

        .icon {
          height: 33px;
          width: 33px;
          display: flex;
          color: var(--alt-font-color);
          justify-content: center;
          align-items: center;
          padding: 1px;
          font-size: 33px;
        }

        .icon > * {
          fill: var(--alt-font-color);
        }

        .toggle-container {
          width: 570px;
          justify-content: flex-end;
          display: flex;
          position: absolute;
          top: 82px;
        }
      `}</style>
    </div>
  );
};

export default Toggle;
