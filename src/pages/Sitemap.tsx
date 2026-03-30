import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyCallButton from "@/components/seo/StickyCallButton";

const Sitemap = () => {
  const baseUrl = "https://pointpolishcleaners.com";
  
  const sitemapSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Sitemap | Point Polish Cleaners",
    "description": "Complete sitemap for Point Polish Cleaners. Find all our service pages, area locations, and helpful blog articles.",
    "url": `${baseUrl}/sitemap`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        { "@type": "SiteNavigationElement", "position": 1, "name": "Home", "url": baseUrl },
        { "@type": "SiteNavigationElement", "position": 2, "name": "Standard Cleaning", "url": `${baseUrl}/standard-cleaning` },
        { "@type": "SiteNavigationElement", "position": 3, "name": "Deep Cleaning", "url": `${baseUrl}/deep-cleaning` },
        { "@type": "SiteNavigationElement", "position": 4, "name": "Service Areas", "url": `${baseUrl}/service-areas` },
        { "@type": "SiteNavigationElement", "position": 5, "name": "Blog", "url": `${baseUrl}/blog` },
        { "@type": "SiteNavigationElement", "position": 6, "name": "FAQ", "url": `${baseUrl}/faq` },
        { "@type": "SiteNavigationElement", "position": 7, "name": "Book a Cleaning", "url": `${baseUrl}/booking` },
      ]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": "Sitemap", "item": `${baseUrl}/sitemap` },
    ]
  };

  const services = [
    { name: "Standard Cleaning", path: "/standard-cleaning" },
    { name: "Deep Cleaning", path: "/deep-cleaning" },
    { name: "Move In/Out Cleaning", path: "/move-in-out-cleaning" },
    { name: "Carpet Cleaning", path: "/carpet-cleaning" },
    { name: "Upholstery Cleaning", path: "/upholstery-cleaning" },
  ];

  const areas = [
    { name: "Jacksonville", path: "/jacksonville-cleaning" },
    { name: "Jacksonville Beach", path: "/jacksonville-beach-cleaning" },
    { name: "Atlantic Beach", path: "/atlantic-beach-cleaning" },
    { name: "Neptune Beach", path: "/neptune-beach-cleaning" },
    { name: "Ponte Vedra Beach", path: "/ponte-vedra-beach-cleaning" },
    { name: "Orange Park", path: "/orange-park-cleaning" },
    { name: "Fleming Island", path: "/fleming-island-cleaning" },
    { name: "Mandarin", path: "/mandarin-cleaning" },
    { name: "San Marco", path: "/san-marco-cleaning" },
    { name: "Riverside", path: "/riverside-cleaning" },
    { name: "Arlington", path: "/arlington-cleaning" },
    { name: "Southside", path: "/southside-cleaning" },
  ];

  const blogPosts = [
    { name: "Move In/Out Cleaning Checklist", path: "/blog/move-in-out-cleaning-checklist" },
    { name: "Deep Cleaning vs Standard Cleaning", path: "/blog/deep-cleaning-vs-standard-cleaning" },
    { name: "Pet-Friendly Cleaning Tips", path: "/blog/pet-friendly-cleaning-tips" },
    { name: "Hurricane Season Cleaning Prep", path: "/blog/hurricane-season-cleaning-prep" },
    { name: "How to Prepare for Cleaning Service", path: "/blog/how-to-prepare-for-cleaning-service" },
    { name: "Spring Cleaning Guide", path: "/blog/spring-cleaning-guide-south-florida" },
    { name: "Eco-Friendly Cleaning Products", path: "/blog/eco-friendly-cleaning-products" },
    { name: "Allergy-Free Home Cleaning", path: "/blog/allergy-free-home-cleaning" },
    { name: "Holiday Cleaning Checklist", path: "/blog/holiday-cleaning-checklist" },
    { name: "Bathroom Deep Cleaning Guide", path: "/blog/bathroom-deep-cleaning-guide" },
    { name: "Kitchen Cleaning Hacks", path: "/blog/kitchen-cleaning-hacks" },
    { name: "Airbnb Turnover Cleaning Tips", path: "/blog/airbnb-turnover-cleaning-tips" },
    { name: "Mold Prevention Florida", path: "/blog/mold-prevention-florida-homes" },
    { name: "Post-Construction Cleaning Guide", path: "/blog/post-construction-cleaning-guide" },
  ];

  const pages = [
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/service-areas" },
    { name: "FAQ", path: "/faq" },
    { name: "Blog", path: "/blog" },
    { name: "Book a Cleaning", path: "/booking" },
    { name: "Join Our Team", path: "/apply" },
  ];

  return (
    <>
      <Helmet>
        <title>Sitemap | Point Polish Cleaners</title>
        <meta name="description" content="Complete sitemap for Point Polish Cleaners. Find all our service pages, area locations, and helpful blog articles." />
        <link rel="canonical" href={`${baseUrl}/sitemap`} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(sitemapSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <main className="min-h-screen">
        <Navbar />
        
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Sitemap</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Navigate all pages and services offered by Point Polish Cleaners in Jacksonville, FL.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Main Pages</h2>
                <ul className="space-y-2">
                  {pages.map((page) => (
                    <li key={page.path}>
                      <Link to={page.path} className="text-primary hover:underline">{page.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Our Services</h2>
                <ul className="space-y-2">
                  {services.map((service) => (
                    <li key={service.path}>
                      <Link to={service.path} className="text-primary hover:underline">{service.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Service Areas</h2>
                <ul className="space-y-2">
                  {areas.map((area) => (
                    <li key={area.path}>
                      <Link to={area.path} className="text-primary hover:underline text-sm">{area.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 lg:col-span-3">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Blog Articles</h2>
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {blogPosts.map((post) => (
                    <li key={post.path}>
                      <Link to={post.path} className="text-primary hover:underline text-sm">{post.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Ready for a Sparkling Clean Home?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Book your cleaning service today. Serving Jacksonville and surrounding areas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/#booking"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Get Free Quote
              </Link>
              <a 
                href="tel:+19045139002"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors"
              >
                Call (904) 513-9002
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

export default Sitemap;
