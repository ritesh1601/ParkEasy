import React from "react";

const SpotMarker = ({
  id = "spot-1",
  price = 15,
  available = true,
  type = "standard",
  onClick = () => {},
}) => {
  // Determine marker color based on availability and type
  const getMarkerColor = () => {
    if (!available) return "bg-gray-400";

    switch (type) {
      case "premium":
        return "bg-purple-500";
      case "handicap":
        return "bg-blue-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <div className="relative">
      <button
        onClick={onClick}
        className={`relative flex items-center justify-center w-10 h-10 rounded-full ${getMarkerColor()} shadow-md hover:scale-110 transition-transform duration-200 border-2 border-white`}
        aria-label={`Parking spot ${id}, ${price} per hour, ${available ? "available" : "unavailable"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5 7 13 7 13s7-8 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="3" />
        </svg>
        <div className="absolute -top-3 -right-3 bg-white text-xs px-1.5 py-0.5 rounded-full shadow-md text-black">
          ${price}
        </div>
      </button>
    </div>
  );
};

export default SpotMarker;
