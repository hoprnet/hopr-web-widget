import React from "react";

const Button = ({
  children,
  style,
  onClick,
  disabled
}: React.ButtonHTMLAttributes<any>) => {
  return (
    <div
      className={`button ${disabled ? "button-disabled" : ""}`}
      style={style}
      onClick={(...args) => {
        if (disabled || !onClick) {
          return;
        }

        onClick(...args);
      }}
    >
      {children}

      <style jsx>{`
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

        .button-disabled {
          opacity: 75%;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default Button;
