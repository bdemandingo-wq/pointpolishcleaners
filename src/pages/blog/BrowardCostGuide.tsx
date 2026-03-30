import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import StickyCallButton from "@/components/seo/StickyCallButton";
import RelatedLinks from "@/components/seo/RelatedLinks";
import AuthorBio from "@/components/seo/AuthorBio";

const BrowardCostGuide = () => {
  return (
    <>
      <SEOSchema
        pageTitle="2025 Cleaning Cost Guide Duval County | Point Polish Cleaners"
        pageDescription="Duval County cleaning cost guide 2025. Average prices for standard, deep, and move-out cleaning in Jacksonville, Hollywood, Mandarin. Get free quote!"
        canonicalUrl="https://pointpolishcleaners.com/blog/broward-cost-guide"
        pageType="blog"
        county="Duval County"
        blogMeta={{ datePublished: "2025-01-05", readTime: "6 min", category: "Local Guides" }}
      />
      <main className="min-h-screen">
        <Navbar />
        
        <article className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link to="/broward-county-cleaning" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Duval County Cleaning
            </Link>

            <header className="mb-12">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  January 2025
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  5 min read
                </span>
              </div>
              
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                2025 Cost Guide for Cleaning Services in Duval County
              </h1>
              
              <p className="text-lg text-muted-foreground">
                Planning your cleaning budget for 2025? Here's everything you need to know about 
                <Link to="/broward-county-cleaning" className="text-primary hover:underline mx-1">Duval County cleaning service</Link> 
                costs, from Jacksonville to Mandarin.
              </p>
            </header>

            <div className="prose prose-lg max-w-none">
              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                Average Cleaning Costs in Jacksonville
              </h2>
              <p className="text-muted-foreground mb-6">
                In 2025, the average cost for professional <Link to="/broward-county-cleaning" className="text-primary hover:underline">cleaning services in Duval County</Link> ranges 
                from $120-$280 depending on your home size and service type. Here's a breakdown:
              </p>

              <div className="bg-muted p-6 rounded-xl mb-8">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">Standard Cleaning Prices (2025)</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 1-2 Bedroom: $120-$160</li>
                  <li>• 3 Bedroom: $160-$220</li>
                  <li>• 4+ Bedroom: $220-$300</li>
                </ul>
              </div>

              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                Deep Cleaning Rates in Mandarin & Hollywood
              </h2>
              <p className="text-muted-foreground mb-6">
                Deep cleaning typically costs 1.5-2x the standard rate. For a 3-bedroom home in 
                Hollywood or Mandarin, expect $250-$350 for a thorough <Link to="/" className="text-primary hover:underline">deep cleaning service</Link>.
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                Move In/Out Cleaning Costs
              </h2>
              <p className="text-muted-foreground mb-6">
                Moving in or out of a Duval County property? Move cleaning ranges from $200-$450 
                depending on property size and condition. This includes inside cabinets, appliances, 
                and all surfaces.
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                Factors That Affect Pricing
              </h2>
              <ul className="space-y-2 text-muted-foreground mb-8">
                <li>• Square footage of your home</li>
                <li>• Cleaning frequency (weekly = 15-20% discount)</li>
                <li>• Number of bathrooms</li>
                <li>• Pet presence</li>
                <li>• Special requests (inside oven, refrigerator, windows)</li>
              </ul>

              <div className="bg-primary/10 p-6 rounded-xl">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  Get Your Free Quote Today
                </h3>
                <p className="text-muted-foreground mb-4">
                  Ready to get an exact price for your <Link to="/broward-county-cleaning" className="text-primary hover:underline">Duval County cleaning</Link>? 
                  Point Polish Cleaners offers free, no-obligation quotes. Call <a href="tel:+19045139002" className="text-primary font-semibold">(904) 513-9002</a> or 
                  <Link to="/#booking" className="text-primary hover:underline ml-1">book online</Link>.
                </p>
                <p className="text-sm text-muted-foreground">
                  Also serving <Link to="/miami-dade-cleaning" className="text-primary hover:underline">Jacksonville</Link> and 
                  <Link to="/palm-beach-county-cleaning" className="text-primary hover:underline ml-1">St. Johns County</Link>.
                </p>
              </div>
            </div>
          </div>
        </article>

        <AuthorBio />
        <RelatedLinks currentPage="/blog/broward-cost-guide" pageType="blog" />
        <Footer />
        <StickyCallButton />
      </main>
    </>
  );
};

export default BrowardCostGuide;
