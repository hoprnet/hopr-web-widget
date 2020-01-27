import React from "react";

interface ITable {
  headers: any;
  data?: any;
}

const returnTableHeaders = (headers: any) => {
  return (
    <tr>
      {headers.map((header: string) => (
        <th>{header}</th>
      ))}
    </tr>
  );
};

const returnTableData = (data: any) => {
  return data.map((row: any) => {
    return (
      <tr>
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

const Table = ({ headers, data }: ITable) => {
  return (
    <div className="table">
      <table>
        <thead>{returnTableHeaders(headers)}</thead>
        <tbody>{returnTableData(data)}</tbody>
      </table>

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
          `}</style>
    </div>
  );
};

export default Table;
