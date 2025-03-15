import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, Github, Linkedin,Instagram, MapPin, Mail } from 'lucide-react';


export const apiUrl = import.meta.env.VITE_BACKEND_URL;
const ContactPage = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [animationState, setAnimationState] = useState({
    header: false,
    contactCards: false,
    form: false
  });

  useEffect(() => {
    setTimeout(() => setAnimationState(prev => ({ ...prev, header: true })), 100);
    setTimeout(() => setAnimationState(prev => ({ ...prev, contactCards: true })), 400);
    setTimeout(() => setAnimationState(prev => ({ ...prev, form: true })), 700);
    document.body.style.overflow = "hidden";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setFormStatus('success');
        setAlertMessage('Message sent successfully!');
        setFormData({ name: "", email: "", subject: "", message: "" });  // Reset form
      } else {
        setFormStatus('error');
        setAlertMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error("Error:", error);
      setFormStatus('error');
      setAlertMessage('Something went wrong.');
    }

    setTimeout(() => {
      setFormStatus(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-4xl mx-auto ">
        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-2 space-y-8">
            <div 
              className={`transform transition-all duration-700 ${
                animationState.header ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-0'
              }`}
            >
              <h1 className="text-4xl font-bold mb-2 ">Get in Touch</h1>
              <div className="h-1 w-20 bg-blue-500 rounded mb-6"></div>
              <p className="text-gray-300 mb-8 text-xl">I'm always open to new opportunities and collaborations. Feel free to reach out anytime.&#128512;
              </p>
            </div>

            <div className="space-y-6">
              <div 
                className={`transform transition-all duration-500 hover:-translate-y-1 hover:shadow-lg p-4 bg-gray-800 bg-opacity-50 rounded-lg ${
                  animationState.contactCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Mail size={20} className="mr-2 text-white-500" />
                  Email
                </h3>
                <p className="text-blue-400">navrajpersonal27@gmail.com</p>
              </div>

              <div 
                className={`transform transition-all duration-500 hover:-translate-y-1 hover:shadow-lg p-4 bg-gray-800 bg-opacity-50 rounded-lg ${
                  animationState.contactCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <MapPin size={20} className="mr-2 text-white-500" />
                  Location
                </h3>
                <p className="text-gray-300">Telangana, India</p>
              </div>

              <div 
                className={`transform transition-all duration-500 hover:-translate-y-1 hover:shadow-lg p-4 bg-gray-800 bg-opacity-50 rounded-lg ${
                  animationState.contactCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: '500ms' }}
              >
                <h3 className="text-xl font-semibold mb-2">Follow Me</h3>
                <div className="flex space-x-4 mt-2">
                  <a href="https://github.com/RedPanda-08/" target="_blank" rel="noopener noreferrer" className="text-white-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110">
                    <Github size={32} className="bg-transparent rounded-full" />
                  </a>
                  <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="text-white-600 hover:text-blue-400 transition-all duration-300 transform hover:scale-110">
                    <Linkedin size={32} className="bg-transparent " />
                  </a>
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-white-600 hover:text-blue-400 transition-all duration-300 transform hover:scale-110">
                    <Instagram size={32} className="bg-transparent" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div 
            className={`md:col-span-3 mt-5 bg-gray-800 bg-opacity-50 rounded-lg p-6 shadow-lg transform transition-all duration-700 hover:shadow-xl ${
              animationState.form ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-16 opacity-0 scale-95'
            }`}
          >
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            
            {/*Form Status*/}
            {formStatus && formStatus !== 'sending' && (
              <div className={`mb-4 p-3 rounded-md text-white flex items-center ${formStatus === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                {formStatus === 'success' ? <CheckCircle size={20} className="mr-2" /> : <AlertCircle size={20} className="mr-2" />}
                {alertMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor='name' className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500" required />
                </div>

                <div>
                  <label htmlFor='email' className="block text-sm font-medium text-gray-300 mb-1">Your Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>

              <div>
                <label htmlFor='subject' className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500" required />
              </div>

              <div>
                <label htmlFor='message' className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="5" className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500" required></textarea>
              </div>

              <button type="submit" disabled={formStatus === 'sending'} className={`w-full flex items-center justify-center px-6 py-3 rounded-md text-white font-medium ${formStatus === 'sending' ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {formStatus === 'sending' ? 'Sending...' : <><Send size={18} className="mr-2" /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;