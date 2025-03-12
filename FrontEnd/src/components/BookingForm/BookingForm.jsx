import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, Car } from "lucide-react";

const BookingForm = ({
  spotId = "spot-123",
  spotName = "Downtown Parking Spot #42",
  hourlyRate = 15,
  onSubmit = () => {},
  onCancel = () => {},
}) => {
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState("09:00");
  const [duration, setDuration] = useState(1);
  const [vehicleType, setVehicleType] = useState("sedan");
  const [licensePlate, setLicensePlate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ date, startTime, duration, vehicleType, licensePlate });
  };

  const calculateTotal = () => hourlyRate * duration;

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Book Parking Spot</h3>
      <p className="text-sm text-gray-500 mb-6">{spotName}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Date</label>
          <button
            type="button"
            className="w-full flex items-center justify-start px-4 py-2 border rounded-md text-gray-700"
            onClick={() => document.getElementById("date-picker").showPicker()}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : "Select date"}
          </button>
          <input
            type="date"
            id="date-picker"
            className="hidden"
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Start Time</label>
          <div className="flex items-center border rounded-md px-4 py-2">
            <Clock className="mr-2 h-4 w-4 text-gray-500" />
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Duration (hours)</label>
          <select
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="w-full border rounded-md px-4 py-2"
          >
            {[1, 2, 3, 4, 5, 6, 8, 12, 24].map((hours) => (
              <option key={hours} value={hours}>{hours} {hours === 1 ? "hour" : "hours"}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Vehicle Type</label>
          <div className="flex items-center border rounded-md px-4 py-2">
            <Car className="mr-2 h-4 w-4 text-gray-500" />
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none"
            >
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="truck">Truck</option>
              <option value="compact">Compact</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">License Plate</label>
          <input
            type="text"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            placeholder="Enter license plate"
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <div className="flex justify-between">
            <span>Hourly Rate:</span>
            <span>${hourlyRate.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Duration:</span>
            <span>{duration} {duration === 1 ? "hour" : "hours"}</span>
          </div>
          <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-gray-200">
            <span>Total:</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            type="button"
            className="flex-1 border rounded-md px-4 py-2 text-gray-700"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="flex-1 bg-blue-500 text-white rounded-md px-4 py-2">
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
