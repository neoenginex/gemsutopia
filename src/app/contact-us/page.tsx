import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { IconMail, IconPhone, IconMapPin } from '@tabler/icons-react';

export default function ContactUs() {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow bg-neutral-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">Contact Us</h1>
            <p className="text-lg text-neutral-600">Get in touch with our team</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-black mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <IconMail className="h-6 w-6 text-black mt-1" />
                  <div>
                    <h3 className="font-semibold text-black">Email</h3>
                    <p className="text-neutral-600">support@gemsutopia.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <IconPhone className="h-6 w-6 text-black mt-1" />
                  <div>
                    <h3 className="font-semibold text-black">Phone</h3>
                    <p className="text-neutral-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <IconMapPin className="h-6 w-6 text-black mt-1" />
                  <div>
                    <h3 className="font-semibold text-black">Address</h3>
                    <p className="text-neutral-600">
                      123 Gemstone Avenue<br />
                      Jewelry District<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-black mb-6">Send a Message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-black mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Your message"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-neutral-800 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}