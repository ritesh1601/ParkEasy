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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const MapControls = ({ onSearch, onFilterChange, onLocationSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    priceRange: [0, 50],
    duration: "hourly",
    amenities: [],
    parkingType: "all",
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    if (onFilterChange) onFilterChange(updatedFilters);
  };

  const handleAmenityToggle = (amenity) => {
    const updatedAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    handleFilterChange({ amenities: updatedAmenities });
  };

  const handleCurrentLocationClick = () => {
    if (onLocationSelect) onLocationSelect("Current Location");
  };

  return (
    <Card className="w-[350px] h-[500px] bg-white overflow-y-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Find Parking</CardTitle>
        <CardDescription>Search and filter available parking spots</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleCurrentLocationClick}
          >
            <MapPin className="h-4 w-4" />
            Use Current Location
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onFilterChange(filters)}>
          Apply Filters
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MapControls;