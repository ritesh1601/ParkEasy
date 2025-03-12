import React, { useState } from "react";
import {
  PlusCircle,
  Edit,
  Trash2,
  MapPin,
  DollarSign,
  Clock,
  Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ListingManager = ({ spots = [] }) => {
  const [activeTab, setActiveTab] = useState("active");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);

  const activeSpots = spots.filter((spot) => spot.active);
  const inactiveSpots = spots.filter((spot) => !spot.active);

  const handleEdit = (spot) => {
    setSelectedSpot(spot);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id) => {
    console.log(`Deleting spot with id: ${id}`);
  };

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Your Parking Spots</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add New Spot
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Parking Spot</DialogTitle>
              <DialogDescription>
                Fill in the details below to list your parking spot for rent.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input id="name" placeholder="Spot Name" />
              <Input id="address" placeholder="Address" />
              <Textarea id="description" placeholder="Description" rows={3} />
              <Input id="hourlyRate" type="number" placeholder="Hourly Rate ($)" />
              <Input id="dailyRate" type="number" placeholder="Daily Rate ($)" />
              <Input id="images" type="file" multiple />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Spot</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active Listings ({activeSpots.length})</TabsTrigger>
          <TabsTrigger value="inactive">Inactive Listings ({inactiveSpots.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeSpots.map((spot) => (
            <SpotCard key={spot.id} spot={spot} onEdit={() => handleEdit(spot)} onDelete={() => handleDelete(spot.id)} />
          ))}
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          {inactiveSpots.map((spot) => (
            <SpotCard key={spot.id} spot={spot} onEdit={() => handleEdit(spot)} onDelete={() => handleDelete(spot.id)} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const SpotCard = ({ spot, onEdit, onDelete }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{spot.name}</CardTitle>
        <CardDescription>{spot.address}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{spot.description}</p>
        <p><DollarSign /> {spot.hourlyRate} / hour</p>
      </CardContent>
      <CardFooter>
        <Button onClick={onEdit}><Edit /> Edit</Button>
        <Button onClick={onDelete} variant="destructive"><Trash2 /> Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default ListingManager;
