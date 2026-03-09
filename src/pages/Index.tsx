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

// FAQ data for schema
const homepageFaqs = [
  { q: "How much does house cleaning cost in South Florida?", a: "Our standard cleaning starts at $108 for homes up to 750 sq ft. Deep cleaning starts at $208 and move in/out cleaning starts at $283. Use our instant price calculator above for your exact quote based on home size and service type." },
  { q: "Are your cleaners background-checked?", a: "Yes! Every TIDYWISE cleaner undergoes a thorough background check, is fully insured, and goes through our professional training program before their first assignment." },
  { q: "Do I need to be home during the cleaning?", a: "No, many of our clients provide a spare key or door code. We're fully insured and bonded, so your home is protected. You can also be home if you prefer." },
  { q: "What cleaning products do you use?", a: "We use eco-friendly, non-toxic cleaning products that are safe for children, pets, and the environment. If you have specific product preferences or allergies, let us know and we'll accommodate." },
  { q: "What's your cancellation policy?", a: "We ask for at least 24 hours notice for cancellations. Same-day cancellations may be subject to a fee. We understand things come up, so we're always flexible and understanding." },
  { q: "Do you offer recurring cleaning discounts?", a: "Absolutely! Weekly service saves 15%, bi-weekly saves 10%, and monthly saves 5%. The more frequently you book, the more you save." },
  { q: "What areas do you serve?", a: "We serve 40+ cities across Broward County, Miami-Dade County, and Palm Beach County including Fort Lauderdale, Miami, Boca Raton, West Palm Beach, Hollywood, Coral Springs, and many more." },
  { q: "What's included in a deep clean vs. a standard clean?", a: "A standard clean covers all basic cleaning — vacuuming, mopping, bathroom sanitization, kitchen cleaning, and dusting. A deep clean includes all of that PLUS baseboards, inside cabinets, light fixtures, door handles, window sills, and all add-on services." },
];

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
        pageTitle="House Cleaning Fort Lauderdale, Boca Raton & West Palm Beach | TIDYWISE"
        pageDescription="Top-rated house cleaning in Fort Lauderdale, Boca Raton & West Palm Beach. TIDYWISE serves 40+ South Florida cities. Instant online quotes. Licensed & insured. Call (561) 571-8725."
        canonicalUrl="https://tidywisecleaning.com"
        pageType="home"
        faqItems={homepageFaqs}
      />
      <main id="main-content" className="min-h-screen">
        <Navbar />
        <Hero />
        <SocialProofBar />
        <Services />
        <LazySection minHeight={350}><HowItWorks /></LazySection>
        <PricingCalculator />
        
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
