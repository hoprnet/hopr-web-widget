import React from "react";
import { minifyHex } from "src/utils";

export interface ITableProps {
  headers: string[];
  data: {
    from: string;
    to: string;
    amount: string;
    date: string;
    status: string;
  }[];
}

const Table = ({ headers, data }: ITableProps) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        {data.length !== 0 ? (
          <tbody>
            {data.map(row => {
              return (
                <tr key={row.date}>
                  <td>
                    <a
                      href={`https://etherscan.io/address/${row.from}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {minifyHex(row.from)}
                    </a>
                  </td>
                  <td>
                    <a
                      href={`https://etherscan.io/address/${row.to}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {minifyHex(row.to)}
                    </a>
                  </td>
                  <td>{row.amount}</td>
                  <td>{row.date}</td>
                  <td
                    className={row.status === "WITHDRAW" ? "table-button" : ""}
                  >
                    {row.status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : null}
      </table>
      {data.length === 0 ? (
        <div className="emptyTable">no payment channels found</div>
      ) : null}

      <style jsx>{`
        .table-button {
          background: var(--primary-color);
          outline: 2px solid var(--btn-border);
          color: var(--alt-font-color);
          outline-offset: -2px;
          font-weight: bold;
          cursor: pointer;
          padding: 0;
        }

        .table-button:hover {
          opacity: 80%;
          outline-color: var(--font-color);
        }

        .table-button:active {
          outline-color: var(--font-color);
          background-color: #5a5454;
        }
        .table {
          width: 100%;
        }

        table {
          border-collapse: collapse;
          width: 100%;
        }

        th {
          border: 2px solid var(--border-color);
          background: var(--primary-color);
          color: var(--alt-font-color);
          text-align: center;
          font-size: 18px;
          padding: 8px;
        }

        td {
          color: var(--font-color);
          border: 2px solid var(--border-color);
          background: var(--chart-content-color);
          font-size: 16px;
          text-align: center;
          padding: 8px;
        }

        .emptyTable {
          text-align: center;
          margin: 8px;
        }
      `}</style>
    </div>
  );
};

export default Table;
