import React from "react";

const Loader = ({ className }) => {
  return (
    <div className={`flex justify-center items-center`}>
      <div
        className={`${className}  animate-spin rounded-full border-t-4 border-b-4 border-blue-500`}></div>
    </div>
  );
};

export default Loader;
