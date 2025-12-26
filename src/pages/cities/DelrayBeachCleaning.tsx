import { Link } from "react-router-dom";
import { Phone, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";

const DelrayBeachCleaning = () => {
  return (
    <>
      <SEOSchema
        pageTitle="Best Cleaning Service Delray Beach FL | TIDYWISE"
        pageDescription="Delray Beach FL professional house cleaning. Atlantic Avenue, Tropic Isle & Lake Ida residents trust TIDYWISE. Recurring or one-time cleans. Get a quote!"
        canonicalUrl="https://tidywisecleaning.com/delray-beach-cleaning"
        pageType="county"
        county="Delray Beach"
      />
      <main className="min-h-screen">
        <Navbar />
        
        <section className="relative min-h-[60vh] flex items-center justify-center pt-16 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-foreground px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 fill-secondary text-secondary" />
              <span className="text-sm font-medium">Top-Rated in Delray Beach</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              Best Cleaning Service in Delray Beach
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Professional house cleaning in Delray Beach, FL. Serving Atlantic Avenue area, Tropic Isle, 
              Lake Ida, and all Delray Beach neighborhoods. Part of our 
              <Link to="/palm-beach-county-cleaning" className="text-primary hover:underline ml-1">Palm Beach County cleaning services</Link>.
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
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Licensed & Insured</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Eco-Friendly Products</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Same-Day Quotes</span>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8">
              Delray Beach Neighborhoods We Serve
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {["Atlantic Avenue", "Tropic Isle", "Lake Ida", "Pineapple Grove", "Marina Historic District", 
                "Del-Ida Park", "Seagate", "Tropic Palms", "Rainberry Bay", 
                "Kings Point", "Polo Trace", "Delray Shores"].map((area) => (
                <span key={area} className="bg-card px-4 py-2 rounded-full text-sm text-foreground border border-border">
                  {area}
                </span>
              ))}
            </div>
            <p className="text-center mt-8 text-muted-foreground">
              Also serving <Link to="/boca-raton-cleaning" className="text-primary hover:underline">Boca Raton</Link>, 
              <Link to="/boynton-beach-cleaning" className="text-primary hover:underline ml-1">Boynton Beach</Link>, and 
              <Link to="/palm-beach-county-cleaning" className="text-primary hover:underline ml-1">all of Palm Beach County</Link>.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default DelrayBeachCleaning;