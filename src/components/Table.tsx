import React from "react";

export interface ITableProps {
  headers: string[];
  data: {
    from: {
      link: string;
      address: string;
    };
    to: {
      link: string;
      address: string;
    };
    amount: string;
    date: string;
    status: string;
  }[];
}

const returnTableHeaders = (headers: ITableProps["headers"]) => {
  return (
    <tr>
      {headers.map(header => (
        <th key={header}>{header}</th>
      ))}
    </tr>
  );
};

const returnTableData = (data: ITableProps["data"]) => {
  return data.map(row => {
    return (
      <tr key={row.date}>
        <td>
          <a href={row.from.link} target="_blank" rel="noopener noreferrer">
            {row.from.address}
          </a>
        </td>
        <td>
          <a href={row.to.link} target="_blank" rel="noopener noreferrer">
            {row.to.address}
          </a>
        </td>
        <td>{row.amount}</td>
        <td>{row.date}</td>
        <td className={row.status === "WITHDRAW" ? "table-button" : ""}>
          {row.status}
        </td>
      </tr>
    );
  });
};

const Table = ({ headers, data }: ITableProps) => {
  return (
    <div className="table">
      <table>
        <thead>{returnTableHeaders(headers)}</thead>
        {data.length !== 0 ? <tbody>{returnTableData(data)}</tbody> : null}
      </table>
      {data.length === 0 ? (
        <div className="emptyTable">no payment channels found</div>
      ) : null}

      <style>{`
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
          width: 620px;
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
