import React from "react";

interface IInputPros {
  label: string;
  type?: string;
  undertext?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
  value?: string;
}

const Input = ({ label, type, undertext, onChange, value }: IInputPros) => (
  <>
    <div className="input-and-label">
      {label}
      <input type={type} onChange={onChange} value={value} />
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
