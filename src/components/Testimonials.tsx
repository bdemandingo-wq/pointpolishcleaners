import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Robert T.",
    location: "Boca Raton",
    rating: 5,
    text: "Used their move-out cleaning service and got my full deposit back. They cleaned areas I didn't even think about. Highly recommend!",
  },
  {
    name: "Sandra L.",
    location: "Miami Beach",
    rating: 5,
    text: "As a busy mom of 3, TIDYWISE is a lifesaver. The bi-weekly service keeps our home spotless and gives me back my weekends.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        {/* Rating summary */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-secondary text-secondary" />
            ))}
          </div>
          <span className="text-lg font-semibold text-foreground">5.0</span>
          <span className="text-muted-foreground">from 100+ reviews</span>
        </div>
        
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
          What Our Clients Say
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Join hundreds of happy South Florida homeowners who trust TIDYWISE.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center mt-10">
          <a 
            href="#booking" 
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            Join our happy customers - Get your quote now
            <span className="text-lg">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
