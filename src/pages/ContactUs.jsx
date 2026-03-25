import React, { useEffect, useState } from 'react';

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! Our enterprise team will contact you shortly.");
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0a110d] font-sans">
      
      {/* Left Dark Info Panel */}
      <div className="w-full lg:w-5/12 bg-[#0a110d] text-white pt-32 pb-16 px-8 lg:px-16 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-5 filter sepia hue-rotate-180" style={{ backgroundImage: "url('/farm.avif')" }}></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
        
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 border border-green-500/30 rounded-full text-green-400 text-xs font-bold tracking-widest uppercase mb-8">
            Contact Us
          </div>
          <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-none tracking-tighter">
            Let's build <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">together.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-sm mb-16">
            Whether you manage 5 acres or 50,000, our AI tools scale to meet your exact agronomic needs. Reach out to start the conversation.
          </p>
          
          <div className="space-y-10">
            <div>
              <h4 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-2">Global Headquarters</h4>
              <p className="text-xl font-medium">123 Green Valley, AgriTech Park<br/>New Delhi, IN 110001</p>
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-2">Direct Inquiries</h4>
              <p className="text-xl font-medium text-green-400">enterprise@agrisynceco.com</p>
              <p className="text-xl font-medium">+91 98765 43210</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-16 flex space-x-6">
          <a href="#" className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-green-500 hover:bg-green-500/10 transition-all">
            <span className="sr-only">Twitter</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
          </a>
          <a href="#" className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-green-500 hover:bg-green-500/10 transition-all">
            <span className="sr-only">LinkedIn</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
          </a>
        </div>
      </div>

      {/* Right White Form Panel */}
      <div className="w-full lg:w-7/12 bg-white pt-20 lg:pt-32 pb-16 px-8 lg:px-24 rounded-tl-[40px] lg:rounded-l-[60px] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col justify-center">
        
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-10 group">
          <div className="flex gap-8">
            <div className="relative w-full">
              <input 
                type="text" id="name" required
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                className="block py-4 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer transition-colors"
                placeholder=" "
              />
              <label htmlFor="name" className="absolute text-gray-500 text-lg duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Full Name</label>
            </div>
          </div>
          
          <div className="flex gap-8">
            <div className="relative w-full">
              <input 
                type="email" id="email" required
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                className="block py-4 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer transition-colors"
                placeholder=" "
              />
              <label htmlFor="email" className="absolute text-gray-500 text-lg duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Work Email</label>
            </div>
            
            <div className="relative w-full">
              <input 
                type="text" id="company"
                value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
                className="block py-4 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer transition-colors"
                placeholder=" "
              />
              <label htmlFor="company" className="absolute text-gray-500 text-lg duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Farm / Company</label>
            </div>
          </div>

          <div className="relative w-full mt-12">
            <textarea 
              id="message" required rows="4"
              value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
              className="block py-4 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer transition-colors resize-none"
              placeholder=" "
            ></textarea>
            <label htmlFor="message" className="absolute text-gray-500 text-lg duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Project Details</label>
          </div>

          <button type="submit" className="mt-12 w-full lg:w-auto bg-[#1b2b1d] hover:bg-green-700 text-white font-bold py-5 px-12 rounded-full flex items-center justify-center space-x-3 transition-colors duration-300 text-lg">
            <span>Send Message</span>
            <span className="text-xl">&rarr;</span>
          </button>
        </form>
      </div>
      
    </div>
  );
};

export default ContactUs;
