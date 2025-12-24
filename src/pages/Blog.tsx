import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import StickyCallButton from "@/components/seo/StickyCallButton";

const blogPosts = [
  {
    slug: "move-in-out-cleaning-checklist",
    title: "The Ultimate Move In/Out Cleaning Checklist for South Florida",
    excerpt: "Moving in or out of a South Florida property? This comprehensive checklist ensures you get your security deposit back and start fresh in your new home.",
    date: "January 2025",
    readTime: "7 min read",
    category: "Guides"
  },
  {
    slug: "deep-cleaning-vs-standard-cleaning",
    title: "Deep Cleaning vs Standard Cleaning: Which Do You Need?",
    excerpt: "Not sure whether to book a standard or deep cleaning? Here's everything you need to know to make the right choice for your South Florida home.",
    date: "January 2025",
    readTime: "6 min read",
    category: "Guides"
  },
  {
    slug: "pet-friendly-cleaning-tips",
    title: "Pet-Friendly Home Cleaning Tips for Florida Pet Owners",
    excerpt: "Love your furry friends but struggling with pet hair and odors? Here are expert tips to keep your South Florida home fresh and clean—safely for your pets.",
    date: "January 2025",
    readTime: "6 min read",
    category: "Tips"
  },
  {
    slug: "hurricane-season-cleaning-prep",
    title: "Hurricane Season Home Cleaning & Prep Guide for South Florida",
    excerpt: "Hurricane season runs June 1 - November 30. Here's your complete guide to preparing your home before the storm and cleaning up after.",
    date: "January 2025",
    readTime: "8 min read",
    category: "Seasonal"
  },
  {
    slug: "how-to-prepare-for-cleaning-service",
    title: "How to Prepare for Your Professional Cleaning Service",
    excerpt: "A little preparation goes a long way! Here's how to get the most out of your professional cleaning appointment.",
    date: "January 2025",
    readTime: "5 min read",
    category: "Tips"
  },
  {
    slug: "broward-cost-guide",
    title: "2025 Cost Guide for Cleaning Services in Broward County",
    excerpt: "Planning your cleaning budget for 2025? Here's everything you need to know about Broward County cleaning service costs.",
    date: "January 2025",
    readTime: "5 min read",
    category: "Pricing"
  },
  {
    slug: "miami-permit-rules",
    title: "Miami-Dade Cleaning Service Regulations & Tips",
    excerpt: "Understanding local regulations and best practices for professional cleaning services in Miami-Dade County.",
    date: "January 2025",
    readTime: "5 min read",
    category: "Local"
  },
  {
    slug: "palm-beach-seasonal-discounts",
    title: "Palm Beach County Seasonal Cleaning Discounts & Tips",
    excerpt: "Take advantage of seasonal offers and learn the best times to book cleaning services in Palm Beach County.",
    date: "January 2025",
    readTime: "4 min read",
    category: "Deals"
  },
  {
    slug: "spring-cleaning-guide-south-florida",
    title: "Spring Cleaning Guide for South Florida Homes",
    excerpt: "Spring in South Florida means pollen, humidity, and the perfect time for a deep clean. Get your home ready for the season with our comprehensive guide.",
    date: "December 2024",
    readTime: "6 min read",
    category: "Seasonal"
  },
  {
    slug: "eco-friendly-cleaning-products",
    title: "Best Eco-Friendly Cleaning Products for Florida Homes",
    excerpt: "Protect your family and the environment with these sustainable cleaning solutions perfect for South Florida's unique climate.",
    date: "December 2024",
    readTime: "5 min read",
    category: "Tips"
  },
  {
    slug: "allergy-free-home-cleaning",
    title: "Allergy-Free Home Cleaning Tips for Florida Residents",
    excerpt: "Florida's year-round pollen and humidity can trigger allergies. Learn how to create an allergy-free home with proper cleaning techniques.",
    date: "December 2024",
    readTime: "7 min read",
    category: "Health"
  },
  {
    slug: "holiday-cleaning-checklist",
    title: "Holiday Cleaning Checklist: Prepare Your Home for Guests",
    excerpt: "Expecting holiday visitors? Here's your complete checklist to get your South Florida home guest-ready in no time.",
    date: "December 2024",
    readTime: "5 min read",
    category: "Seasonal"
  },
  {
    slug: "bathroom-deep-cleaning-guide",
    title: "Complete Bathroom Deep Cleaning Guide",
    excerpt: "Tackle soap scum, mold, and grime with our step-by-step bathroom deep cleaning guide designed for Florida's humid climate.",
    date: "December 2024",
    readTime: "8 min read",
    category: "Guides"
  },
  {
    slug: "kitchen-cleaning-hacks",
    title: "10 Kitchen Cleaning Hacks That Save Time",
    excerpt: "Make kitchen cleaning faster and easier with these pro tips from South Florida's cleaning experts.",
    date: "December 2024",
    readTime: "4 min read",
    category: "Tips"
  },
  {
    slug: "airbnb-turnover-cleaning-tips",
    title: "Airbnb & Vacation Rental Turnover Cleaning Tips",
    excerpt: "Maximize your rental reviews with quick and thorough turnover cleaning. Essential tips for South Florida property hosts.",
    date: "December 2024",
    readTime: "6 min read",
    category: "Guides"
  },
  {
    slug: "mold-prevention-florida-homes",
    title: "Mold Prevention Guide for Florida Homes",
    excerpt: "Florida's humidity creates perfect conditions for mold. Learn how to prevent and address mold issues in your home.",
    date: "December 2024",
    readTime: "7 min read",
    category: "Health"
  },
  {
    slug: "condo-cleaning-rules-south-florida",
    title: "Condo Cleaning Rules & Tips for South Florida",
    excerpt: "Navigate HOA rules and building regulations while keeping your South Florida condo spotless.",
    date: "December 2024",
    readTime: "5 min read",
    category: "Local"
  },
  {
    slug: "post-construction-cleaning-guide",
    title: "Post-Construction Cleaning: What to Expect",
    excerpt: "Just finished a renovation? Here's everything you need to know about post-construction cleaning in South Florida.",
    date: "December 2024",
    readTime: "6 min read",
    category: "Guides"
  }
];

const categories = ["All", "Guides", "Tips", "Seasonal", "Pricing", "Local", "Deals", "Health"];

const Blog = () => {
  return (
    <>
      <SEOSchema
        pageTitle="Cleaning Tips & Guides Blog | TIDYWISE South Florida"
        pageDescription="Expert cleaning tips, guides, and advice for South Florida homeowners. Learn about deep cleaning, pet-friendly cleaning, hurricane prep, and more from TIDYWISE."
        canonicalUrl="https://tidywisecleaning.com/blog"
        pageType="blog"
        county="South Florida"
      />
      <main className="min-h-screen">
        <Navbar />
        
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Cleaning Tips & Guides
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Expert advice for keeping your South Florida home sparkling clean. 
              From seasonal tips to service guides, we've got you covered.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Category Tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <span 
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                    category === "All" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground hover:bg-primary/10"
                  }`}
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article 
                  key={post.slug}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h2 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all"
                      >
                        Read More <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Ready for a Sparkling Clean Home?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Let TIDYWISE handle the cleaning while you enjoy your free time. 
              Serving Broward, Palm Beach, and Miami-Dade counties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/#booking"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Get Free Quote
              </Link>
              <a 
                href="tel:+15615718725"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors"
              >
                Call (561) 571-8725
              </a>
            </div>
          </div>
        </section>

        <Footer />
        <StickyCallButton />
      </main>
    </>
  );
};

export default Blog;
