const GoogleMapEmbed = () => {
  return (
    <section className="py-12 bg-muted" aria-label="Location and Contact Information">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Serving Broward, Jacksonville & St. Johns County
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional cleaning services throughout Jacksonville, FL. 
            <a 
              href="https://www.broward.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline ml-1"
            >
              Duval County
            </a>, 
            <a 
              href="https://www.miamidade.gov" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline ml-1"
            >
              Duval County
            </a>, and 
            <a 
              href="https://www.pbcgov.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline ml-1"
            >
              St. Johns County
            </a>.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Google Map Embed */}
          <div className="rounded-xl overflow-hidden shadow-lg border border-border h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14305.240331609677!2d-80.13057563545063!3d26.316456932118975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d91df85192d2e3%3A0x33f6970e8c4c641f!2sPoint Polish Cleaners!5e0!3m2!1sen!2sus!4v1766738784534!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Point Polish Cleaners Service Area - Jacksonville, FL"
            />
          </div>

          {/* Contact Information */}
          <div className="bg-card p-8 rounded-xl shadow-soft border border-border">
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">
              Contact Point Polish Cleaners
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground">
                  <strong>Phone:</strong>{" "}
                  <a 
                    href="tel:+19045139002" 
                    className="text-primary hover:underline"
                    aria-label="Call Point Polish Cleaners at 904-513-9002"
                  >
                    (904) 513-9002
                  </a>
                </p>
              </div>
              
              <div>
                <p className="text-muted-foreground">
                  <strong>Email:</strong>{" "}
                  <a 
                    href="mailto:support@pointpolishcleaners.com" 
                    className="text-primary hover:underline"
                  >
                    support@pointpolishcleaners.com
                  </a>
                </p>
              </div>
              
              <div>
                <p className="text-muted-foreground">
                  <strong>Hours:</strong> Mon-Fri 7AM-7PM, Sat 8AM-5PM
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">
                  <strong>Address:</strong> 65 SW 12th Ave, Riverside, FL 33442
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                <strong>Service Areas:</strong>
              </p>
              <div className="flex flex-wrap gap-2">
                <a href="/broward-county-cleaning" className="text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 transition-colors">Duval County</a>
                <a href="/miami-dade-cleaning" className="text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 transition-colors">Duval County</a>
                <a href="/palm-beach-county-cleaning" className="text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 transition-colors">St. Johns County</a>
                <a href="/fort-lauderdale-cleaning" className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded hover:bg-primary/10 hover:text-primary transition-colors">Jacksonville</a>
                <a href="/miami-cleaning" className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded hover:bg-primary/10 hover:text-primary transition-colors">Miami</a>
                <a href="/west-palm-beach-cleaning" className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded hover:bg-primary/10 hover:text-primary transition-colors">Ponte Vedra</a>
                <a href="/boca-raton-cleaning" className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded hover:bg-primary/10 hover:text-primary transition-colors">Jacksonville Beach</a>
                <a href="/coral-springs-cleaning" className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded hover:bg-primary/10 hover:text-primary transition-colors">Mandarin</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleMapEmbed;
