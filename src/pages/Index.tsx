import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PricingCalculator from "@/components/PricingCalculator";
import Services from "@/components/Services";
import SEOSchema from "@/components/seo/SEOSchema";
import Footer from "@/components/Footer";

// Lazy load below-the-fold components
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const BlogPreview = lazy(() => import("@/components/BlogPreview"));
const Contact = lazy(() => import("@/components/Contact"));
const AIChatbot = lazy(() => import("@/components/AIChatbot"));
const ServiceAreaLinks = lazy(() => import("@/components/seo/ServiceAreaLinks"));
const StickyCallButton = lazy(() => import("@/components/seo/StickyCallButton"));
const GoogleMapEmbed = lazy(() => import("@/components/seo/GoogleMapEmbed"));

// Lightweight skeleton with reserved height to prevent CLS
const LazySection = ({ children, minHeight = 200 }: { children: React.ReactNode; minHeight?: number }) => (
  <Suspense fallback={<div style={{ minHeight }} aria-hidden="true" />}>
    {children}
  </Suspense>
);

const Index = () => {
  return (
    <>
      <SEOSchema
        pageTitle="House Cleaning Fort Lauderdale & Boca Raton | TIDYWISE"
        pageDescription="TIDYWISE professional house cleaning in Fort Lauderdale, Boca Raton & West Palm Beach. Serving 40+ cities in Broward, Palm Beach & Miami-Dade. Call (561) 571-8725!"
        canonicalUrl="https://tidywisecleaning.com"
        pageType="home"
      />
      <main id="main-content" className="min-h-screen">
        <Navbar />
        <Hero />
        <PricingCalculator />
        <Services />
        <LazySection minHeight={400}><WhyChooseUs /></LazySection>
        <LazySection minHeight={350}><Testimonials /></LazySection>
        <LazySection minHeight={300}><ServiceAreaLinks /></LazySection>
        <LazySection minHeight={400}><GoogleMapEmbed /></LazySection>
        <LazySection minHeight={300}><BlogPreview /></LazySection>
        <LazySection minHeight={400}><Contact /></LazySection>
        <Footer />
        <LazySection minHeight={0}><StickyCallButton /></LazySection>
        <LazySection minHeight={0}><AIChatbot /></LazySection>
      </main>
    </>
  );
};

export default Index;