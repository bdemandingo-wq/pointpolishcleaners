import { Link } from "react-router-dom";
import { Phone, CheckCircle, Star, Sparkles, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import CityPageNavigation from "@/components/seo/CityPageNavigation";
import RelatedLinks from "@/components/seo/RelatedLinks";

const MiamiBeachCleaning = () => {
  return (
    <>
      <SEOSchema
        pageTitle="Affordable Cleaning Miami Beach | TIDYWISE"
        pageDescription="Affordable cleaning Miami Beach. Condo & house cleaning in South Beach, Mid-Beach, North Beach. Licensed & insured. Call (561) 571-8725 for free quote!"
        canonicalUrl="https://tidywisecleaning.com/miami-beach-cleaning"
        pageType="county"
        county="Miami Beach"
      />
      <main className="min-h-screen">
        <Navbar />
        
        <section className="relative min-h-[60vh] flex items-center justify-center pt-16 bg-gradient-to-br from-accent/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-foreground px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 fill-secondary text-secondary" />
              <span className="text-sm font-medium">Trusted in Miami Beach</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              Affordable Cleaning in Miami Beach
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Professional condo and house cleaning in Miami Beach, FL. Serving South Beach, Mid-Beach, 
              North Beach, and all Miami Beach areas. Part of our 
              <Link to="/miami-dade-cleaning" className="text-primary hover:underline ml-1">Miami-Dade cleaning services</Link>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
                <a href="tel:+15615718725" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call (561) 571-8725
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/#booking">Get Free Quote</Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Condo-Experienced</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Building Registered</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Same-Day Quotes</span>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8">
              Miami Beach Areas We Serve
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {["South Beach", "Mid-Beach", "North Beach", "Sunset Islands", "Star Island", 
                "Fisher Island", "Belle Isle", "Venetian Islands", "La Gorce", 
                "Surfside", "Bal Harbour", "Bay Harbor Islands"].map((area) => (
                <span key={area} className="bg-card px-4 py-2 rounded-full text-sm text-foreground border border-border">
                  {area}
                </span>
              ))}
            </div>
            <p className="text-center mt-8 text-muted-foreground">
              Also serving <Link to="/coral-gables-cleaning" className="text-primary hover:underline">Coral Gables</Link>, 
              <Link to="/aventura-cleaning" className="text-primary hover:underline ml-1">Aventura</Link>, and 
              <Link to="/miami-dade-cleaning" className="text-primary hover:underline ml-1">all of Miami-Dade</Link>.
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
              Why Miami Beach Residents Choose TIDYWISE
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">Condo & High-Rise Experts</h3>
                <p className="text-muted-foreground">Experienced with South Beach condos, luxury high-rises, and building access requirements. We understand Miami Beach's unique condo lifestyle.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">Vacation Rental Ready</h3>
                <p className="text-muted-foreground">Quick turnovers for Airbnb and VRBO properties. Keep your Miami Beach rental spotless between guests with our reliable service.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">Salt Air & Humidity Specialists</h3>
                <p className="text-muted-foreground">We tackle the unique cleaning challenges of beachfront living, from salt residue to Florida humidity and mold prevention.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8">
              Miami Beach Cleaning Services
            </h2>
            <div className="max-w-4xl mx-auto prose prose-lg text-muted-foreground">
              <p>
                TIDYWISE provides comprehensive cleaning services throughout Miami Beach, from the iconic Art Deco District 
                of South Beach to the family-friendly neighborhoods of North Beach. Our professional cleaners understand 
                the unique needs of Miami Beach homes and condos, including high-rise living, vacation rentals, and 
                beachfront properties.
              </p>
              <p>
                Whether you need regular maintenance cleaning for your Mid-Beach condo, deep cleaning services for your 
                Sunset Islands home, or move-in/move-out cleaning for your rental property, our licensed and insured 
                team delivers exceptional results. We're familiar with building requirements across Miami Beach and 
                can coordinate with property managers and front desk staff.
              </p>
              <p>
                Living near the ocean means dealing with salt air, sand, and humidity. Our cleaners use specialized 
                techniques and eco-friendly products to keep your Miami Beach home fresh and clean while protecting 
                your surfaces from the elements.
              </p>
            </div>
          </div>
        </section>

        <CityPageNavigation 
          currentCity="Miami Beach"
          county="miami-dade"
        />

        <Footer />
      </main>
    </>
  );
};

export default MiamiBeachCleaning;
