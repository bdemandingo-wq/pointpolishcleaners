import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import StickyCallButton from "@/components/seo/StickyCallButton";

const features = [
  "Workstation & desk sanitization",
  "Break room & kitchen cleaning",
  "Restroom deep cleaning & restocking",
  "Floor vacuuming, mopping & polishing",
  "Trash & recycling removal",
  "Window & glass cleaning",
  "Reception & lobby cleaning",
  "Flexible day or evening scheduling",
];

const OfficeCleaning = () => {
  return (
    <>
      <Helmet>
        <title>Office Cleaning Services Jacksonville FL | PointPolish Cleaners</title>
        <meta name="description" content="Professional office and commercial cleaning in Jacksonville, FL. Flexible scheduling, thorough sanitization by PointPolish Cleaners." />
      </Helmet>
      <Navbar />
      <main id="main-content" className="pt-20">
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                Office & Commercial Cleaning
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                A clean workspace boosts productivity and impresses clients. Our professional office cleaning keeps your Jacksonville business spotless with flexible scheduling options.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/booking">Get a Quote <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg">
                  <a href="tel:+19045139002">Call (904) 513-9002</a>
                </Button>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">What's Included</h2>
              <ul className="space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCallButton />
    </>
  );
};

export default OfficeCleaning;
