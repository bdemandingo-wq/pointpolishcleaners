import { Link } from "react-router-dom";
import { MapPin, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import StickyCallButton from "@/components/seo/StickyCallButton";

const serviceAreas = [
  { name: "Jacksonville", link: "/jacksonville-cleaning", desc: "Downtown, Springfield, Ortega, Murray Hill" },
  { name: "Jacksonville Beach", link: "/jacksonville-beach-cleaning", desc: "Jax Beach, South Beach, North Beach" },
  { name: "Atlantic Beach", link: "/atlantic-beach-cleaning", desc: "Selva Marina, Seminole Beach" },
  { name: "Neptune Beach", link: "/neptune-beach-cleaning", desc: "Jarboe Park, Florida Boulevard" },
  { name: "Ponte Vedra Beach", link: "/ponte-vedra-beach-cleaning", desc: "Sawgrass, Nocatee, Palm Valley" },
  { name: "Orange Park", link: "/orange-park-cleaning", desc: "Lakeside, Doctors Lake, Kingsley" },
  { name: "Fleming Island", link: "/fleming-island-cleaning", desc: "Eagle Harbor, Pace Island" },
  { name: "Mandarin", link: "/mandarin-cleaning", desc: "Julington Creek, Loretto, Crown Point" },
  { name: "San Marco", link: "/san-marco-cleaning", desc: "San Marco Square, St. Nicholas" },
  { name: "Riverside", link: "/riverside-cleaning", desc: "Avondale, Five Points, Memorial Park" },
  { name: "Arlington", link: "/arlington-cleaning", desc: "Fort Caroline, Monument Point" },
  { name: "Southside", link: "/southside-cleaning", desc: "Deerwood, Tinseltown, St. Johns Town Center" },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Point Polish Cleaners Service Areas in Jacksonville",
  "description": "Complete list of areas served by Point Polish Cleaners",
  "numberOfItems": serviceAreas.length,
  "itemListElement": serviceAreas.map((area, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": `${area.name} Cleaning Services`,
    "url": `https://pointpolishcleaners.com${area.link}`
  }))
};

const ServiceAreas = () => {
  return (
    <>
      <SEOSchema
        pageTitle="House Cleaning Jacksonville Area | 12+ Areas | Point Polish"
        pageDescription="Looking for house cleaning near you in Jacksonville, FL? Point Polish Cleaners serves 12+ neighborhoods and communities. Find your area for local pricing. Call (904) 513-9002."
        canonicalUrl="https://pointpolishcleaners.com/service-areas"
        pageType="service"
        breadcrumbs={[
          { name: "Home", url: "https://pointpolishcleaners.com" },
          { name: "Service Areas", url: "https://pointpolishcleaners.com/service-areas" }
        ]}
      />
      <main className="min-h-screen">
        <Navbar />
        
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-foreground px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Jacksonville Metro Area</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Service Areas
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
              Looking for house cleaning near you in Jacksonville? Point Polish Cleaners serves homeowners 
              across the entire Jacksonville metro area including the Beaches, Mandarin, Riverside, Southside, and more.
              Find your neighborhood below.
            </p>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
            
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
              <a href="tel:+19045139002" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call (904) 513-9002
              </a>
            </Button>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {serviceAreas.map((area) => (
                <Link
                  key={area.name}
                  to={area.link}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {area.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">{area.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8">
              Serving Jacksonville & Surrounding Areas
            </h2>
            <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d220474.2655!2d-81.8!3d30.33!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5b716f1ceafeb%3A0xc4cd7d3896fcc7e2!2sJacksonville%2C%20FL!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Point Polish Cleaners Service Area Map - Jacksonville FL"
              />
            </div>
            <p className="text-center mt-6 text-muted-foreground">
              Don't see your area? <a href="tel:+19045139002" className="text-primary font-medium hover:underline">Call us</a> — we may still be able to help!
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-bold mb-4">
              Ready to Book Your Cleaning?
            </h2>
            <p className="text-primary-foreground mb-8 max-w-xl mx-auto">
              Get a free quote in minutes. Use code <strong>POLISH</strong> for 10% off your first cleaning!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/#booking">Get Free Quote</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <a href="tel:+19045139002">Call (904) 513-9002</a>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
        <StickyCallButton />
      </main>
    </>
  );
};

export default ServiceAreas;
