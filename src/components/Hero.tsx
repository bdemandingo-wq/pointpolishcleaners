import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import TrustBadges from "./TrustBadges";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16"
    >
      {/* Background Image - preloaded, no lazy loading for LCP */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=75')`,
        }}
        role="img"
        aria-label="Clean modern living room"
      />
      {/* Overlay - increased opacity for better text contrast */}
      <div className="absolute inset-0 bg-foreground/70" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Trust indicator - use transform for animation, not layout-affecting properties */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/20 text-success-foreground border border-success/30 mb-6 opacity-0 animate-fade-in">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span className="text-sm font-medium text-background">Booking Available Today</span>
        </div>

        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-background mb-6 opacity-0 animate-fade-in">
          TIDYWISE House Cleaning in Fort Lauderdale, Boca Raton & West Palm Beach
        </h1>
        <p 
          className="text-background text-lg md:text-xl max-w-3xl mx-auto mb-4 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          Professional residential & commercial cleaning in Hollywood, Coral Springs, Deerfield Beach, Pompano Beach, Delray Beach, Boynton Beach & 30+ cities across Broward, Miami-Dade & Palm Beach County.
        </p>
        <p 
          className="text-background text-xl md:text-2xl font-semibold max-w-2xl mx-auto mb-8 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.15s" }}
        >
          For Every Budget, For Every Space, For You.
        </p>
        
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <Button
            variant="outline"
            size="lg"
            className="bg-info text-info-foreground border-info hover:bg-info/90 font-semibold text-base md:text-lg px-6 md:px-8 py-6 will-change-transform"
            asChild
          >
            <a href="tel:+15615718725" className="flex items-center gap-2">
              <Phone className="w-5 h-5" aria-hidden="true" />
              Call (561) 571-8725
            </a>
          </Button>
          <Button
            size="lg"
            className="bg-success text-success-foreground hover:bg-success/90 font-semibold text-base md:text-lg px-6 md:px-8 py-6 group will-change-transform"
            asChild
          >
            <a href="#booking" className="flex items-center gap-2">
              Get Instant Quote
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </Button>
        </div>

        {/* Trust Badges - reserve space to prevent CLS */}
        <div 
          className="min-h-[80px] opacity-0 animate-fade-in"
          style={{ animationDelay: "0.25s" }}
        >
          <TrustBadges variant="light" showReview={true} />
        </div>
      </div>

      {/* Scroll indicator - use transform animations only */}
      <div 
        className="absolute bottom-8 left-1/2 will-change-transform" 
        style={{ transform: 'translateX(-50%)' }}
        aria-hidden="true"
      >
        <div className="w-6 h-10 rounded-full border-2 border-background flex items-start justify-center p-2 animate-bounce">
          <div className="w-1 h-2 bg-background rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;