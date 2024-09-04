// Table.js

import React from 'react';

const Table = ({ columns, data, actions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm font-medium"
              >
                {col.header}
              </th>
            ))}
            {actions && (
              <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm font-medium">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((col, idx) => (
                <td
                  key={idx}
                  className="py-2 px-4 border-b border-gray-200 text-gray-700 text-sm"
                >
                  {row[col.field]}
                </td>
              ))}
              {actions && (
                <td className="py-2 px-4 border-b border-gray-200">
                  {actions
                    .filter((action) => action.visible(row)) // Only show visible actions
                    .map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => action.onClick(row)}
                        className={`${action.color} text-white text-sm px-2 py-1 rounded hover:opacity-75`}
                        disabled={action.disabled && action.disabled(row)}
                      >
                        {action.label}
                      </button>
                    ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
