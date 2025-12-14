import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const serviceTypes = [
  { value: "standard", label: "Standard Cleaning", basePrice: 150 },
  { value: "deep", label: "Deep Cleaning", basePrice: 250 },
  { value: "moveinout", label: "Move In/Out Cleaning", basePrice: 300 },
  { value: "commercial", label: "Commercial Cleaning", basePrice: 400 },
];

const frequencies = [
  { value: "onetime", label: "One-Time", discount: 0 },
  { value: "weekly", label: "Weekly (15% off)", discount: 0.15 },
  { value: "biweekly", label: "Bi-Weekly (10% off)", discount: 0.10 },
  { value: "monthly", label: "Monthly (5% off)", discount: 0.05 },
];

const addOns = [
  { id: "windows", label: "Windows", price: 30 },
  { id: "appliances", label: "Appliances", price: 50 },
  { id: "baseboards", label: "Baseboards", price: 40 },
  { id: "walls", label: "Walls", price: 25 },
  { id: "carpets", label: "Carpets", price: 150 },
  { id: "laundry", label: "Laundry", price: 10 },
  { id: "dishes", label: "Dishes", price: 15 },
];

const PricingCalculator = () => {
  const navigate = useNavigate();
  const [sqft, setSqft] = useState([1500]);
  const [serviceType, setServiceType] = useState("standard");
  const [frequency, setFrequency] = useState("onetime");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const selectedService = serviceTypes.find((s) => s.value === serviceType)!;
  const selectedFrequency = frequencies.find((f) => f.value === frequency)!;

  const totalPrice = useMemo(() => {
    const sqftMultiplier = sqft[0] / 1000;
    let price = selectedService.basePrice * sqftMultiplier;

    // Add add-ons
    const addOnTotal = selectedAddOns.reduce((sum, id) => {
      const addOn = addOns.find((a) => a.id === id);
      return sum + (addOn?.price || 0);
    }, 0);

    price += addOnTotal;

    // Apply frequency discount
    price = price * (1 - selectedFrequency.discount);

    return price;
  }, [sqft, selectedService, selectedFrequency, selectedAddOns]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleBooking = () => {
    navigate("/booking", {
      state: {
        sqft: sqft[0],
        serviceType: selectedService.label,
        frequency: selectedFrequency.label,
        addOns: selectedAddOns.map(id => addOns.find(a => a.id === id)?.label).filter(Boolean),
        totalPrice: totalPrice.toFixed(2),
      },
    });
  };

  return (
    <section id="booking" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transparent Pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Simple, upfront pricing with no hidden fees. Choose your service and book instantly.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-elevated">
          <CardHeader>
            <CardTitle className="text-xl font-display">Select Your Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Property Size Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base font-medium">Property Size</Label>
                <span className="text-lg font-bold text-primary">{sqft[0].toLocaleString()} sq ft</span>
              </div>
              <Slider
                value={sqft}
                onValueChange={setSqft}
                min={500}
                max={10000}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>500 sq ft</span>
                <span>10,000 sq ft</span>
              </div>
            </div>

            {/* Service Type */}
            <div className="space-y-2">
              <Label className="text-base font-medium">Service Type</Label>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Frequency */}
            <div className="space-y-2">
              <Label className="text-base font-medium">Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map((freq) => (
                    <SelectItem key={freq.value} value={freq.value}>
                      {freq.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Display */}
            <div className="bg-primary/5 rounded-lg p-6 text-center">
              <p className="text-muted-foreground mb-2">Estimated Price</p>
              <p className="text-4xl font-bold text-primary">${totalPrice.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mt-1">+ add-ons</p>
            </div>

            {/* Add-ons */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Add-On Services:</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {addOns.map((addOn) => (
                  <div
                    key={addOn.id}
                    className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedAddOns.includes(addOn.id)
                        ? "bg-primary/10 border-primary"
                        : "bg-background border-border hover:border-primary/50"
                    }`}
                    onClick={() => toggleAddOn(addOn.id)}
                  >
                    <Checkbox
                      id={addOn.id}
                      checked={selectedAddOns.includes(addOn.id)}
                      onCheckedChange={() => toggleAddOn(addOn.id)}
                    />
                    <label htmlFor={addOn.id} className="text-sm cursor-pointer">
                      {addOn.label} (${addOn.price})
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Button */}
            <Button
              size="lg"
              className="w-full text-lg font-semibold"
              onClick={handleBooking}
            >
              Book This Service
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PricingCalculator;
