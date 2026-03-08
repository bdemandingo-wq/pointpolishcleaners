import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProofBar from "@/components/SocialProofBar";
import Services from "@/components/Services";
import PricingCalculator from "@/components/PricingCalculator";
import SEOSchema from "@/components/seo/SEOSchema";
import Footer from "@/components/Footer";

// Lazy load below-the-fold components
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const ComparisonTable = lazy(() => import("@/components/ComparisonTable"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const HomeFAQ = lazy(() => import("@/components/HomeFAQ"));
const ContactOptions = lazy(() => import("@/components/ContactOptions"));
const ReferralBanner = lazy(() => import("@/components/ReferralBanner"));
const Contact = lazy(() => import("@/components/Contact"));
const BlogPreview = lazy(() => import("@/components/BlogPreview"));
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
        pageTitle="TIDYWISE House Cleaning | Fort Lauderdale, Boca Raton & West Palm Beach | Book Online"
        pageDescription="Professional home cleaning in Fort Lauderdale, Boca Raton, West Palm Beach & 30+ South Florida cities. Instant online quotes, eco-friendly products, background-checked cleaners. Book in 2 minutes."
        canonicalUrl="https://tidywisecleaning.com"
        pageType="home"
      />
      <main id="main-content" className="min-h-screen">
        <Navbar />
        <Hero />
        <SocialProofBar />
        <Services />
        <LazySection minHeight={350}><HowItWorks /></LazySection>
        <PricingCalculator />
        <LazySection minHeight={200}><ComparisonTable /></LazySection>
        <LazySection minHeight={400}><WhyChooseUs /></LazySection>
        <LazySection minHeight={400}><Testimonials /></LazySection>
        <LazySection minHeight={400}><HomeFAQ /></LazySection>
        <LazySection minHeight={200}><ContactOptions /></LazySection>
        <LazySection minHeight={300}><ServiceAreaLinks /></LazySection>
        <LazySection minHeight={400}><GoogleMapEmbed /></LazySection>
        <LazySection minHeight={300}><BlogPreview /></LazySection>
        <LazySection minHeight={400}><Contact /></LazySection>
        <LazySection minHeight={200}><ReferralBanner /></LazySection>
        <Footer />
        <LazySection minHeight={0}><StickyCallButton /></LazySection>
        <LazySection minHeight={0}><AIChatbot /></LazySection>
      </main>
    </>
  );
};

export default Index;