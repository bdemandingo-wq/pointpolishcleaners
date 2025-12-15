const GoogleMapEmbed = () => {
  return (
    <section className="py-12 bg-muted" aria-label="Location and Contact Information">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Serving Broward, Miami-Dade & Palm Beach County
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional cleaning services throughout South Florida. 
            <a 
              href="https://www.broward.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline ml-1"
            >
              Broward County
            </a>, 
            <a 
              href="https://www.miamidade.gov" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline ml-1"
            >
              Miami-Dade County
            </a>, and 
            <a 
              href="https://www.pbcgov.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline ml-1"
            >
              Palm Beach County
            </a>.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Information */}
          <div className="bg-card p-8 rounded-xl shadow-soft border border-border text-center">
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">
              Contact TIDYWISE
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground">
                  <strong>Phone:</strong>{" "}
                  <a 
                    href="tel:+15615718725" 
                    className="text-primary hover:underline"
                    aria-label="Call TIDYWISE at 561-571-8725"
                  >
                    (561) 571-8725
                  </a>
                </p>
              </div>
              
              <div>
                <p className="text-muted-foreground">
                  <strong>Email:</strong>{" "}
                  <a 
                    href="mailto:support@tidywisecleaning.com" 
                    className="text-primary hover:underline"
                  >
                    support@tidywisecleaning.com
                  </a>
                </p>
              </div>
              
              <div>
                <p className="text-muted-foreground">
                  <strong>Hours:</strong> Mon-Fri 7AM-7PM, Sat 8AM-5PM
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Service Areas:</strong> Broward County, Miami-Dade County, Palm Beach County, 
                Fort Lauderdale, Miami, West Palm Beach, Boca Raton, Coral Springs, Hollywood, 
                Pompano Beach, Deerfield Beach, and surrounding areas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleMapEmbed;
