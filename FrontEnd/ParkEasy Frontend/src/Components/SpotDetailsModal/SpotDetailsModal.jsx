import React, { useState } from "react";
import { X, MapPin, Clock, Car, CreditCard, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import BookingForm from "./BookingForm";
import PaymentForm from "./PaymentForm";

const SpotDetailsModal = ({
  isOpen = true,
  onClose = () => {},
  spot = {
    id: "spot-123",
    name: "Downtown Secure Parking",
    address: "123 Main St, Downtown",
    description:
      "Secure parking spot in the heart of downtown with 24/7 access and security cameras. Easy access to restaurants, shopping, and public transportation.",
    hourlyRate: 5,
    dailyRate: 25,
    monthlyRate: 300,
    amenities: ["Security Camera", "Covered", "24/7 Access", "Well-lit"],
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
    },
    rating: 4.7,
    reviews: 28,
    images: [
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&q=80",
      "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=800&q=80",
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&q=80",
    ],
    distance: "0.3 miles",
    type: "Garage",
  },
}) => {
  const [activeTab, setActiveTab] = useState("details");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [bookingStage, setBookingStage] = useState("details");
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleBookingSubmit = (details) => {
    setBookingDetails(details);
    setBookingStage("payment");
  };

  const handlePaymentSubmit = (paymentDetails) => {
    console.log("Booking submitted:", { ...bookingDetails, payment: paymentDetails });
    onClose();
  };

  const handleBackToDetails = () => {
    setBookingStage("details");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">{spot.name}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{spot.address}</span>
            <Badge variant="outline" className="ml-2">{spot.distance}</Badge>
            <Badge variant="secondary" className="ml-2">{spot.type}</Badge>
          </div>
        </DialogHeader>
        {/* Content here */}
      </DialogContent>
    </Dialog>
  );
};

export default SpotDetailsModal;
