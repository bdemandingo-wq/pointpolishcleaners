import { Link } from "react-router-dom";
import { Phone, CheckCircle, Star, Sparkles, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import CityPageNavigation from "@/components/seo/CityPageNavigation";

const CoralSpringsCleaning = () => {
  return (
    <>
      <SEOSchema
        pageTitle="Cleaning Services Coral Springs FL | TIDYWISE"
        pageDescription="Professional cleaning Coral Springs FL. House cleaning for Heron Bay, Wyndham, Eagle Trace. Licensed & insured. Same-day quotes. Call (561) 571-8725!"
        canonicalUrl="https://tidywisecleaning.com/coral-springs-cleaning"
        pageType="county"
        county="Coral Springs"
      />
      <main className="min-h-screen">
        <Navbar />
        
        <section className="relative min-h-[60vh] flex items-center justify-center pt-16 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-foreground px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 fill-secondary text-secondary" />
              <span className="text-sm font-medium">Trusted in Coral Springs</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              Cleaning Services in Coral Springs, FL
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Reliable house cleaning in Coral Springs, FL. Serving Heron Bay, Wyndham Lakes, 
              Eagle Trace, and all Coral Springs communities. Part of our 
              <Link to="/broward-county-cleaning" className="text-primary hover:underline ml-1">Broward County cleaning services</Link>.
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
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Flexible Scheduling</span>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8">
              Coral Springs Communities We Serve
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {["Heron Bay", "Wyndham Lakes", "Eagle Trace", "The Preserve", "Ramblewood", 
                "Cypress Run", "Riverside", "Country Woods", "Pine Ridge", 
                "Forest Hills", "Coral Springs Highlands", "Turtle Run"].map((area) => (
                <span key={area} className="bg-card px-4 py-2 rounded-full text-sm text-foreground border border-border">
                  {area}
                </span>
              ))}
            </div>
            <p className="text-center mt-8 text-muted-foreground">
              Also serving <Link to="/fort-lauderdale-cleaning" className="text-primary hover:underline">Fort Lauderdale</Link>, 
              <Link to="/hollywood-cleaning" className="text-primary hover:underline ml-1">Hollywood</Link>, and 
              <Link to="/broward-county-cleaning" className="text-primary hover:underline ml-1">all of Broward County</Link>.
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
              Why Coral Springs Families Choose TIDYWISE
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">Family-Friendly Cleaning</h3>
                <p className="text-muted-foreground">Coral Springs is known for great schools and family living. We use safe, eco-friendly products that are gentle for kids and pets.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">Busy Family Schedules</h3>
                <p className="text-muted-foreground">We understand your hectic schedule. Flexible booking with reliable arrival times so you can focus on what matters most.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">HOA & Community Ready</h3>
                <p className="text-muted-foreground">Familiar with Coral Springs gated communities and HOA requirements. Professional, uniformed staff who represent you well.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8">
              Coral Springs FL Cleaning Services
            </h2>
            <div className="max-w-4xl mx-auto prose prose-lg text-muted-foreground">
              <p>
                TIDYWISE is proud to serve the Coral Springs community with professional house cleaning services 
                tailored to the needs of local families. From the prestigious homes of Heron Bay to the 
                established neighborhoods of Ramblewood and Country Woods, we provide consistent, reliable 
                cleaning you can count on.
              </p>
              <p>
                Coral Springs consistently ranks as one of Florida's best places to raise a family, and we 
                understand what matters to local residents. Our cleaning teams use non-toxic, eco-friendly 
                products that are safe for children and pets while still delivering the deep clean your home 
                deserves.
              </p>
              <p>
                Whether you need weekly maintenance cleaning to keep up with busy family life, deep cleaning 
                before the holidays, or move-in/move-out services, TIDYWISE has you covered. We're fully 
                licensed, insured, and our cleaners pass thorough background checks for your peace of mind.
              </p>
            </div>
          </div>
        </section>

        <CityPageNavigation 
          currentCity="Coral Springs"
          county="broward"
        />

        <Footer />
      </main>
    </>
  );
};

export default CoralSpringsCleaning;
