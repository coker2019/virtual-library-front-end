import React from "react";

const Input = ({
  label,
  className,
  placeholder,
  type,
  onChange,
  value,
  accept,
  cols,
  rows,
  name,
}) => {
  return (
    <div>
      <label htmlFor={label} className="text-normal">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          cols={cols}
          rows={rows}
          required
          placeholder={placeholder}
          className={`${className} p-2 border border-primaryGreen w-full rounded-sm shadow-sm`}
          name={name}
          onChange={onChange}></textarea>
      ) : (
        <input
          type={type}
          onChange={onChange}
          value={value}
          accept={accept}
          required
          className={`${className} p-2 border border-primarGreen w-full rounded-sm shadow-sm`}
          placeholder={placeholder}
          name={name}
        />
      )}
    </div>
  );
};

export default Input;
