import React from "react";

const Wrapper = ({ children }) => {
  return (
    <div className="mt-20 p-5 min-h-screen animate-fade-left">{children}</div>
  );
};

export default Wrapper;
