import { Link } from "react-router-dom";
import { Phone, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";

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

        <Footer />
      </main>
    </>
  );
};

export default MiamiBeachCleaning;
