import React from "react";

export default function AboutUsCard({ description }) {
  return (
    <div className="text-left about-us bg-white p-6 max-w-[20rem] mx-auto rounded-lg border border-gray-300">
      {/* Title */}
      <h3 className="text-xl font-semibold mb-6">About Us</h3>

      {/* Descriptive Text */}
      <p className="text-sm text-gray-700 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
