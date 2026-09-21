'use client';

import { useState, useEffect } from 'react';
import Badge from '@/components/ui/Badge';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    role: 'Regular Customer',
    location: 'Lahore',
    avatar: '👨‍💼',
    rating: 5,
    text: 'Four Partners Mart has made grocery shopping so convenient! Fresh products delivered quickly, and their monthly packages save me both time and money.',
    highlight: 'monthly packages save me both time and money',
    category: 'Monthly Package User'
  },
  {
    id: 2,
    name: 'Fatima Khan',
    role: 'Working Mother',
    location: 'Karachi',
    avatar: '👩‍💼',
    rating: 5,
    text: 'As a working mother, I love how I can order groceries via WhatsApp. The delivery is always on time and the quality is excellent.',
    highlight: 'order groceries via WhatsApp',
    category: 'WhatsApp User'
  },
  {
    id: 3,
    name: 'Mohammad Ali',
    role: 'Family Man',
    location: 'Islamabad',
    avatar: '👨‍👩‍👧‍👦',
    rating: 5,
    text: 'The family package is perfect for our household. Quality products at great prices, and the customer service is outstanding.',
    highlight: 'Quality products at great prices',
    category: 'Family Package'
  },
  {
    id: 4,
    name: 'Aisha Malik',
    role: 'Home Baker',
    location: 'Rawalpindi',
    avatar: '👩‍🍳',
    rating: 5,
    text: 'Their fresh produce section is amazing! I get all my baking ingredients delivered fresh. The variety and quality are unmatched.',
    highlight: 'fresh produce section is amazing',
    category: 'Fresh Produce'
  },
  {
    id: 5,
    name: 'Usman Sheikh',
    role: 'Student',
    location: 'Lahore',
    avatar: '👨‍🎓',
    rating: 5,
    text: 'Perfect for students like me. Quick delivery, affordable prices, and I can order exactly what I need without any minimum order.',
    highlight: 'affordable prices',
    category: 'Student'
  },
  {
    id: 6,
    name: 'Rabia Nawaz',
    role: 'Housewife',
    location: 'Faisalabad',
    avatar: '👩‍🏠',
    rating: 5,
    text: 'I trust Four Partners Mart completely. Always fresh products, reliable delivery, and excellent customer support via WhatsApp.',
    highlight: 'Always fresh products, reliable delivery',
    category: 'Loyal Customer'
  }
];

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleTestimonialClick = (index) => {
    setActiveTestimonial(index);
    setIsAutoPlaying(false);
    
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span 
        key={index} 
        className={`star ${index < rating ? 'star--filled' : 'star--empty'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <Badge variant="success" className="section-badge">
            <span>💝</span>
            Customer Reviews
          </Badge>
          
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-description">
            Join thousands of satisfied customers who trust Four Partners Mart for their grocery needs
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="testimonial-showcase">
          <div className="testimonial-main">
            <div className="testimonial-content">
              <div className="testimonial-quote">
                <span className="quote-mark">"</span>
                <p className="testimonial-text">
                  {TESTIMONIALS[activeTestimonial].text}
                </p>
                <span className="quote-mark quote-mark--end">"</span>
              </div>
              
              <div className="testimonial-rating">
                {renderStars(TESTIMONIALS[activeTestimonial].rating)}
              </div>
              
              <div className="testimonial-author">
                <div className="author-info">
                  <div className="author-name">
                    {TESTIMONIALS[activeTestimonial].name}
                  </div>
                  <div className="author-details">
                    {TESTIMONIALS[activeTestimonial].role} • {TESTIMONIALS[activeTestimonial].location}
                  </div>
                  <Badge variant="primary-light" size="xs" className="author-badge">
                    {TESTIMONIALS[activeTestimonial].category}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Navigation */}
          <div className="testimonial-nav">
            {TESTIMONIALS.map((testimonial, index) => (
              <button
                key={testimonial.id}
                className={`nav-item ${index === activeTestimonial ? 'nav-item--active' : ''}`}
                onClick={() => handleTestimonialClick(index)}
              >
                <div className="nav-info">
                  <div className="nav-name">{testimonial.name}</div>
                  <div className="nav-rating">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="testimonial-stats">
          <div className="stat-item">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Happy Customers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4.9/5</div>
            <div className="stat-label">Average Rating</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">95%</div>
            <div className="stat-label">Repeat Customers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24hrs</div>
            <div className="stat-label">Response Time</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonials-section {
          background: var(--bg-color);
          position: relative;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .section-title {
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 1rem;
        }

        .section-description {
          font-size: var(--text-lg);
          color: var(--text-muted);
          max-width: 600px;
          margin: 0 auto;
        }

        .testimonial-showcase {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .testimonial-main {
          background: var(--surface);
          border-radius: var(--radius-xl);
          padding: 3rem;
          border: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }

        .testimonial-main::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, var(--primary-light) 0%, transparent 70%);
          opacity: 0.3;
          z-index: 1;
        }

        .testimonial-content {
          position: relative;
          z-index: 2;
        }

        .testimonial-quote {
          position: relative;
          margin-bottom: 2rem;
        }

        .quote-mark {
          font-size: 4rem;
          color: var(--primary);
          font-family: Georgia, serif;
          line-height: 1;
        }

        .quote-mark--end {
          float: right;
          transform: rotate(180deg);
          margin-top: 1rem;
        }

        .testimonial-text {
          font-size: var(--text-xl);
          line-height: 1.6;
          color: var(--text-main);
          margin: 1rem 0;
          font-style: italic;
        }

        .testimonial-rating {
          display: flex;
          gap: 0.25rem;
          margin-bottom: 2rem;
        }

        .star {
          font-size: var(--text-lg);
          color: var(--warning);
        }

        .star--empty {
          color: var(--border);
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .author-avatar {
          width: 4rem;
          height: 4rem;
          background: var(--primary-light);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          border: 3px solid var(--surface);
          box-shadow: var(--shadow-md);
        }

        .author-name {
          font-size: var(--text-lg);
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 0.25rem;
        }

        .author-details {
          font-size: var(--text-sm);
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }

        .testimonial-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          background: var(--surface);
          border-radius: var(--radius-xl);
          padding: 1rem;
          border: 1px solid var(--border);
          height: fit-content;
          max-height: 500px;
          overflow-y: auto;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: none;
          border: none;
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all var(--transition-base);
          text-align: left;
        }

        .nav-item:hover {
          background: var(--bg-color);
        }

        .nav-item--active {
          background: var(--primary-light);
          border: 1px solid var(--primary);
        }

        .nav-avatar {
          width: 2.5rem;
          height: 2.5rem;
          background: var(--bg-color);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .nav-name {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 0.125rem;
        }

        .nav-rating {
          display: flex;
          gap: 0.125rem;
        }

        .nav-rating .star {
          font-size: var(--text-xs);
        }

        .testimonial-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          padding: 2rem;
          background: var(--surface);
          border-radius: var(--radius-xl);
          border: 1px solid var(--border);
        }

        .stat-item {
          text-align: center;
          padding: 1rem;
        }

        .stat-number {
          font-size: var(--text-3xl);
          font-weight: 800;
          color: var(--primary);
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: var(--text-sm);
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .testimonial-showcase {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .testimonial-main {
            padding: 2rem;
          }

          .testimonial-text {
            font-size: var(--text-lg);
          }

          .testimonial-nav {
            max-height: 300px;
          }

          .testimonial-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .section-title {
            font-size: var(--text-3xl);
          }
        }

        @media (max-width: 480px) {
          .testimonial-stats {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .testimonial-main {
            padding: 1.5rem;
          }

          .quote-mark {
            font-size: 3rem;
          }
        }
      `}</style>
    </section>
  );
}
