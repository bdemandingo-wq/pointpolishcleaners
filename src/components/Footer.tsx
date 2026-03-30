import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Shield, Leaf } from "lucide-react";
import logo from "@/assets/logo.png";


const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Point Polish Cleaners" className="h-12 w-auto" />
            </div>
            <p className="text-background/70 text-sm mb-2">
              Luxury-Level Cleaning. Every Detail Polished.
            </p>
            <p className="text-background/60 text-xs mb-4">
              Professional cleaning services for Jacksonville, FL homes. Licensed, bonded, and insured.
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:+19045139002" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                <Phone className="w-4 h-4" />
                (904) 513-9002
              </a>
              <a href="mailto:support@pointpolishcleaners.com" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                <Mail className="w-4 h-4" />
                support@pointpolishcleaners.com
              </a>
              <p className="flex items-center gap-2 text-background/70">
                <MapPin className="w-4 h-4" />
                Jacksonville, FL
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/standard-cleaning" className="text-background/70 hover:text-background transition-colors">Standard Cleaning</Link></li>
              <li><Link to="/deep-cleaning" className="text-background/70 hover:text-background transition-colors">Deep Cleaning</Link></li>
              <li><Link to="/move-in-out-cleaning" className="text-background/70 hover:text-background transition-colors">Move In/Out Cleaning</Link></li>
              <li><Link to="/carpet-cleaning" className="text-background/70 hover:text-background transition-colors">Carpet Cleaning</Link></li>
              <li><Link to="/upholstery-cleaning" className="text-background/70 hover:text-background transition-colors">Upholstery Cleaning</Link></li>
              <li><Link to={{ pathname: "/", hash: "#booking" }} className="text-background/70 hover:text-background transition-colors">Get a Quote</Link></li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-display font-semibold mb-4">Service Areas</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/jacksonville-cleaning" className="text-background/70 hover:text-background transition-colors">Jacksonville</Link></li>
              <li><Link to="/jacksonville-beach-cleaning" className="text-background/70 hover:text-background transition-colors">Jacksonville Beach</Link></li>
              <li><Link to="/ponte-vedra-beach-cleaning" className="text-background/70 hover:text-background transition-colors">Ponte Vedra Beach</Link></li>
              <li><Link to="/mandarin-cleaning" className="text-background/70 hover:text-background transition-colors">Mandarin</Link></li>
              <li><Link to="/riverside-cleaning" className="text-background/70 hover:text-background transition-colors">Riverside / Avondale</Link></li>
              <li><Link to="/service-areas" className="text-background/70 hover:text-background transition-colors">View All Areas →</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/service-areas" className="text-background/70 hover:text-background transition-colors">Service Areas</Link></li>
              <li><Link to="/faq" className="text-background/70 hover:text-background transition-colors">FAQ</Link></li>
              <li><Link to="/blog" className="text-background/70 hover:text-background transition-colors">Blog & Tips</Link></li>
              <li><Link to="/apply" className="text-background/70 hover:text-background transition-colors">Join Our Team</Link></li>
              <li><Link to="/sitemap" className="text-background/70 hover:text-background transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        {/* Trust signals */}
        <div className="border-t border-background/20 py-6 mb-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-background/70">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              <span>Eco-Friendly</span>
            </div>
            <span>Jacksonville, FL</span>
          </div>
        </div>

        {/* Promo */}
        <div className="border-t border-background/20 pt-6 mb-6">
          <p className="text-background/70 text-sm text-center max-w-3xl mx-auto">
            🎉 <strong>10% Off Your First Cleaning!</strong> Use code <strong>POLISH</strong> when booking. Free estimates available.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-background/20 pt-6 mb-6">
          <p className="text-background/50 text-xs text-center max-w-3xl mx-auto">
            Point Polish Cleaners is a licensed and insured cleaning service operating in Jacksonville, Florida. All cleaners are background-checked and professionally trained.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-6 pb-20 md:pb-16 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 relative z-50">
          <p className="text-background/70 text-sm">
            © {new Date().getFullYear()} Point Polish Cleaners. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/sitemap" className="text-background/70 hover:text-background transition-colors">Sitemap</Link>
            <Link to="/auth" className="text-background/70 hover:text-background transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
