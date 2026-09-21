'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';

export default function LoginPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    window.setTimeout(() => {
      localStorage.setItem('fpm_customer', JSON.stringify({ email, signedInAt: new Date().toISOString() }));
      addToast('Welcome back. You are now signed in.', 'success');
      router.push('/');
    }, 500);
  };

  return (
    <main className="login-page">
      <section className="login-visual" aria-label="Fresh grocery collection">
        <div className="login-visual__overlay" />
        <div className="login-visual__content">
          <img src="/images/four-partners-logo.png" alt="Four Partners Mart" className="login-visual__logo" />
          <p>Quality essentials, thoughtfully delivered.</p>
        </div>
      </section>
      <section className="login-form-area">
        <div className="login-card">
          <Link href="/" className="login-back">← Back to store</Link>
          <p className="login-eyebrow">CUSTOMER ACCOUNT</p>
          <h1>Welcome back</h1>
          <p className="login-intro">Sign in to view your orders and make checkout faster.</p>
          <form onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="email">Email address</label>
            <input id="email" type="email" className="form-input" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" />
            <label className="form-label login-label" htmlFor="password">Password</label>
            <input id="password" type="password" className="form-input" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" />
            <div className="login-options"><label><input type="checkbox" /> Remember me</label><button type="button">Forgot password?</button></div>
            <button type="submit" className="btn btn-primary login-submit" disabled={isSubmitting}>{isSubmitting ? 'Signing in…' : 'Sign in'}</button>
          </form>
          <p className="login-create">New to Four Partners Mart? <Link href="/contact">Create an account with our team</Link></p>
        </div>
      </section>

      <style jsx>{`
        .login-page { min-height: 78vh; display: grid; grid-template-columns: 1.15fr 0.85fr; background: var(--surface); }
        .login-visual { position: relative; min-height: 620px; background: url('/images/grocery-hero-premium.png') center / cover no-repeat; color: white; }
        .login-visual__overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(12, 33, 24, .92), rgba(12, 33, 24, .38)); }
        .login-visual__content { position: relative; z-index: 1; height: 100%; padding: 4rem; display: flex; flex-direction: column; justify-content: flex-end; gap: 1.25rem; }
        .login-visual__logo { width: min(21rem, 100%); background: rgba(255,255,255,.94); padding: .75rem; border-radius: var(--radius); }
        .login-visual__content p { font-size: 1.25rem; max-width: 20rem; color: #f7f5ee; }
        .login-form-area { display: grid; place-items: center; padding: 3rem 1.5rem; }
        .login-card { width: min(100%, 25rem); }
        .login-back, .login-eyebrow { display: block; font-size: var(--text-xs); font-weight: 800; letter-spacing: .12em; color: var(--primary); text-transform: uppercase; }
        .login-back { margin-bottom: 3rem; }
        .login-eyebrow { margin-bottom: .75rem; }
        h1 { font-size: clamp(2rem, 4vw, 3rem); margin-bottom: .75rem; }
        .login-intro { color: var(--text-muted); margin-bottom: 2rem; }
        .login-label { margin-top: 1.25rem; }
        .login-options { display: flex; justify-content: space-between; gap: 1rem; align-items: center; margin: 1rem 0 1.5rem; font-size: var(--text-sm); color: var(--text-muted); }
        .login-options label { display: flex; gap: .45rem; align-items: center; }
        .login-options button { color: var(--primary); font-weight: 700; }
        .login-submit { width: 100%; min-height: 3rem; }
        .login-create { margin-top: 1.75rem; color: var(--text-muted); font-size: var(--text-sm); text-align: center; }
        .login-create :global(a) { color: var(--primary); font-weight: 700; }
        @media (max-width: 800px) { .login-page { grid-template-columns: 1fr; } .login-visual { min-height: 16rem; } .login-visual__content { padding: 2rem; } .login-visual__logo { width: 12rem; } .login-visual__content p { font-size: 1rem; } }
      `}</style>
    </main>
  );
}
