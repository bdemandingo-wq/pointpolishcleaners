import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Home, Phone } from "lucide-react";

interface BookingState {
  sqft: number;
  serviceType: string;
  frequency: string;
  addOns: string[];
  totalPrice: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  beds: string;
  baths: string;
  accessInstructions?: string;
  focusAreas?: string;
  hasPets?: string;
  petDetails?: string;
}

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state as BookingState | null;

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

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center py-12 px-4">
      <Card className="max-w-lg w-full shadow-elevated animate-scale-in">
        <CardContent className="p-8">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-muted-foreground">
              Thank you for choosing TidyWise. We'll contact you shortly.
            </p>
          </div>

          {/* Booking Summary */}
          <div className="bg-muted rounded-lg p-6 mb-6 space-y-3">
            <h2 className="font-semibold text-foreground mb-4">Booking Summary</h2>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{booking.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-medium">{booking.phone}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium text-sm">{booking.email}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Address</span>
              <span className="font-medium text-right text-sm max-w-[200px]">{booking.address}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Beds / Baths</span>
              <span className="font-medium">{booking.beds} bed / {booking.baths} bath</span>
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-muted rounded-lg p-6 mb-8 space-y-3">
            <h2 className="font-semibold text-foreground mb-4">Service Details</h2>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Property Size</span>
              <span className="font-medium">{booking.sqft.toLocaleString()} sq ft</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service Type</span>
              <span className="font-medium">{booking.serviceType}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Frequency</span>
              <span className="font-medium">{booking.frequency}</span>
            </div>

            {booking.addOns.length > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Add-Ons</span>
                <span className="font-medium text-right">{booking.addOns.join(", ")}</span>
              </div>
            )}

            {booking.hasPets && booking.hasPets !== "no" && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pets</span>
                <span className="font-medium">{booking.petDetails || booking.hasPets}</span>
              </div>
            )}
            
            <div className="border-t border-border pt-4 mt-4">
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Total Price</span>
                <span className="text-2xl font-bold text-primary">${booking.totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              A member of our team will reach out within <strong>15 minutes</strong> to confirm your appointment details.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1"
                asChild
              >
                <a href="tel:+15615718725" className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call Us Now
                </a>
              </Button>
              <Button
                className="flex-1"
                onClick={() => navigate("/")}
              >
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Confirmation;
