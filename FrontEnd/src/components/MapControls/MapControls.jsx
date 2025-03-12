import React, { useState } from "react";
import {
  Search,
  MapPin,
  Filter,
  Sliders,
  Clock,
  DollarSign,
  Car,
  ParkingSquare,
} from "lucide-react";

const MapControls = ({ onSearch = () => {}, onFilterChange = () => {}, onLocationSelect = () => {} }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    priceRange: [0, 50],
    duration: "hourly",
    amenities: [],
    parkingType: "all",
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="w-80 h-[500px] bg-white shadow-md rounded-lg overflow-y-auto p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Find Parking</h2>
        <p className="text-sm text-gray-500">Search and filter available parking spots</p>
      </div>
      <form onSubmit={handleSearchSubmit} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-2 py-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border p-2 rounded-md text-gray-700 hover:bg-gray-100"
          onClick={() => onLocationSelect("Current Location")}
        >
          <MapPin className="h-4 w-4" />
          Use Current Location
        </button>
      </form>

      <div className="mt-6">
        <div className="flex gap-2 border-b pb-2">
          <button className="flex-1 flex items-center gap-1 text-gray-700 font-medium">
            <Filter className="h-4 w-4" /> Filters
          </button>
          <button className="flex-1 flex items-center gap-1 text-gray-700 font-medium">
            <Sliders className="h-4 w-4" /> Sort
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" /> Price Range
            </h3>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.priceRange[0]}
              onChange={(e) => handleFilterChange({ priceRange: [parseInt(e.target.value), filters.priceRange[1]] })}
              className="w-full mt-2"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" /> Duration
            </h3>
            <select
              value={filters.duration}
              onChange={(e) => handleFilterChange({ duration: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div>
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Car className="h-4 w-4" /> Parking Type
            </h3>
            <select
              value={filters.parkingType}
              onChange={(e) => handleFilterChange({ parkingType: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              <option value="all">All Types</option>
              <option value="street">Street Parking</option>
              <option value="garage">Garage</option>
              <option value="lot">Parking Lot</option>
              <option value="private">Private Driveway</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" onClick={() => onFilterChange(filters)}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default MapControls;