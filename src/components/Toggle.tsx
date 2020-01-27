import React from "react";

interface IToggle {
  onClick?: any;
}

const Toggle = ({ onClick }: IToggle) => {
  return (
    <div className="toggle-container">
      <div className="toggle" onClick={() => onClick()}>
        <div className="square"></div>
        <div className="icon">
          <div id="sun" className="hidden">
            {/* <i className="material-icons" id="sun" style={{fontSize: "27px"}}>wb_sunny</i> */}
          </div>
          <div id="moon">
            <i className="fas fa-moon"></i>
          </div>
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
