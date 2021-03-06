import React from "react";
import Loading from "src/components/Loading";

interface IButton extends React.ButtonHTMLAttributes<any> {
  loading?: boolean;
}

const Button = ({
  children,
  style,
  onClick,
  disabled,
  loading = false
}: IButton) => {
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
      {loading ? <Loading /> : null}

      <style jsx>{`
        .button {
          position: relative;
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
