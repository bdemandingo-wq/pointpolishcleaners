import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PricingCalculator from "@/components/PricingCalculator";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";
import ServiceAreaLinks from "@/components/seo/ServiceAreaLinks";
import SEOSchema from "@/components/seo/SEOSchema";

const Index = () => {
  return (
    <>
      <SEOSchema
        pageTitle="South Florida Cleaning Services | TIDYWISE"
        pageDescription="South Florida's best cleaning service. Broward, Miami-Dade & Palm Beach County. Licensed & insured. Same-day quotes. Call (561) 571-8725!"
        canonicalUrl="https://tidywisecleaning.com"
        pageType="home"
      />
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <PricingCalculator />
        <Services />
        <WhyChooseUs />
        <ServiceAreaLinks />
        <Contact />
        <Footer />
        <AIChatbot />
      </main>
    </>
  );
};

export default Index;