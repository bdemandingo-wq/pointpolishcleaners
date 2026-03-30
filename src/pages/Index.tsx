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
const StickyCallButton = lazy(() => import("@/components/seo/StickyCallButton"));

// FAQ data for schema
const homepageFaqs = [
  { q: "How much does house cleaning cost in Jacksonville?", a: "Our standard cleaning starts at $108 for homes up to 750 sq ft. Deep cleaning starts at $208 and move in/out cleaning starts at $283. Use our instant price calculator for your exact quote." },
  { q: "Are your cleaners background-checked?", a: "Yes! Every Point Polish cleaner undergoes a thorough background check, is fully insured, and goes through our professional training program." },
  { q: "Do I need to be home during the cleaning?", a: "No, many of our clients provide a spare key or door code. We're fully insured and bonded, so your home is protected." },
  { q: "What cleaning products do you use?", a: "We use eco-friendly, non-toxic cleaning products that are safe for children, pets, and the environment." },
  { q: "What's your cancellation policy?", a: "We ask for at least 24 hours notice for cancellations. Same-day cancellations may be subject to a fee." },
  { q: "Do you offer recurring cleaning discounts?", a: "Absolutely! Weekly service saves 15%, bi-weekly saves 10%, and monthly saves 5%." },
  { q: "What areas do you serve?", a: "We serve Jacksonville, FL and surrounding areas including Jacksonville Beach, Atlantic Beach, Neptune Beach, and Ponte Vedra Beach." },
  { q: "Do you offer a first-time discount?", a: "Yes! Use promo code POLISH to get 10% off your first cleaning. We also offer free estimates on all services." },
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
        pageTitle="House Cleaning Jacksonville FL | Licensed & Insured | Point Polish Cleaners"
        pageDescription="Premium house cleaning in Jacksonville, FL. Point Polish Cleaners delivers luxury-level cleaning with precision and care. 10% off first cleaning with code POLISH. Call (904) 513-9002."
        canonicalUrl="https://pointpolishcleaners.com"
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