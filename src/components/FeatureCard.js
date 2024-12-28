import React from "react";

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="transform hover:scale-105 transition duration-300 bg-yellow-500 text-white rounded-md p-6">
      <div className="text-4xl mb-4">
        {/* Replace emoji with a block or icon if needed */}
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white">{desc}</p>
    </div>
  );
}

export default FeatureCard;