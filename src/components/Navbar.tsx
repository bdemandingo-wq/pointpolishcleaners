import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo-optimized.webp";

const scrollToBooking = () => {
  const bookingSection = document.getElementById('booking');
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth' });
  }
};
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleBookNowClick = () => {
    if (location.pathname === '/') {
      // Already on homepage, just scroll
      scrollToBooking();
    } else {
      // Navigate to homepage first, then scroll
      navigate('/');
      setTimeout(() => scrollToBooking(), 100);
    }
  };

  const navLinks = [
    { href: "/", label: "Home", isRoute: true },
    { href: "/#services", label: "Services", isDropdown: true },
    { href: "/service-areas", label: "Areas", isRoute: true },
    { href: "/blog", label: "Blog", isRoute: true },
    { href: "/faq", label: "FAQ", isRoute: true },
  ];

  const serviceLinks = [
    { href: "/standard-cleaning", label: "Standard Cleaning" },
    { href: "/deep-cleaning", label: "Deep Cleaning" },
    { href: "/move-in-out-cleaning", label: "Move In/Out Cleaning" },
  ];

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        Skip to main content
      </a>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-display text-xl font-bold text-foreground">TIDYWISE</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              link.isDropdown ? (
                <DropdownMenu key={link.href}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors font-medium">
                    {link.label}
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center">
                    {serviceLinks.map((service) => (
                      <DropdownMenuItem key={service.href} asChild>
                        <Link to={service.href} className="cursor-pointer">
                          {service.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  {link.label}
                </a>
              )
            ))}
            {user && (
              <Link
                to="/my-bookings"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                <User className="h-4 w-4" />
                My Bookings
              </Link>
            )}
            <Button onClick={handleBookNowClick}>
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              
              {/* Services section */}
              <div className="py-2">
                <span className="text-foreground font-medium">Services</span>
                <div className="pl-4 mt-2 space-y-2">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.href}
                      to={service.href}
                      className="block text-muted-foreground hover:text-foreground transition-colors py-1"
                      onClick={() => setIsOpen(false)}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link
                to="/service-areas"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Service Areas
              </Link>
              <Link
                to="/blog"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/faq"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
              {user && (
                <Link
                  to="/my-bookings"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-4 w-4" />
                  My Bookings
                </Link>
              )}
              <Button className="w-full mt-2" onClick={() => { setIsOpen(false); handleBookNowClick(); }}>
                Book Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
};

export default Navbar;
