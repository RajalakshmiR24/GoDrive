import React from 'react';

const Table = ({ columns, data, actions }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div>No data available</div>; // Handle empty or invalid data
  }

  return (
    <table className="w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index} className="border border-gray-300 px-4 py-2 text-left">{col.header}</th>
          ))}
          {actions && <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-100">
            {columns.map((col, colIndex) => (
              <td key={colIndex} className="border border-gray-300 px-4 py-2">{row[col.field]}</td>
            ))}
            {actions && (
              <td className="border border-gray-300 px-4 py-2">
                {actions.map((action, actionIndex) => (
                  <button
                    key={actionIndex}
                    onClick={() => action.onClick(row)}
                    className="mr-2 px-3 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded"
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
  );
};

export default Table;
