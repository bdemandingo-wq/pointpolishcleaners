import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt="TIDYWISE Logo" className="h-10 w-auto" />
            <span className="font-display text-xl font-bold">TIDYWISE</span>
          </div>
          <div className="flex items-center gap-6">
            <Link 
              to="/apply" 
              className="text-background/70 hover:text-background text-sm transition-colors"
            >
              Join Our Team
            </Link>
            <Link 
              to="/auth" 
              className="text-background/70 hover:text-background text-sm transition-colors"
            >
              Admin
            </Link>
            <p className="text-background/70 text-sm">
              © {new Date().getFullYear()} TIDYWISE Cleaning Services. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
