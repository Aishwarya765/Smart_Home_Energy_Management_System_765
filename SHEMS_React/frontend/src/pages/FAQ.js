import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa';
import '../styles/FAQ.css';

const faqs = [
  {
    id: 1,
    category: "General",
    question: "What is Smart Home Energy Management System?",
    answer: "Smart Home Energy Management System is a centralized platform that allows you to monitor, control, and optimize your home's energy consumption. It connects to your smart devices, provides real-time analytics, and helps you save on electricity bills while reducing your carbon footprint."
  },
  {
    id: 2,
    category: "General",
    question: "How does the system help me save energy?",
    answer: "The system tracks energy usage of all connected devices, identifies energy-hungry appliances, provides personalized recommendations, allows scheduling of devices, and sends alerts when unusual consumption patterns are detected. Users typically save 20-40% on their electricity bills."
  },
  {
    id: 3,
    category: "Installation",
    question: "Is professional installation required?",
    answer: "No, the system is designed for DIY installation. Simply download the app, create an account, and follow the step-by-step guide to connect your smart devices. The entire process takes about 15-20 minutes."
  },
  {
    id: 4,
    category: "Installation",
    question: "Which devices are compatible?",
    answer: "Our system works with most major smart home brands including Philips Hue, TP-Link, Google Nest, Amazon Alexa, Samsung SmartThings, and many more. We support lights, thermostats, plugs, switches, and appliances from over 50 manufacturers."
  },
  {
    id: 5,
    category: "Pricing",
    question: "How much does the system cost?",
    answer: "We offer flexible pricing: a free tier with basic monitoring, premium plan at $9.99/month for advanced analytics and automation, and a lifetime plan at $199 for unlimited access. All plans include 24/7 customer support."
  },
  {
    id: 6,
    category: "Pricing",
    question: "Is there a money-back guarantee?",
    answer: "Yes! We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied with the system, contact our support team for a full refund, no questions asked."
  },
  {
    id: 7,
    category: "Technical",
    question: "How secure is my data?",
    answer: "Security is our top priority. All data is encrypted using AES-256 encryption, and we use secure HTTPS connections. We never share your personal information with third parties, and you can delete your data anytime."
  },
  {
    id: 8,
    category: "Technical",
    question: "What happens if my internet goes down?",
    answer: "Your devices will continue to operate with their last settings. The system stores data locally and syncs automatically when internet connection is restored. Scheduled automations will still run as programmed."
  },
  {
    id: 9,
    category: "Technical",
    question: "Can I access the system remotely?",
    answer: "Absolutely! You can monitor and control your home from anywhere using our mobile app (iOS/Android) or web dashboard. All you need is an internet connection."
  },
  {
    id: 10,
    category: "Technical",
    question: "How do I get support if I have issues?",
    answer: "We offer multiple support channels: 24/7 live chat in the app, email support at support@energysmart.com, comprehensive documentation, video tutorials, and an active community forum. Premium users also get priority phone support."
  },
  {
    id: 11,
    category: "Billing",
    question: "Can I change my plan later?",
    answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time from your account settings. Changes are prorated and apply immediately."
  },
  {
    id: 12,
    category: "Billing",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Google Pay. Enterprise customers can also pay via invoice."
  }
];

function FAQ() {
  const [openItems, setOpenItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(faqs.map(faq => faq.category))];

  const toggleItem = (id) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFaqs = activeCategory === "All" 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <div className="faq-page">
      {/* Hero Section */}
      <div className="faq-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our system</p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ Grid */}
      <div className="faq-grid">
        {filteredFaqs.map(faq => (
          <div key={faq.id} className="glass-card faq-item">
            <button 
              className="faq-question"
              onClick={() => toggleItem(faq.id)}
            >
              <div className="question-content">
                <FaQuestionCircle className="question-icon" />
                <span>{faq.question}</span>
              </div>
              {openItems.includes(faq.id) ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            
            <div className={`faq-answer ${openItems.includes(faq.id) ? 'open' : ''}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Still Have Questions Section */}
      <div className="still-questions glass-card">
        <h3>Still Have Questions?</h3>
        <p>Can't find the answer you're looking for? Please reach out to our friendly team.</p>
        <div className="contact-options">
          <a href="/contact" className="contact-btn">Contact Us</a>
          <a href="mailto:support@energysmart.com" className="email-btn">Email Support</a>
        </div>
      </div>
    </div>
  );
}

export default FAQ;