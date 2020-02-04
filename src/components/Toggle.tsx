import React from "react";
// TODO: investigate: tree shaking should work here
import { WbSunny, Brightness3 } from "@material-ui/icons";
import { themes } from "src/styles/themes";

export interface IToggleProps {
  selected: keyof typeof themes;
  onToggle: () => any;
}

const Toggle = ({ selected, onToggle }: IToggleProps) => {
  return (
    <div className="container">
      <div className="toggle" onClick={onToggle}>
        <div className="square"></div>
        <div className="icon">
          {selected === "light" ? <WbSunny /> : <Brightness3 />}
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
        }

        .toggle {
          display: flex;
          flex-direction: var(--toggle-flex-direction);
          background: var(--secondary-color);
          cursor: pointer;
        }

        .square {
          height: 40px;
          width: 40px;
          border: 2px solid var(--secondary-color);
          background: var(--primary-color);
        }

        .icon {
          display: flex;
          height: 40px;
          width: 40px;
          justify-content: center;
          align-items: center;
          padding: 1px;
          font-size: 40px;
          color: var(--alt-font-color) !important;
        }
      `}</style>
    </div>
  );
};

export default Toggle;
