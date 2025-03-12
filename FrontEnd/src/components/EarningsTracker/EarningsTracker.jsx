import React from "react";
import { DollarSign, Calendar, Users, TrendingUp } from "lucide-react";

const EarningsTracker = () => {
  const earningsData = {
    totalEarnings: "$4,250",
    bookingsThisMonth: 128,
    activeUsers: 342,
    revenueGrowth: "12%",
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Earnings Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center p-4 bg-gray-50 rounded-lg shadow">
            <DollarSign className="text-green-500" size={24} />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Earnings</p>
              <p className="text-lg font-medium">{earningsData.totalEarnings}</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-50 rounded-lg shadow">
            <Calendar className="text-blue-500" size={24} />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Bookings This Month</p>
              <p className="text-lg font-medium">{earningsData.bookingsThisMonth}</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-50 rounded-lg shadow">
            <Users className="text-purple-500" size={24} />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-lg font-medium">{earningsData.activeUsers}</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-50 rounded-lg shadow">
            <TrendingUp className="text-red-500" size={24} />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Revenue Growth</p>
              <p className="text-lg font-medium">{earningsData.revenueGrowth}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsTracker;