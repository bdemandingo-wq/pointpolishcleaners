import { Link } from "react-router-dom";
import { Phone, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import CityPageNavigation from "@/components/seo/CityPageNavigation";
import RelatedLinks from "@/components/seo/RelatedLinks";

const MandarinCleaning = () => {
  return (
    <>
      <SEOSchema
        pageTitle="Mandarin House Cleaning | Licensed & Insured | Point Polish"
        pageDescription="Premium house cleaning in Mandarin, FL. Point Polish Cleaners delivers luxury-level cleaning with precision and care. 10% off first clean — code POLISH. Call (904) 513-9002."
        canonicalUrl="https://pointpolishcleaners.com/mandarin-cleaning"
        pageType="county"
        county="Mandarin"
      />
      <main className="min-h-screen">
        <Navbar />
        
        <section className="relative min-h-[60vh] flex items-center justify-center pt-16 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-foreground px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 fill-secondary text-secondary" />
              <span className="text-sm font-medium">Top-Rated in Mandarin</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              House Cleaning in Mandarin
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Professional house cleaning in Mandarin, FL. Point Polish Cleaners brings luxury-level attention to detail to every home. Serving Mandarin Station, Julington Creek, Loretto, Crown Point, and Beauclerc and surrounding neighborhoods. Use code <strong>POLISH</strong> for 10% off your first cleaning.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
                <a href="tel:+19045139002" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call (904) 513-9002
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/#booking">Get Free Quote</Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Licensed & Insured</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Eco-Friendly Products</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> 10% Off First Clean</span>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8">
              Mandarin Neighborhoods We Serve
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {["Mandarin Station", "Julington Creek", "Loretto", "Crown Point", "Beauclerc"].map((area) => (
                <span key={area} className="bg-card px-4 py-2 rounded-full text-sm text-foreground border border-border">
                  {area}
                </span>
              ))}
            </div>
            <p className="text-center mt-8 text-muted-foreground">
              Also serving all of <Link to="/service-areas" className="text-primary hover:underline">Jacksonville and surrounding areas</Link>.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8">
              Why Mandarin Residents Choose Point Polish
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Local Expertise</h3>
                <p className="text-muted-foreground text-sm">
                  We know Mandarin homes inside and out. From coastal properties to family neighborhoods, our cleaners understand the unique needs of Northeast Florida living.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Flexible Scheduling</h3>
                <p className="text-muted-foreground text-sm">
                  Book weekly, bi-weekly, or one-time cleanings that fit your schedule. Same-day availability for urgent cleaning needs throughout Mandarin.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Satisfaction Guaranteed</h3>
                <p className="text-muted-foreground text-sm">
                  Not happy? We'll re-clean for free. Our Mandarin customers consistently rate us 5 stars for quality, reliability, and attention to detail.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CityPageNavigation currentCity="Mandarin" />
        <RelatedLinks currentPage="/mandarin-cleaning" pageType="city" cityName="Mandarin" />
        <Footer />
      </main>
    </>
  );
};

export default MandarinCleaning;
