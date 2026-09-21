'use client';

import { useState, useEffect } from 'react';
import { BUSINESS_CONFIG } from '@/lib/config';
import { useApp } from '@/context/AppContext';

export default function AnnouncementBar() {
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { isBusinessOpen, isDeliveryAvailable } = useApp();

  const announcements = [
    {
      id: 'free-delivery',
      text: `🚚 Free Delivery on orders above ₨${BUSINESS_CONFIG.delivery.freeThreshold}`,
      type: 'offer',
      priority: 1
    },
    {
      id: 'business-hours',
      text: `🕒 Store Hours: ${BUSINESS_CONFIG.hours.open} - ${BUSINESS_CONFIG.hours.close} | Delivery: ${BUSINESS_CONFIG.hours.delivery}`,
      type: 'info',
      priority: 2
    },
    {
      id: 'whatsapp-order',
      text: `📱 Quick Orders via WhatsApp: ${BUSINESS_CONFIG.phone}`,
      type: 'contact',
      priority: 3
    },
    {
      id: 'quality-promise',
      text: '✨ Premium Quality Groceries | Fresh Products Daily | Halal Certified',
      type: 'quality',
      priority: 4
    },
    {
      id: 'wholesale',
      text: '🏭 Wholesale Inquiries Welcome | Special Rates for Bulk Orders',
      type: 'wholesale',
      priority: 5
    }
  ];

  // Add dynamic announcements based on business status
  const dynamicAnnouncements = [...announcements];

  if (!isBusinessOpen()) {
    dynamicAnnouncements.unshift({
      id: 'closed-status',
      text: `🔴 We're currently closed. Store opens at ${BUSINESS_CONFIG.hours.open}`,
      type: 'status',
      priority: 0
    });
  }

  if (!isDeliveryAvailable() && isBusinessOpen()) {
    dynamicAnnouncements.unshift({
      id: 'delivery-status',
      text: '⏰ Delivery service will resume during delivery hours',
      type: 'delivery',
      priority: 0
    });
  }

  // Rotate announcements every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex(prev => 
        (prev + 1) % dynamicAnnouncements.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [dynamicAnnouncements.length]);

  const currentAnnouncement = dynamicAnnouncements[currentAnnouncementIndex];

  if (!isVisible) return null;

  return (
    <div className={`announcement-bar announcement-bar--${currentAnnouncement.type}`}>
      <div className="announcement-bar__container">
        <div className="announcement-bar__content">
          <div className="announcement-bar__text">
            {currentAnnouncement.text}
          </div>
          
          {/* Indicators */}
          {dynamicAnnouncements.length > 1 && (
            <div className="announcement-bar__indicators">
              {dynamicAnnouncements.map((_, index) => (
                <button
                  key={index}
                  className={`announcement-bar__indicator ${
                    index === currentAnnouncementIndex ? 'announcement-bar__indicator--active' : ''
                  }`}
                  onClick={() => setCurrentAnnouncementIndex(index)}
                  aria-label={`Show announcement ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Close Button */}
        <button 
          className="announcement-bar__close"
          onClick={() => setIsVisible(false)}
          aria-label="Close announcement"
        >
          ✕
        </button>
      </div>

      <style jsx>{`
        .announcement-bar {
          position: relative;
          padding: 0.75rem 0;
          font-size: var(--text-sm);
          font-weight: 500;
          text-align: center;
          transition: all var(--transition-base);
          z-index: var(--z-sticky);
        }

        .announcement-bar--offer {
          background: linear-gradient(135deg, var(--primary), var(--primary-hover));
          color: white;
        }

        .announcement-bar--info {
          background: linear-gradient(135deg, var(--info), #2563eb);
          color: white;
        }

        .announcement-bar--contact {
          background: linear-gradient(135deg, var(--secondary), var(--secondary-hover));
          color: white;
        }

        .announcement-bar--quality {
          background: linear-gradient(135deg, var(--success), #16a34a);
          color: white;
        }

        .announcement-bar--wholesale {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          color: white;
        }

        .announcement-bar--status {
          background: linear-gradient(135deg, var(--warning), #d97706);
          color: white;
        }

        .announcement-bar--delivery {
          background: linear-gradient(135deg, var(--error), #dc2626);
          color: white;
        }

        .announcement-bar__container {
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 0 var(--container-px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .announcement-bar__content {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-grow: 1;
          justify-content: center;
        }

        .announcement-bar__text {
          animation: fadeIn 0.5s ease-in-out;
        }

        .announcement-bar__indicators {
          display: flex;
          gap: 0.25rem;
        }

        .announcement-bar__indicator {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.5);
          border: none;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .announcement-bar__indicator--active {
          background: white;
          transform: scale(1.2);
        }

        .announcement-bar__close {
          background: none;
          border: none;
          color: inherit;
          font-size: var(--text-lg);
          cursor: pointer;
          opacity: 0.8;
          transition: opacity var(--transition-base);
          padding: 0.25rem;
          border-radius: var(--radius);
        }

        .announcement-bar__close:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.1);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .announcement-bar {
            font-size: var(--text-xs);
            padding: 0.5rem 0;
          }
          
          .announcement-bar__indicators {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
