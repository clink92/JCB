import React from "react";

/**
 * Button Component
 * 
 * Props:
 * - children: React elements or text
 * - className: Additional CSS classes
 * - variant: "outline" | "ghost" | undefined
 * - ...props: Other button attributes
 */
function Button({ children, className = "", variant, ...props }) {
  let baseStyles =
    "inline-flex items-center px-4 py-2 rounded-md font-semibold transition-colors";
  let variantStyles = "";

  if (variant === "outline") {
    variantStyles =
      "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700";
  } else if (variant === "ghost") {
    variantStyles = "text-gray-700 hover:bg-gray-100";
  } else {
    // default or custom color, e.g., bg-yellow-500
    variantStyles = "bg-blue-600 text-white hover:bg-blue-700";
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;