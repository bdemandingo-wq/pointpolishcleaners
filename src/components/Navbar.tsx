import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
    { href: "/apply", label: "Join Our Team", isRoute: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <img src={logo} alt="TIDYWISE Logo" className="h-10 w-auto" />
            <span className="font-display text-xl font-bold text-foreground">TIDYWISE</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isRoute ? (
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
            <Button asChild>
              <a href="#booking">Book Now</a>
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
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              ))}
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
              <Button asChild className="w-full">
                <a href="#booking" onClick={() => setIsOpen(false)}>Book Now</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
