import React from "react";

const Table = ({ columns, data, rowKey }) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-full overflow-hidden rounded-lg shadow-md">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.index}
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row[rowKey]} className="hover:bg-gray-100">
                {columns.map((column) => (
                  <td
                    key={column.id}
                    className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                    {column.Cell ? column.Cell(row) : row[column.name]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
