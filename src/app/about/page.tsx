import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow bg-neutral-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">About Us</h1>
            <p className="text-lg text-neutral-600">Discover the story behind Gemsutopia</p>
          </div>
          
          <div className="prose prose-lg max-w-none text-neutral-700">
            <p className="text-xl leading-relaxed mb-8">
              Welcome to Gemsutopia, where the beauty of nature meets the artistry of fine craftsmanship.
            </p>
            
            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Our Story</h2>
            <p className="mb-6">
              Founded with a passion for authentic gemstones and exquisite jewelry, Gemsutopia has been curating the finest collection of precious stones and handcrafted pieces. Our journey began with a simple mission: to bring the world&apos;s most beautiful gems directly to you.
            </p>
            
            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Our Mission</h2>
            <p className="mb-6">
              We believe that every gemstone tells a story, and every piece of jewelry should be as unique as the person who wears it. Our commitment to quality, authenticity, and exceptional craftsmanship drives everything we do.
            </p>
            
            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Quality Promise</h2>
            <p className="mb-6">
              Each gemstone in our collection is carefully sourced and authenticated. We work with trusted suppliers around the world to ensure that every piece meets our rigorous standards for quality, beauty, and ethical sourcing.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}