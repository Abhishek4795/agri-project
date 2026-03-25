import React, { useEffect, useState } from 'react';

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! We'll get back to you shortly.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#f8fcf8] pb-24">
      <div className="relative bg-[#263a28] pt-40 pb-24 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('/farm.avif')" }}></div>
        <div className="absolute inset-0 bg-[#263a28] mix-blend-multiply"></div>
        <div className="relative max-w-5xl mx-auto text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Contact <span className="text-[#f7c35f]">Us</span></h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Have questions about our tools, organic products, or partnership opportunities? We are here to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-[#263a28] mb-8">Get In Touch</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl mr-6 flex-shrink-0">📍</div>
                <div>
                  <h3 className="text-lg font-bold text-[#263a28]">Office Address</h3>
                  <p className="text-gray-600 mt-2">123 Green Valley, AgriTech Park<br />New Delhi, India 110001</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl mr-6 flex-shrink-0">📞</div>
                <div>
                  <h3 className="text-lg font-bold text-[#263a28]">Phone Support</h3>
                  <p className="text-gray-600 mt-2">+91 98765 43210<br />Mon-Fri, 9am - 6pm IST</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl mr-6 flex-shrink-0">✉️</div>
                <div>
                  <h3 className="text-lg font-bold text-[#263a28]">Email Us</h3>
                  <p className="text-gray-600 mt-2">info@agrisynceco.com<br />support@agrisynceco.com</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 w-full h-64 bg-gray-200 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-cover bg-center opacity-50 blur-sm flex justify-center items-center" style={{ backgroundImage: "url('/farm.avif')" }}>
                <span className="bg-white/90 px-4 py-2 rounded font-bold text-[#263a28] shadow z-10">Map View Offline</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-green-50">
            <h2 className="text-2xl font-bold text-[#263a28] mb-8">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" required
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" required
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                <input 
                  type="text" required
                  value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea 
                  required rows="5"
                  value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none"
                  placeholder="Tell us about your farm or inquiry..."
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-[#f7c35f] hover:bg-yellow-500 text-gray-900 font-bold text-lg py-4 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
