import React, { useState } from "react";
import { ParkingSquare, User, BarChart3, Calendar, Settings } from "lucide-react";
import { ListingManager , BookingManager , EarningsTracker} from '../index'

const OwnerDashboard = ({
  ownerName = "Jane Smith",
  ownerEmail = "jane.smith@example.com",
  totalSpots = 5,
  activeSpots = 3,
  totalEarnings = 12580,
  pendingBookings = 4,
}) => {
  const [activeTab, setActiveTab] = useState("listings");

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Owner Dashboard</h1>
            <div className="flex items-center mt-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <User className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">{ownerName}</p>
                <p className="text-sm text-gray-500">{ownerEmail}</p>
              </div>
            </div>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow">
            <Settings className="mr-2 h-4 w-4" /> Account Settings
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[{ label: "Total Spots", value: totalSpots, icon: <ParkingSquare className="h-6 w-6 text-blue-500" />, bg: "bg-blue-100" },
            { label: "Active Listings", value: activeSpots, icon: <ParkingSquare className="h-6 w-6 text-green-500" />, bg: "bg-green-100" },
            { label: "Total Earnings", value: `$${totalEarnings.toLocaleString()}`, icon: <BarChart3 className="h-6 w-6 text-purple-500" />, bg: "bg-purple-100" },
            { label: "Pending Bookings", value: pendingBookings, icon: <Calendar className="h-6 w-6 text-yellow-500" />, bg: "bg-yellow-100" }].map((stat, index) => (
            <div key={index} className="p-6 bg-white shadow rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
                <div className={`p-2 rounded-full ${stat.bg}`}>{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="border-b flex">
            {[{ label: "Manage Listings", value: "listings" },
              { label: "Earnings", value: "earnings" },
              { label: "Bookings", value: "bookings" }].map((tab) => (
              <button
                key={tab.value}
                className={`flex-1 px-4 py-3 text-center ${activeTab === tab.value ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-6">
            {activeTab === "listings" && <ListingManager />}
            {activeTab === "earnings" && <EarningsTracker />}
            {activeTab === "bookings" && <BookingManager />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;