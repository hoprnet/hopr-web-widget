import React from "react";

interface IButtonPros {
  children?: any;
  onClick?: (...args: any[]) => any;
  style?: React.CSSProperties;
}

const Button = ({ children, style, onClick }: IButtonPros) => {
  return (
    <div className="button" style={style} onClick={onClick}>
      {children}

      <style>{`
        .button {
          background: var(--primary-color);
          border: 2px solid var(--btn-border);
          color: var(--alt-font-color);
          height: 33px;
          width: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .button:active {
          border-color: var(--font-color);
          background-color: #5a5454;
        }

        .button:hover {
          opacity: 80%;
          border-color: var(--font-color);
        }
      `}</style>
    </div>
  );
};

export default Button;
