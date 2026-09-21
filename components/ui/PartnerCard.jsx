'use client';

export default function PartnerCard({ partner }) {
  return (
    <div className="partner-card">
      <div className="avatar">{partner.avatar}</div>
      <h3 className="partner-name">{partner.name}</h3>
      <p className="partner-role">{partner.role}</p>
      <div className="divider"></div>
      <ul className="responsibilities">
        {partner.responsibilities.map((resp, idx) => (
          <li key={idx}>• {resp}</li>
        ))}
      </ul>

      <style jsx>{`
        .partner-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 2rem;
          text-align: center;
          transition: transform 0.3s, box-shadow 0.3s;
          height: 100%;
        }
        .partner-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary);
        }
        .avatar {
          width: 100px;
          height: 100px;
          background: var(--bg-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3.5rem;
          margin: 0 auto 1.5rem;
          border: 4px solid white;
          box-shadow: var(--shadow);
        }
        .partner-name {
          font-size: 1.25rem;
          margin-bottom: 0.25rem;
        }
        .partner-role {
          color: var(--primary);
          font-weight: 500;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .divider {
          height: 1px;
          background: var(--border);
          margin: 1.5rem 0;
          width: 50%;
          margin-left: auto;
          margin-right: auto;
        }
        .responsibilities {
          text-align: left;
          color: var(--text-muted);
          font-size: 0.875rem;
          line-height: 1.6;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
      `}</style>
    </div>
  );
}
