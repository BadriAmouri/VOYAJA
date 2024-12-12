import React from "react";

const RowInput = ({ inputs }) => (
  <div className="row1">
    {inputs.map(({ type, placeholder, value, onChange, required }, index) => (
      <input
        key={index}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    ))}
  </div>
);

export default RowInput;
