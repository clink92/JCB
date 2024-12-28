
import React from "react";

function Alert({ className = "", children }) {
  return (
    <div
      className={`border border-gray-300 bg-white rounded-md p-4 shadow-md ${className}`}
    >
      {children}
    </div>
  );
}

function AlertDescription({ children }) {
  return <p className="text-gray-600">{children}</p>;
}

export { Alert, AlertDescription };