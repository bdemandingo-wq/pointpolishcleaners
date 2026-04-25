import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useServicePricing, getPriceForSqft } from "@/hooks/useServicePricing";

// Custom-quote services (not priced via DB tiers)
const customServices = [
  { value: "carpets", label: "Carpets (Custom)" },
  { value: "upholstery", label: "Upholstery (Custom)" },
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
  { id: "carpets", label: "Carpets", price: 0, isCustom: true },
  { id: "laundry", label: "Wash, Dry & Fold (per load)", price: 40 },
  { id: "dishes", label: "Dishes", price: 15 },
];

const PricingCalculator = () => {
  const navigate = useNavigate();
  const { services, loading } = useServicePricing();
  const [sqft, setSqft] = useState([1500]);
  const [serviceType, setServiceType] = useState("standard");
  const [frequency, setFrequency] = useState("onetime");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const isCustomService = customServices.some((s) => s.value === serviceType);
  const selectedPriced = services.find((s) => s.value === serviceType);
  const selectedFrequency = frequencies.find((f) => f.value === frequency)!;
  const selectedLabel =
    customServices.find((s) => s.value === serviceType)?.label ||
    selectedPriced?.label ||
    "Standard Clean";

  const totalPrice = useMemo(() => {
    if (isCustomService || !selectedPriced) return null;
    let price = getPriceForSqft(sqft[0], selectedPriced.tiers);

    const addOnTotal = selectedAddOns.reduce((sum, id) => {
      const addOn = addOns.find((a) => a.id === id);
      if (!addOn || addOn.isCustom) return sum;
      return sum + (addOn.price || 0);
    }, 0);

    price += addOnTotal;
    price = price * (1 - selectedFrequency.discount);
    return price;
  }, [sqft, selectedPriced, selectedFrequency, selectedAddOns, isCustomService]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleBooking = () => {
    // GA4 conversion tracking
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "view_item", {
        item_name: selectedLabel,
        currency: "USD",
        value: totalPrice || 0,
        event_category: "pricing_calculator",
      });
    }

    navigate("/booking", {
      state: {
        sqft: sqft[0],
        serviceType: selectedLabel,
        frequency: selectedFrequency.label,
        addOns: selectedAddOns.map((id) => addOns.find((a) => a.id === id)?.label).filter(Boolean),
        totalPrice: isCustomService ? "Custom Quote" : totalPrice?.toFixed(2),
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
                <Label htmlFor="property-size-slider" className="text-base font-medium">Property Size</Label>
                <span className="text-lg font-bold text-primary" aria-live="polite">{sqft[0].toLocaleString()} sq ft</span>
              </div>
              <Slider
                id="property-size-slider"
                value={sqft}
                onValueChange={setSqft}
                min={500}
                max={10000}
                step={100}
                className="w-full"
                aria-label="Property size in square feet"
                aria-valuemin={500}
                aria-valuemax={10000}
                aria-valuenow={sqft[0]}
                aria-valuetext={`${sqft[0].toLocaleString()} square feet`}
              />
              <div className="flex justify-between text-sm text-muted-foreground" aria-hidden="true">
                <span>500 sq ft</span>
                <span>10,000 sq ft</span>
              </div>
            </div>

            {/* Service Type */}
            <div className="space-y-2">
              <Label htmlFor="service-type-select" className="text-base font-medium">Service Type</Label>
              <Select value={serviceType} onValueChange={setServiceType} disabled={loading}>
                <SelectTrigger id="service-type-select" aria-label="Select service type">
                  <SelectValue placeholder={loading ? "Loading..." : "Select service"} />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      {service.label}
                    </SelectItem>
                  ))}
                  {customServices.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Frequency */}
            <div className="space-y-2">
              <Label htmlFor="frequency-select" className="text-base font-medium">Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger id="frequency-select" aria-label="Select cleaning frequency">
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
              <p className="text-muted-foreground mb-2">
                {isCustomService ? "Pricing" : "Estimated Price"}
              </p>
              {isCustomService ? (
                <p className="text-3xl font-bold text-primary">Get Quote</p>
              ) : (
                <>
                  <p className="text-4xl font-bold text-primary">
                    {loading ? "—" : `$${totalPrice?.toFixed(2)}`}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">+ add-ons</p>
                </>
              )}
            </div>

            {/* Add-ons - Hidden for Deep Clean (all add-ons included) */}
            {serviceType !== "deep" && !isCustomService && (
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
                        {addOn.label} {addOn.isCustom ? "(Custom Quote)" : `($${addOn.price})`}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Book Button */}
            <Button
              size="lg"
              className="w-full text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleBooking}
              disabled={loading && !isCustomService}
            >
              {isCustomService ? "Request Quote" : "Book This Service"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PricingCalculator;
