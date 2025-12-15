import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

// County landing pages
const BrowardCountyCleaning = lazy(() => import("./pages/BrowardCountyCleaning"));
const MiamiDadeCleaning = lazy(() => import("./pages/MiamiDadeCleaning"));
const PalmBeachCountyCleaning = lazy(() => import("./pages/PalmBeachCountyCleaning"));

// City landing pages - Broward
const FortLauderdaleCleaning = lazy(() => import("./pages/cities/FortLauderdaleCleaning"));
const HollywoodCleaning = lazy(() => import("./pages/cities/HollywoodCleaning"));
const PompanoBeachCleaning = lazy(() => import("./pages/cities/PompanoBeachCleaning"));
const PlantationCleaning = lazy(() => import("./pages/cities/PlantationCleaning"));
const SunriseCleaning = lazy(() => import("./pages/cities/SunriseCleaning"));
const DavieCleaning = lazy(() => import("./pages/cities/DavieCleaning"));
const PembrokePinesCleaning = lazy(() => import("./pages/cities/PembrokePinesCleaning"));
const WestonCleaning = lazy(() => import("./pages/cities/WestonCleaning"));
const DeerfieldBeachCleaning = lazy(() => import("./pages/cities/DeerfieldBeachCleaning"));
const MiramarCleaning = lazy(() => import("./pages/cities/MiramarCleaning"));
const LauderhillCleaning = lazy(() => import("./pages/cities/LauderhillCleaning"));
const TamaracCleaning = lazy(() => import("./pages/cities/TamaracCleaning"));
const CoralSpringsCleaning = lazy(() => import("./pages/cities/CoralSpringsCleaning"));
const CoconutCreekCleaning = lazy(() => import("./pages/cities/CoconutCreekCleaning"));
const MargateCleaning = lazy(() => import("./pages/cities/MargateCleaning"));
const HallandaleBeachCleaning = lazy(() => import("./pages/cities/HallandaleBeachCleaning"));
const ParklandCleaning = lazy(() => import("./pages/cities/ParklandCleaning"));
const CooperCityCleaning = lazy(() => import("./pages/cities/CooperCityCleaning"));
const OaklandParkCleaning = lazy(() => import("./pages/cities/OaklandParkCleaning"));
const WiltonManorsCleaning = lazy(() => import("./pages/cities/WiltonManorsCleaning"));

// City landing pages - Palm Beach
const BocaRatonCleaning = lazy(() => import("./pages/cities/BocaRatonCleaning"));
const WestPalmBeachCleaning = lazy(() => import("./pages/cities/WestPalmBeachCleaning"));
const DelrayBeachCleaning = lazy(() => import("./pages/cities/DelrayBeachCleaning"));
const BoyntonBeachCleaning = lazy(() => import("./pages/cities/BoyntonBeachCleaning"));
const LakeWorthCleaning = lazy(() => import("./pages/cities/LakeWorthCleaning"));
const JupiterCleaning = lazy(() => import("./pages/cities/JupiterCleaning"));
const PalmBeachGardensCleaning = lazy(() => import("./pages/cities/PalmBeachGardensCleaning"));
const WellingtonCleaning = lazy(() => import("./pages/cities/WellingtonCleaning"));
const RoyalPalmBeachCleaning = lazy(() => import("./pages/cities/RoyalPalmBeachCleaning"));

// City landing pages - Miami-Dade
const MiamiBeachCleaning = lazy(() => import("./pages/cities/MiamiBeachCleaning"));
const MiamiCleaning = lazy(() => import("./pages/cities/MiamiCleaning"));
const HialeahCleaning = lazy(() => import("./pages/cities/HialeahCleaning"));
const CoralGablesCleaning = lazy(() => import("./pages/cities/CoralGablesCleaning"));
const NorthMiamiCleaning = lazy(() => import("./pages/cities/NorthMiamiCleaning"));
const NorthMiamiBeachCleaning = lazy(() => import("./pages/cities/NorthMiamiBeachCleaning"));
const AventuraCleaning = lazy(() => import("./pages/cities/AventuraCleaning"));
const SunnyIslesBeachCleaning = lazy(() => import("./pages/cities/SunnyIslesBeachCleaning"));
const DoralCleaning = lazy(() => import("./pages/cities/DoralCleaning"));
const HomesteadCleaning = lazy(() => import("./pages/cities/HomesteadCleaning"));
const MiamiGardensCleaning = lazy(() => import("./pages/cities/MiamiGardensCleaning"));

// Blog posts
const BrowardCostGuide = lazy(() => import("./pages/blog/BrowardCostGuide"));
const MiamiPermitRules = lazy(() => import("./pages/blog/MiamiPermitRules"));
const PalmBeachSeasonalDiscounts = lazy(() => import("./pages/blog/PalmBeachSeasonalDiscounts"));
const MoveInOutCleaningChecklist = lazy(() => import("./pages/blog/MoveInOutCleaningChecklist"));
const DeepCleaningVsStandardCleaning = lazy(() => import("./pages/blog/DeepCleaningVsStandardCleaning"));
const PetFriendlyCleaningTips = lazy(() => import("./pages/blog/PetFriendlyCleaningTips"));
const HurricaneSeasonCleaningPrep = lazy(() => import("./pages/blog/HurricaneSeasonCleaningPrep"));
const HowToPrepareForCleaningService = lazy(() => import("./pages/blog/HowToPrepareForCleaningService"));

// New pages
const Blog = lazy(() => import("./pages/Blog"));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const FAQ = lazy(() => import("./pages/FAQ"));
const DeepCleaning = lazy(() => import("./pages/DeepCleaning"));
const StandardCleaning = lazy(() => import("./pages/StandardCleaning"));
const MoveInOutCleaning = lazy(() => import("./pages/MoveInOutCleaning"));
const ReferralProgram = lazy(() => import("./pages/ReferralProgram"));
const ContractorRateSheet = lazy(() => import("./pages/ContractorRateSheet"));

const queryClient = new QueryClient();

// Wrapper component to use hooks inside Router
const AppRoutes = () => {
  usePageTracking();
  
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/my-bookings" element={<CustomerPortal />} />
        <Route path="/apply" element={<CleanerApplication />} />
        
        {/* New Pages */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/deep-cleaning" element={<DeepCleaning />} />
        <Route path="/standard-cleaning" element={<StandardCleaning />} />
        <Route path="/move-in-out-cleaning" element={<MoveInOutCleaning />} />
        <Route path="/referral-program" element={<ReferralProgram />} />
        <Route path="/contractor-rate-sheet" element={<ContractorRateSheet />} />
        
        {/* County Landing Pages */}
        <Route path="/broward-county-cleaning" element={<BrowardCountyCleaning />} />
        <Route path="/miami-dade-cleaning" element={<MiamiDadeCleaning />} />
        <Route path="/palm-beach-county-cleaning" element={<PalmBeachCountyCleaning />} />
        
        {/* City Landing Pages - Broward */}
        <Route path="/fort-lauderdale-cleaning" element={<FortLauderdaleCleaning />} />
        <Route path="/hollywood-cleaning" element={<HollywoodCleaning />} />
        <Route path="/pompano-beach-cleaning" element={<PompanoBeachCleaning />} />
        <Route path="/plantation-cleaning" element={<PlantationCleaning />} />
        <Route path="/sunrise-cleaning" element={<SunriseCleaning />} />
        <Route path="/davie-cleaning" element={<DavieCleaning />} />
        <Route path="/pembroke-pines-cleaning" element={<PembrokePinesCleaning />} />
        <Route path="/weston-cleaning" element={<WestonCleaning />} />
        <Route path="/deerfield-beach-cleaning" element={<DeerfieldBeachCleaning />} />
        <Route path="/miramar-cleaning" element={<MiramarCleaning />} />
        <Route path="/lauderhill-cleaning" element={<LauderhillCleaning />} />
        <Route path="/tamarac-cleaning" element={<TamaracCleaning />} />
        <Route path="/coral-springs-cleaning" element={<CoralSpringsCleaning />} />
        
        {/* City Landing Pages - Palm Beach */}
        <Route path="/boca-raton-cleaning" element={<BocaRatonCleaning />} />
        <Route path="/west-palm-beach-cleaning" element={<WestPalmBeachCleaning />} />
        <Route path="/delray-beach-cleaning" element={<DelrayBeachCleaning />} />
        <Route path="/boynton-beach-cleaning" element={<BoyntonBeachCleaning />} />
        <Route path="/lake-worth-cleaning" element={<LakeWorthCleaning />} />
        <Route path="/jupiter-cleaning" element={<JupiterCleaning />} />
        <Route path="/palm-beach-gardens-cleaning" element={<PalmBeachGardensCleaning />} />
        <Route path="/wellington-cleaning" element={<WellingtonCleaning />} />
        <Route path="/royal-palm-beach-cleaning" element={<RoyalPalmBeachCleaning />} />
        
        {/* City Landing Pages - Miami-Dade */}
        <Route path="/miami-beach-cleaning" element={<MiamiBeachCleaning />} />
        <Route path="/miami-cleaning" element={<MiamiCleaning />} />
        <Route path="/hialeah-cleaning" element={<HialeahCleaning />} />
        <Route path="/coral-gables-cleaning" element={<CoralGablesCleaning />} />
        <Route path="/north-miami-cleaning" element={<NorthMiamiCleaning />} />
        <Route path="/north-miami-beach-cleaning" element={<NorthMiamiBeachCleaning />} />
        <Route path="/aventura-cleaning" element={<AventuraCleaning />} />
        <Route path="/sunny-isles-beach-cleaning" element={<SunnyIslesBeachCleaning />} />
        <Route path="/doral-cleaning" element={<DoralCleaning />} />
        <Route path="/homestead-cleaning" element={<HomesteadCleaning />} />
        <Route path="/miami-gardens-cleaning" element={<MiamiGardensCleaning />} />
        
        {/* City Landing Pages - Broward (additional) */}
        <Route path="/coconut-creek-cleaning" element={<CoconutCreekCleaning />} />
        <Route path="/margate-cleaning" element={<MargateCleaning />} />
        <Route path="/hallandale-beach-cleaning" element={<HallandaleBeachCleaning />} />
        <Route path="/parkland-cleaning" element={<ParklandCleaning />} />
        <Route path="/cooper-city-cleaning" element={<CooperCityCleaning />} />
        <Route path="/oakland-park-cleaning" element={<OaklandParkCleaning />} />
        <Route path="/wilton-manors-cleaning" element={<WiltonManorsCleaning />} />
        
        {/* Blog Posts */}
        <Route path="/blog/broward-cost-guide" element={<BrowardCostGuide />} />
        <Route path="/blog/miami-permit-rules" element={<MiamiPermitRules />} />
        <Route path="/blog/palm-beach-seasonal-discounts" element={<PalmBeachSeasonalDiscounts />} />
        <Route path="/blog/move-in-out-cleaning-checklist" element={<MoveInOutCleaningChecklist />} />
        <Route path="/blog/deep-cleaning-vs-standard-cleaning" element={<DeepCleaningVsStandardCleaning />} />
        <Route path="/blog/pet-friendly-cleaning-tips" element={<PetFriendlyCleaningTips />} />
        <Route path="/blog/hurricane-season-cleaning-prep" element={<HurricaneSeasonCleaningPrep />} />
        <Route path="/blog/how-to-prepare-for-cleaning-service" element={<HowToPrepareForCleaningService />} />
        
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
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
