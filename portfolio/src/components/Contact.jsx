import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, Github, Linkedin, Instagram, MapPin, Mail } from 'lucide-react';

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
    setTimeout(() => setAnimationState(prev => ({ ...prev, contactCards: true })), 300);
    setTimeout(() => setAnimationState(prev => ({ ...prev, form: true })), 500);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (formStatus === 'sending') return;
  
  // Validation
  if (!formData.name || !formData.email || !formData.subject || !formData.message) {
    setFormStatus('error');
    setAlertMessage('Please fill in all required fields.');
    setTimeout(() => setFormStatus(null), 3000);
    return;
  }

  setFormStatus('sending');

  try {
    const response = await fetch('https://portfolio-backend-1-eogw.onrender.com/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      setFormStatus('success');
      setAlertMessage('Message sent successfully!');
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setFormStatus('error');
      setAlertMessage(data.message || 'Failed to send message');
    }
  } catch (error) {
    console.error("Error:", error);
    setFormStatus('error');
    setAlertMessage('Network error. Please try again.');
  }

  setTimeout(() => {
    setFormStatus(null);
    setAlertMessage('');
  }, 5000);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Main Container with centered content */}
      <div className="w-full min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          {/* Mobile: Stack vertically, Desktop: Side by side */}
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Contact Info Section */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              {/* Header Section */}
              <div 
                className={`transition-all duration-500 ease-out ${
                  animationState.header ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                }`}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 mt-5">
                  Get in Touch
                </h1>
                <div className="h-1 w-20 bg-blue-500 rounded mb-6"></div>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  I'm always open to new opportunities and collaborations. Feel free to reach out anytime.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4 md:space-y-6">
                {/* Email Card */}
                <div 
                  className={`transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg p-5 bg-gray-800 bg-opacity-50 rounded-lg backdrop-blur-sm ${
                    animationState.contactCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: '100ms' }}
                >
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Mail size={20} className="mr-3 text-blue-400 flex-shrink-0" />
                    Email
                  </h3>
                  <a 
                    href="mailto:navrajpersonal27@gmail.com" 
                    className="text-blue-400 hover:text-blue-300 text-sm sm:text-base break-all"
                  >
                    navrajpersonal27@gmail.com
                  </a>
                </div>

                {/* Location Card */}
                <div 
                  className={`transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg p-5 bg-gray-800 bg-opacity-50 rounded-lg backdrop-blur-sm ${
                    animationState.contactCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: '200ms' }}
                >
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <MapPin size={20} className="mr-3 text-blue-400 flex-shrink-0" />
                    Location
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base">Telangana, India</p>
                </div>

                {/* Social Media Card */}
                <div 
                  className={`transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg p-5 bg-gray-800 bg-opacity-50 rounded-lg backdrop-blur-sm ${
                    animationState.contactCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: '300ms' }}
                >
                  <h3 className="text-lg font-semibold mb-3">Follow Me</h3>
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com/RedPanda-08/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 p-2"
                      aria-label="GitHub Profile"
                    >
                      <Github size={24} />
                    </a>
                    <a 
                      href="https://linkedin.com/in/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 p-2"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin size={24} />
                    </a>
                    <a 
                      href="https://www.instagram.com/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 p-2"
                      aria-label="Instagram Profile"
                    >
                      <Instagram size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div 
              className={`lg:col-span-3 bg-gray-800 bg-opacity-50 rounded-lg p-6 sm:p-8 shadow-lg backdrop-blur-sm transition-all duration-500 ease-out hover:shadow-xl ${
                animationState.form ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Send a Message</h2>
              
              {/* Form Status Alert */}
              {formStatus && formStatus !== 'sending' && (
                <div className={`mb-6 p-4 rounded-md text-white flex items-start text-sm sm:text-base ${
                  formStatus === 'success' ? 'bg-green-600' : 'bg-red-600'
                }`}>
                  <div className="flex-shrink-0 mr-3">
                    {formStatus === 'success' ? 
                      <CheckCircle size={18} /> : 
                      <AlertCircle size={18} />
                    }
                  </div>
                  <div>{alertMessage}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label 
                      htmlFor='name' 
                      className="block text-sm sm:text-base font-medium text-gray-300 mb-2"
                    >
                      Your Name 
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 text-sm sm:text-base rounded bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                      required 
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor='email' 
                      className="block text-sm sm:text-base font-medium text-gray-300 mb-2"
                    >
                      Your Email 
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 text-sm sm:text-base rounded bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                      required 
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label 
                    htmlFor='subject' 
                    className="block text-sm sm:text-base font-medium text-gray-300 mb-2"
                  >
                    Subject 
                  </label>
                  <input 
                    type="text" 
                    id="subject"
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 text-sm sm:text-base rounded bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                    required 
                    placeholder="What's this about?"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label 
                    htmlFor='message' 
                    className="block text-sm sm:text-base font-medium text-gray-300 mb-2"
                  >
                    Message 
                  </label>
                  <textarea 
                    id="message"
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    rows="5" 
                    className="w-full px-4 py-3 text-sm sm:text-base rounded bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none min-h-[120px]" 
                    required
                    placeholder="Tell me about your project or just say hello!"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={formStatus === 'sending'} 
                  className={`w-full flex items-center justify-center px-6 py-3 rounded-md text-white font-medium text-sm sm:text-base transition-all duration-300 ${
                    formStatus === 'sending' 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow hover:shadow-md'
                  }`}
                >
                  {formStatus === 'sending' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;