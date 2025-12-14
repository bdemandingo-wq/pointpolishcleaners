import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, User, Mail, Phone, Home, MapPin, MessageSquare, PawPrint } from "lucide-react";

interface BookingState {
  sqft: number;
  serviceType: string;
  frequency: string;
  addOns: string[];
  totalPrice: string;
}

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state as BookingState | null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    beds: "",
    baths: "",
    accessInstructions: "",
    focusAreas: "",
    hasPets: "",
    petDetails: "",
  });

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <Card className="max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No booking information found.</p>
            <Button onClick={() => navigate("/")}>Return to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/confirmation", {
      state: {
        ...booking,
        ...formData,
      },
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-muted py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to pricing
        </button>

        <Card className="shadow-elevated animate-scale-in">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Complete Your Booking
              </h1>
              <p className="text-muted-foreground">
                Please provide your details so we can schedule your cleaning service.
              </p>
            </div>

            {/* Booking Summary */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Your Service</p>
                  <p className="font-semibold text-foreground">
                    {booking.serviceType} • {booking.frequency}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {booking.sqft.toLocaleString()} sq ft
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold text-primary">${booking.totalPrice}</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="font-semibold text-foreground flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(561) 555-0123"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-4">
                <h2 className="font-semibold text-foreground flex items-center gap-2">
                  <Home className="w-4 h-4 text-primary" />
                  Property Details
                </h2>

                <div className="space-y-2">
                  <Label htmlFor="address">Property Address *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="address"
                      placeholder="123 Main St, West Palm Beach, FL 33401"
                      className="pl-10"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="beds">Bedrooms *</Label>
                    <Select
                      value={formData.beds}
                      onValueChange={(value) => handleInputChange("beds", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Bedroom</SelectItem>
                        <SelectItem value="2">2 Bedrooms</SelectItem>
                        <SelectItem value="3">3 Bedrooms</SelectItem>
                        <SelectItem value="4">4 Bedrooms</SelectItem>
                        <SelectItem value="5">5 Bedrooms</SelectItem>
                        <SelectItem value="6+">6+ Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="baths">Bathrooms *</Label>
                    <Select
                      value={formData.baths}
                      onValueChange={(value) => handleInputChange("baths", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Bathroom</SelectItem>
                        <SelectItem value="1.5">1.5 Bathrooms</SelectItem>
                        <SelectItem value="2">2 Bathrooms</SelectItem>
                        <SelectItem value="2.5">2.5 Bathrooms</SelectItem>
                        <SelectItem value="3">3 Bathrooms</SelectItem>
                        <SelectItem value="3.5">3.5 Bathrooms</SelectItem>
                        <SelectItem value="4+">4+ Bathrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Access & Pets */}
              <div className="space-y-4">
                <h2 className="font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Special Instructions
                </h2>

                <div className="space-y-2">
                  <Label htmlFor="access">Access Instructions</Label>
                  <Textarea
                    id="access"
                    placeholder="How should we access your property? (e.g., gate code, lockbox location, meet at door)"
                    rows={3}
                    value={formData.accessInstructions}
                    onChange={(e) => handleInputChange("accessInstructions", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="focus">Areas to Focus On</Label>
                  <Textarea
                    id="focus"
                    placeholder="Any specific areas you'd like us to pay extra attention to?"
                    rows={2}
                    value={formData.focusAreas}
                    onChange={(e) => handleInputChange("focusAreas", e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <PawPrint className="w-4 h-4 text-primary" />
                    <Label>Do you have pets?</Label>
                  </div>
                  <Select
                    value={formData.hasPets}
                    onValueChange={(value) => handleInputChange("hasPets", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No pets</SelectItem>
                      <SelectItem value="dog">Yes - Dog(s)</SelectItem>
                      <SelectItem value="cat">Yes - Cat(s)</SelectItem>
                      <SelectItem value="both">Yes - Dogs & Cats</SelectItem>
                      <SelectItem value="other">Yes - Other</SelectItem>
                    </SelectContent>
                  </Select>

                  {formData.hasPets && formData.hasPets !== "no" && (
                    <div className="space-y-2">
                      <Label htmlFor="petDetails">Pet Details</Label>
                      <Input
                        id="petDetails"
                        placeholder="Names, breeds, any special instructions"
                        value={formData.petDetails}
                        onChange={(e) => handleInputChange("petDetails", e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Submit */}
              <Button type="submit" size="lg" className="w-full">
                Confirm Booking
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                We'll contact you within <strong>15 minutes</strong> to confirm your appointment.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingForm;
