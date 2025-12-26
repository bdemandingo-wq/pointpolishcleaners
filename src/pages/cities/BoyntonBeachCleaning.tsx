import { Link } from "react-router-dom";
import { Phone, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";

const BoyntonBeachCleaning = () => {
  return (
    <>
      <SEOSchema
        pageTitle="Boynton Beach House Cleaning | TIDYWISE"
        pageDescription="Boynton Beach FL residential cleaning experts. Leisureville, Aberdeen & Canyon Lakes. Standard, deep & move-out cleaning. Free instant quote online!"
        canonicalUrl="https://tidywisecleaning.com/boynton-beach-cleaning"
        pageType="county"
        county="Boynton Beach"
      />
      <main className="min-h-screen">
        <Navbar />
        
        <section className="relative min-h-[60vh] flex items-center justify-center pt-16 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-foreground px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 fill-secondary text-secondary" />
              <span className="text-sm font-medium">Top-Rated in Boynton Beach</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              Best Cleaning Service in Boynton Beach
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Professional house cleaning in Boynton Beach, FL. Serving Leisureville, Aberdeen, 
              Canyon Lakes, and all Boynton Beach neighborhoods. Part of our 
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
              Boynton Beach Neighborhoods We Serve
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {["Leisureville", "Aberdeen", "Canyon Lakes", "Indian Spring", "Hunters Run", 
                "Boynton Lakes", "Quantum Park", "Gateway", "Nautica Lakes", 
                "Valencia Lakes", "Pine Ridge", "Cascade Lakes"].map((area) => (
                <span key={area} className="bg-card px-4 py-2 rounded-full text-sm text-foreground border border-border">
                  {area}
                </span>
              ))}
            </div>
            <p className="text-center mt-8 text-muted-foreground">
              Also serving <Link to="/delray-beach-cleaning" className="text-primary hover:underline">Delray Beach</Link>, 
              <Link to="/lake-worth-cleaning" className="text-primary hover:underline ml-1">Lake Worth</Link>, and 
              <Link to="/palm-beach-county-cleaning" className="text-primary hover:underline ml-1">all of Palm Beach County</Link>.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default BoyntonBeachCleaning;