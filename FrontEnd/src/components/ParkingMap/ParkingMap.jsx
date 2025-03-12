import React, { useState, useCallback, useRef } from "react";
import {MapControls , SpotMarker} from '../index'

const ParkingMap = ({
  initialCenter = { lat: 37.7749, lng: -122.4194 },
  initialZoom = 14,
  spots = [],
  onSpotSelect = () => {},
  onFilterChange = () => {},
}) => {
  const [center, setCenter] = useState(initialCenter);
  const [zoom, setZoom] = useState(initialZoom);
  const [filteredSpots, setFilteredSpots] = useState(spots);
  const mapRef = useRef(null);

  const handleSpotClick = useCallback((spot) => {
    onSpotSelect(spot);
  }, [onSpotSelect]);

  const handleFilterChange = useCallback((filters) => {
    const filtered = spots.filter((spot) => {
      if (spot.price < filters.priceRange[0] || spot.price > filters.priceRange[1]) return false;
      if (filters.parkingType !== "all" && spot.type !== filters.parkingType) return false;
      return true;
    });
    setFilteredSpots(filtered);
    onFilterChange(filters);
  }, [spots, onFilterChange]);

  const handleSearch = useCallback((query) => {
    console.log(`Searching for: ${query}`);
  }, []);

  const handleLocationSelect = useCallback((location) => {
    console.log(`Selected location: ${location}`);
    if (location === "Current Location") {
      setCenter({ lat: 37.7833, lng: -122.4167 });
      setZoom(15);
    }
  }, []);

  return (
    <div className="w-full h-[700px] relative bg-gray-100 flex">
      <div className="absolute left-4 top-4 z-10">
        <MapControls onSearch={handleSearch} onFilterChange={handleFilterChange} onLocationSelect={handleLocationSelect} />
      </div>
      <div ref={mapRef} className="w-full h-full bg-blue-50 flex items-center justify-center relative">
        <div className="text-center text-gray-500">
          <p className="text-xl font-semibold mb-2">Interactive Map</p>
          <p className="text-sm">Google Maps would be integrated here</p>
        </div>
        <div className="absolute inset-0 grid grid-cols-5 grid-rows-5">
          {filteredSpots.map((spot, index) => (
            <div key={spot.id} className="flex items-center justify-center" style={{ gridRow: Math.floor(index / 5) + 1, gridColumn: (index % 5) + 1 }}>
              <SpotMarker {...spot} onClick={() => handleSpotClick(spot)} />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white bg-opacity-70 px-2 py-1 rounded">
        Map data would be attributed to Google Maps
      </div>
    </div>
  );
};

export default ParkingMap;