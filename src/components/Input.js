
import React from "react";

function Input({ className = "", ...props }) {
  const baseStyles =
    "border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500";
  return <input className={`${baseStyles} ${className}`} {...props} />;
}

export default Input;