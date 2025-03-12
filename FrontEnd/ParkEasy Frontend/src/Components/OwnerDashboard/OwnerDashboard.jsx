import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ParkingSquare, User, BarChart3, Calendar, Settings } from "lucide-react";
import ListingManager from "./ListingManager";
import EarningsTracker from "./EarningsTracker";
import BookingManager from "./BookingManager";

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
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{ownerName}</p>
                <p className="text-sm text-muted-foreground">{ownerEmail}</p>
              </div>
            </div>
          </div>
          <Button>
            <Settings className="mr-2 h-4 w-4" /> Account Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[{ label: "Total Spots", value: totalSpots, color: "blue", icon: ParkingSquare },
            { label: "Active Listings", value: activeSpots, color: "green", icon: ParkingSquare },
            { label: "Total Earnings", value: `$${totalEarnings.toLocaleString()}`, color: "primary", icon: BarChart3 },
            { label: "Pending Bookings", value: pendingBookings, color: "yellow", icon: Calendar }].map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                    </div>
                    <div className={`p-2 bg-${stat.color}-500/10 rounded-full`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color}-500`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
          ))}
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="p-0">
            <Tabs defaultValue="listings" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                {[{ value: "listings", label: "Manage Listings" },
                  { value: "earnings", label: "Earnings" },
                  { value: "bookings", label: "Bookings" }].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="listings" className="p-0 m-0">
                <ListingManager />
              </TabsContent>
              <TabsContent value="earnings" className="p-0 m-0">
                <EarningsTracker />
              </TabsContent>
              <TabsContent value="bookings" className="p-0 m-0">
                <BookingManager />
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default OwnerDashboard;
