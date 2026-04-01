import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToHash from "@/components/ScrollToHash";
import { AuthProvider } from "@/contexts/AuthContext";
import { HelmetProvider } from "react-helmet-async";
import usePageTracking from "@/hooks/usePageTracking";
import Index from "./pages/Index";

// Lazy load non-critical routes
const BookingForm = lazy(() => import("./pages/BookingForm"));
const Confirmation = lazy(() => import("./pages/Confirmation"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const CustomerPortal = lazy(() => import("./pages/CustomerPortal"));
const CleanerApplication = lazy(() => import("./pages/CleanerApplication"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Jacksonville-area city landing pages
const JacksonvilleCleaning = lazy(() => import("./pages/cities/JacksonvilleCleaning"));
const JacksonvilleBeachCleaning = lazy(() => import("./pages/cities/JacksonvilleBeachCleaning"));
const AtlanticBeachCleaning = lazy(() => import("./pages/cities/AtlanticBeachCleaning"));
const NeptuneBeachCleaning = lazy(() => import("./pages/cities/NeptuneBeachCleaning"));
const PonteVedraBeachCleaning = lazy(() => import("./pages/cities/PonteVedraBeachCleaning"));
const OrangeParkCleaning = lazy(() => import("./pages/cities/OrangeParkCleaning"));
const FlemingIslandCleaning = lazy(() => import("./pages/cities/FlemingIslandCleaning"));
const MandarinCleaning = lazy(() => import("./pages/cities/MandarinCleaning"));
const SanMarcoCleaning = lazy(() => import("./pages/cities/SanMarcoCleaning"));
const RiversideCleaning = lazy(() => import("./pages/cities/RiversideCleaning"));
const ArlingtonCleaning = lazy(() => import("./pages/cities/ArlingtonCleaning"));
const SouthsideCleaning = lazy(() => import("./pages/cities/SouthsideCleaning"));
const YuleeCleaning = lazy(() => import("./pages/cities/YuleeCleaning"));
const FernandinaBeachCleaning = lazy(() => import("./pages/cities/FernandinaBeachCleaning"));

// Blog posts
const BrowardCostGuide = lazy(() => import("./pages/blog/BrowardCostGuide"));
const MiamiPermitRules = lazy(() => import("./pages/blog/MiamiPermitRules"));
const PalmBeachSeasonalDiscounts = lazy(() => import("./pages/blog/PalmBeachSeasonalDiscounts"));
const MoveInOutCleaningChecklist = lazy(() => import("./pages/blog/MoveInOutCleaningChecklist"));
const DeepCleaningVsStandardCleaning = lazy(() => import("./pages/blog/DeepCleaningVsStandardCleaning"));
const PetFriendlyCleaningTips = lazy(() => import("./pages/blog/PetFriendlyCleaningTips"));
const HurricaneSeasonCleaningPrep = lazy(() => import("./pages/blog/HurricaneSeasonCleaningPrep"));
const HowToPrepareForCleaningService = lazy(() => import("./pages/blog/HowToPrepareForCleaningService"));
const SpringCleaningGuide = lazy(() => import("./pages/blog/SpringCleaningGuide"));
const EcoFriendlyCleaningProducts = lazy(() => import("./pages/blog/EcoFriendlyCleaningProducts"));
const AllergyFreeHomeCleaning = lazy(() => import("./pages/blog/AllergyFreeHomeCleaning"));
const HolidayCleaningChecklist = lazy(() => import("./pages/blog/HolidayCleaningChecklist"));
const BathroomDeepCleaningGuide = lazy(() => import("./pages/blog/BathroomDeepCleaningGuide"));
const KitchenCleaningHacks = lazy(() => import("./pages/blog/KitchenCleaningHacks"));
const AirbnbTurnoverCleaningTips = lazy(() => import("./pages/blog/AirbnbTurnoverCleaningTips"));
const MoldPreventionFlorida = lazy(() => import("./pages/blog/MoldPreventionFlorida"));
const CondoCleaningRules = lazy(() => import("./pages/blog/CondoCleaningRules"));
const PostConstructionCleaningGuide = lazy(() => import("./pages/blog/PostConstructionCleaningGuide"));
const AiBlogPost = lazy(() => import("./pages/blog/AiBlogPost"));

// New pages
const Blog = lazy(() => import("./pages/Blog"));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const FAQ = lazy(() => import("./pages/FAQ"));
const DeepCleaning = lazy(() => import("./pages/DeepCleaning"));
const StandardCleaning = lazy(() => import("./pages/StandardCleaning"));
const MoveInOutCleaning = lazy(() => import("./pages/MoveInOutCleaning"));
const CarpetCleaning = lazy(() => import("./pages/CarpetCleaning"));
const UpholsteryCleaning = lazy(() => import("./pages/UpholsteryCleaning"));
const AirbnbCleaning = lazy(() => import("./pages/AirbnbCleaning"));
const OfficeCleaning = lazy(() => import("./pages/OfficeCleaning"));
const PostConstructionCleaning = lazy(() => import("./pages/PostConstructionCleaning"));
const ContractorRateSheet = lazy(() => import("./pages/ContractorRateSheet"));
const Sitemap = lazy(() => import("./pages/Sitemap"));

const queryClient = new QueryClient();

// Wrapper component to use hooks inside Router
const AppRoutes = () => {
  usePageTracking();
  
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/my-bookings" element={<CustomerPortal />} />
        <Route path="/apply" element={<CleanerApplication />} />
        
        {/* Pages */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/deep-cleaning" element={<DeepCleaning />} />
        <Route path="/standard-cleaning" element={<StandardCleaning />} />
        <Route path="/move-in-out-cleaning" element={<MoveInOutCleaning />} />
        <Route path="/carpet-cleaning" element={<CarpetCleaning />} />
        <Route path="/upholstery-cleaning" element={<UpholsteryCleaning />} />
        <Route path="/contractor-rate-sheet" element={<ContractorRateSheet />} />
        <Route path="/sitemap" element={<Sitemap />} />
        
        {/* Jacksonville-Area City Landing Pages */}
        <Route path="/jacksonville-cleaning" element={<JacksonvilleCleaning />} />
        <Route path="/jacksonville-beach-cleaning" element={<JacksonvilleBeachCleaning />} />
        <Route path="/atlantic-beach-cleaning" element={<AtlanticBeachCleaning />} />
        <Route path="/neptune-beach-cleaning" element={<NeptuneBeachCleaning />} />
        <Route path="/ponte-vedra-beach-cleaning" element={<PonteVedraBeachCleaning />} />
        <Route path="/orange-park-cleaning" element={<OrangeParkCleaning />} />
        <Route path="/fleming-island-cleaning" element={<FlemingIslandCleaning />} />
        <Route path="/mandarin-cleaning" element={<MandarinCleaning />} />
        <Route path="/san-marco-cleaning" element={<SanMarcoCleaning />} />
        <Route path="/riverside-cleaning" element={<RiversideCleaning />} />
        <Route path="/riverside-avondale-cleaning" element={<RiversideCleaning />} />
        <Route path="/arlington-cleaning" element={<ArlingtonCleaning />} />
        <Route path="/southside-cleaning" element={<SouthsideCleaning />} />
        <Route path="/yulee-cleaning" element={<YuleeCleaning />} />
        <Route path="/fernandina-beach-cleaning" element={<FernandinaBeachCleaning />} />
        
        {/* Blog Posts */}
        <Route path="/blog/broward-cost-guide" element={<BrowardCostGuide />} />
        <Route path="/blog/miami-permit-rules" element={<MiamiPermitRules />} />
        <Route path="/blog/palm-beach-seasonal-discounts" element={<PalmBeachSeasonalDiscounts />} />
        <Route path="/blog/move-in-out-cleaning-checklist" element={<MoveInOutCleaningChecklist />} />
        <Route path="/blog/deep-cleaning-vs-standard-cleaning" element={<DeepCleaningVsStandardCleaning />} />
        <Route path="/blog/pet-friendly-cleaning-tips" element={<PetFriendlyCleaningTips />} />
        <Route path="/blog/hurricane-season-cleaning-prep" element={<HurricaneSeasonCleaningPrep />} />
        <Route path="/blog/how-to-prepare-for-cleaning-service" element={<HowToPrepareForCleaningService />} />
        <Route path="/blog/spring-cleaning-guide-south-florida" element={<SpringCleaningGuide />} />
        <Route path="/blog/eco-friendly-cleaning-products" element={<EcoFriendlyCleaningProducts />} />
        <Route path="/blog/allergy-free-home-cleaning" element={<AllergyFreeHomeCleaning />} />
        <Route path="/blog/holiday-cleaning-checklist" element={<HolidayCleaningChecklist />} />
        <Route path="/blog/bathroom-deep-cleaning-guide" element={<BathroomDeepCleaningGuide />} />
        <Route path="/blog/kitchen-cleaning-hacks" element={<KitchenCleaningHacks />} />
        <Route path="/blog/airbnb-turnover-cleaning-tips" element={<AirbnbTurnoverCleaningTips />} />
        <Route path="/blog/mold-prevention-florida-homes" element={<MoldPreventionFlorida />} />
        <Route path="/blog/condo-cleaning-rules-south-florida" element={<CondoCleaningRules />} />
        <Route path="/blog/post-construction-cleaning-guide" element={<PostConstructionCleaningGuide />} />
        
        {/* AI-Generated Blog Posts */}
        <Route path="/blog/ai/:slug" element={<AiBlogPost />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToHash />
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
