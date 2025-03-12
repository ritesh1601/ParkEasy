import React, { useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import MapControls from "./MapControls";
import SpotMarker from "./SpotMarker";

const ParkingMap = ({
  initialCenter = { lat: 37.7749, lng: -122.4194 }, // San Francisco
  initialZoom = 14,
  spots = defaultSpots,
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
      if (spot.price < filters.priceRange[0] || spot.price > filters.priceRange[1]) {
        return false;
      }
      if (filters.parkingType !== "all" && spot.type !== filters.parkingType) {
        return false;
      }
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
        <MapControls
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onLocationSelect={handleLocationSelect}
        />
      </div>

      <div ref={mapRef} className="w-full h-full bg-blue-50 flex items-center justify-center relative">
        <div className="text-center text-gray-500">
          <p className="text-xl font-semibold mb-2">Interactive Map</p>
          <p className="text-sm">Google Maps would be integrated here in a production environment</p>
        </div>
        <div className="absolute inset-0">
          <div className="w-full h-full grid grid-cols-5 grid-rows-5">
            {filteredSpots.map((spot, index) => {
              const row = Math.floor(index / 5) + 1;
              const col = (index % 5) + 1;

              return (
                <div
                  key={spot.id}
                  className={cn("flex items-center justify-center", `row-start-${row} col-start-${col}`)}
                  style={{ gridRow: row, gridColumn: col }}
                >
                  <SpotMarker
                    id={spot.id}
                    lat={spot.lat}
                    lng={spot.lng}
                    price={spot.price}
                    available={spot.available}
                    type={spot.type}
                    onClick={() => handleSpotClick(spot)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white bg-opacity-70 px-2 py-1 rounded">
        Map data would be attributed to Google Maps
      </div>
    </div>
  );
};

const defaultSpots = [
  { id: "spot-1", lat: 37.7749, lng: -122.4194, price: 15, available: true, type: "standard", name: "Downtown Parking Spot A", address: "123 Market St, San Francisco" },
  { id: "spot-2", lat: 37.7833, lng: -122.4167, price: 20, available: true, type: "premium", name: "Premium Garage Spot", address: "456 Mission St, San Francisco" },
  { id: "spot-3", lat: 37.7694, lng: -122.4862, price: 10, available: false, type: "standard", name: "Sunset District Parking", address: "789 Irving St, San Francisco" },
  { id: "spot-4", lat: 37.7835, lng: -122.4096, price: 25, available: true, type: "premium", name: "Financial District Premium", address: "101 California St, San Francisco" },
  { id: "spot-5", lat: 37.7648, lng: -122.4186, price: 12, available: true, type: "standard", name: "Mission District Spot", address: "555 Valencia St, San Francisco" },
  { id: "spot-6", lat: 37.8015, lng: -122.4201, price: 18, available: true, type: "handicap", name: "North Beach Accessible Spot", address: "444 Columbus Ave, San Francisco" },
  { id: "spot-7", lat: 37.7699, lng: -122.4666, price: 8, available: true, type: "standard", name: "Inner Sunset Budget Spot", address: "1234 9th Ave, San Francisco" },
  { id: "spot-8", lat: 37.7855, lng: -122.4012, price: 22, available: false, type: "premium", name: "Embarcadero Center Parking", address: "2 Embarcadero Center, San Francisco" },
  { id: "spot-9", lat: 37.779, lng: -122.4177, price: 14, available: true, type: "standard", name: "Union Square Parking", address: "333 Post St, San Francisco" },
  { id: "spot-10", lat: 37.7765, lng: -122.3942, price: 16, available: true, type: "handicap", name: "SOMA Accessible Parking", address: "888 Folsom St, San Francisco" },
];

export default ParkingMap;