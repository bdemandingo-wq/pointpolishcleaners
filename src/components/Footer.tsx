import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo-transparent.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="TIDYWISE Logo" className="h-10 w-auto invert" />
              <span className="font-display text-xl font-bold">TIDYWISE</span>
            </div>
            <p className="text-background/70 text-sm mb-4">
              Professional cleaning services for South Florida homes. Licensed, bonded, and insured.
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:+15615718725" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                <Phone className="w-4 h-4" />
                (561) 571-8725
              </a>
              <a href="mailto:support@tidywisecleaning.com" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                <Mail className="w-4 h-4" />
                support@tidywisecleaning.com
              </a>
              <p className="flex items-center gap-2 text-background/70">
                <MapPin className="w-4 h-4" />
                South Florida
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/standard-cleaning" className="text-background/70 hover:text-background transition-colors">
                  Standard Cleaning
                </Link>
              </li>
              <li>
                <Link to="/deep-cleaning" className="text-background/70 hover:text-background transition-colors">
                  Deep Cleaning
                </Link>
              </li>
              <li>
                <Link to="/move-in-out-cleaning" className="text-background/70 hover:text-background transition-colors">
                  Move In/Out Cleaning
                </Link>
              </li>
              <li>
                <Link to="/#booking" className="text-background/70 hover:text-background transition-colors">
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/service-areas" className="text-background/70 hover:text-background transition-colors">
                  Service Areas
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-background/70 hover:text-background transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-background/70 hover:text-background transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/referral-program" className="text-background/70 hover:text-background transition-colors">
                  Referral Program
                </Link>
              </li>
              <li>
                <Link to="/apply" className="text-background/70 hover:text-background transition-colors">
                  Join Our Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-display font-semibold mb-4">Service Areas</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/broward-county-cleaning" className="text-background/70 hover:text-background transition-colors">
                  Broward County
                </Link>
              </li>
              <li>
                <Link to="/palm-beach-county-cleaning" className="text-background/70 hover:text-background transition-colors">
                  Palm Beach County
                </Link>
              </li>
              <li>
                <Link to="/miami-dade-cleaning" className="text-background/70 hover:text-background transition-colors">
                  Miami-Dade County
                </Link>
              </li>
              <li>
                <Link to="/service-areas" className="text-background/70 hover:text-background transition-colors">
                  View All Cities →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/70 text-sm">
            © {new Date().getFullYear()} TIDYWISE Cleaning Services. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/auth" className="text-background/70 hover:text-background transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
