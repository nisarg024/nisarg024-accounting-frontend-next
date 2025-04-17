import React from "react";

const TabelData = ({ id, value, onChange, disabled, onKeyDown }) => {
  return (
    <td className="p-1">
      <div className="d-flex justify-content-center">
        <input
          id={id}
          type="number"
          className="table-input w-100"
          value={value}
          onChange={onChange}
          disabled={disabled}
          onKeyDown={onKeyDown}
        />
      </div>
    </td>
  );
};

export default TabelData;
