import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import Reviews from '@/components/Reviews';
import ScrollToTop from '@/components/ScrollToTop';

export default function Home() {
  return (
    <div className="min-h-[200vh] flex flex-col">
      <Header />
      <Hero />
      <About />
      <Products />
      <Reviews />
      <FAQ />
      <div className="flex-grow max-h-20"></div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
