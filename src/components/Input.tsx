import React from "react";

interface IInput {
  label: string;
  type?: string;
  undertext?: string;
}

const Input = ({ label, type, undertext }: IInput) => (
  <>
    <div className="input-and-label">
      {label}
      <input type={type} />
    </div>
    <div className="font-12">{undertext}</div>

    <style>{`
      .input-and-label {
          width: 570px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .wallet-info {
          font-size: 12px;
        }
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
    `}</style>
  </>
);

export default Input;
