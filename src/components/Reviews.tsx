export default function Reviews() {
  const reviews = [
    {
      name: "Sarah M.",
      rating: 5,
      text: "Absolutely stunning quality! The craftsmanship is endless and the beauty never fades.",
      verified: true
    },
    {
      name: "Michael R.",
      rating: 5,
      text: "The possibilities with these gems seem endless. Each piece tells its own story.",
      verified: true
    },
    {
      name: "Emma K.",
      rating: 5,
      text: "I could stare at these gemstones endlessly. The colors and patterns are mesmerizing.",
      verified: true
    },
    {
      name: "David L.",
      rating: 5,
      text: "The collection here is endless - so many unique pieces to choose from!",
      verified: true
    },
    {
      name: "Jessica T.",
      rating: 5,
      text: "My love for these gems is endless. Perfect quality and authentic sourcing.",
      verified: true
    },
    {
      name: "Ryan C.",
      rating: 5,
      text: "The beauty of these stones is endless. Highly recommend Gemsutopia!",
      verified: true
    }
  ];

  return (
    <section className="bg-neutral-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Customer Reviews</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            See what our customers are saying about our authentic gemstone collection
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">{review.name[0]}</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-black">{review.name}</h3>
                  <div className="flex items-center">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                    {review.verified && (
                      <span className="ml-2 text-xs text-green-600 font-medium">✓ Verified</span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-neutral-700 leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}