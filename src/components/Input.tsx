import React from "react";

interface IInputPros extends React.InputHTMLAttributes<any> {
  label: string;
  type?: string;
  undertext?: string;
  errored?: boolean;
}

const Input = ({
  label,
  type,
  undertext,
  onChange,
  value,
  errored,
  ...props
}: IInputPros) => (
  <>
    <div className="input-and-label">
      {label}
      <input
        type={type}
        onChange={onChange}
        value={value}
        className={errored ? "input-error" : ""}
        {...props}
      />
    </div>

    <div className="font-12">{undertext}</div>

    <style jsx>{`
      input {
        background: var(--input-color);
        border: 2px solid var(--input-border-color);
        height: 33px;
        width: 390px;
      }

      input:focus {
        outline: none !important;
        border: 2px solid var(--input-focused);
      }

      .input-and-label {
        width: 570px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .input-error {
        border: 2px solid var(--error-color);
      }

      .wallet-info {
        font-size: 12px;
      }
    `}</style>
  </>
);

export default Input;
