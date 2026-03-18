import React, { useState } from 'react';
import { FaStar, FaQuoteLeft, FaUser, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import '../styles/Testimonials.css';

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Austin, TX",
    rating: 5,
    title: "Game Changer for Energy Savings!",
    text: "Since installing this system, my electricity bill has dropped by 40%! The real-time monitoring helps me identify which devices are consuming the most power. Highly recommended!",
    avatar: null,
    date: "March 2026"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "San Francisco, CA",
    rating: 5,
    title: "Incredible Automation Features",
    text: "The ability to control all my smart devices from one dashboard is amazing. I can schedule when my AC turns on/off, monitor my refrigerator's efficiency, and even get alerts when something's wrong.",
    avatar: null,
    date: "February 2026"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Miami, FL",
    rating: 5,
    title: "Perfect for Our Family Home",
    text: "With 4 kids, our energy usage was always high. This system helped us identify energy hogs and optimize our usage. We're saving over $100 monthly now!",
    avatar: null,
    date: "January 2026"
  },
  {
    id: 4,
    name: "David Kim",
    location: "Seattle, WA",
    rating: 4,
    title: "Excellent Customer Support",
    text: "Had a few questions during setup, but their support team was incredibly helpful. The system works flawlessly now and the insights are valuable.",
    avatar: null,
    date: "December 2025"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    location: "Denver, CO",
    rating: 5,
    title: "Worth Every Penny",
    text: "The initial investment paid for itself within 6 months. Love the detailed analytics and the ability to control everything remotely.",
    avatar: null,
    date: "November 2025"
  },
  {
    id: 6,
    name: "James Wilson",
    location: "Boston, MA",
    rating: 5,
    title: "Finally, a System That Works",
    text: "Tried other smart home systems before, but none were as comprehensive. This one integrates with all my devices seamlessly.",
    avatar: null,
    date: "October 2025"
  },
  {
    id: 7,
    name: "Priya Patel",
    location: "Chicago, IL",
    rating: 5,
    title: "Environmental Impact Matters",
    text: "Not only am I saving money, but I'm also reducing my carbon footprint. The system shows me exactly how much energy I'm saving.",
    avatar: null,
    date: "September 2025"
  },
  {
    id: 8,
    name: "Robert Martinez",
    location: "Phoenix, AZ",
    rating: 4,
    title: "Great for Hot Climates",
    text: "Living in Arizona, AC is our biggest expense. This system optimized our cooling schedule and saved us a ton during summer months.",
    avatar: null,
    date: "August 2025"
  },
  {
    id: 9,
    name: "Amanda Foster",
    location: "Portland, OR",
    rating: 5,
    title: "User-Friendly Interface",
    text: "The dashboard is so intuitive! I'm not very tech-savvy, but I had no trouble setting up and using all the features.",
    avatar: null,
    date: "July 2025"
  }
];

function Testimonials() {
  const [filterRating, setFilterRating] = useState(0);
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter testimonials by rating
  const filteredTestimonials = filterRating === 0 
    ? testimonials 
    : testimonials.filter(t => t.rating === filterRating);

  // Show only visible count
  const visibleTestimonials = filteredTestimonials.slice(0, visibleCount);

  // Average rating
  const avgRating = (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1);

  // Rating counts
  const ratingCounts = {
    5: testimonials.filter(t => t.rating === 5).length,
    4: testimonials.filter(t => t.rating === 4).length,
    3: testimonials.filter(t => t.rating === 3).length,
    2: testimonials.filter(t => t.rating === 2).length,
    1: testimonials.filter(t => t.rating === 1).length
  };

  return (
    <div className="testimonials-page">
      {/* Hero Section */}
      <div className="testimonials-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>What Our Users Say</h1>
          <p>Real stories from real customers who transformed their homes</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="testimonials-stats">
        <div className="glass-card stat-card">
          <h3>{testimonials.length}+</h3>
          <p>Happy Customers</p>
        </div>
        <div className="glass-card stat-card">
          <h3>{avgRating}</h3>
          <p>Average Rating</p>
          <div className="stars">
            {[1,2,3,4,5].map(star => (
              <FaStar key={star} color={star <= Math.round(avgRating) ? '#FFD700' : '#4a5568'} />
            ))}
          </div>
        </div>
        <div className="glass-card stat-card">
          <h3>40%</h3>
          <p>Average Savings</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <h3>Filter by Rating</h3>
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filterRating === 0 ? 'active' : ''}`}
            onClick={() => setFilterRating(0)}
          >
            All
          </button>
          {[5,4,3,2,1].map(rating => (
            <button
              key={rating}
              className={`filter-btn ${filterRating === rating ? 'active' : ''}`}
              onClick={() => setFilterRating(rating)}
            >
              {rating} <FaStar /> ({ratingCounts[rating]})
            </button>
          ))}
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="testimonials-grid">
        {visibleTestimonials.map(testimonial => (
          <div key={testimonial.id} className="glass-card testimonial-card">
            <div className="testimonial-header">
              <div className="avatar">
                {testimonial.avatar ? (
                  <img src={testimonial.avatar} alt={testimonial.name} />
                ) : (
                  <FaUser />
                )}
              </div>
              <div className="user-info">
                <h4>{testimonial.name}</h4>
                <p className="location">{testimonial.location}</p>
              </div>
            </div>

            <div className="rating">
              {[1,2,3,4,5].map(star => (
                <FaStar key={star} color={star <= testimonial.rating ? '#FFD700' : '#4a5568'} />
              ))}
              <span className="date">{testimonial.date}</span>
            </div>

            <FaQuoteLeft className="quote-icon" />
            <h5 className="testimonial-title">{testimonial.title}</h5>
            <p className="testimonial-text">{testimonial.text}</p>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredTestimonials.length && (
        <div className="load-more">
          <button 
            className="load-more-btn"
            onClick={() => setVisibleCount(prev => prev + 3)}
          >
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
}

export default Testimonials;