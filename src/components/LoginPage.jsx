import React, { useState } from 'react';
import { ShoppingCart, ShieldCheck, Mail, Lock, User, ArrowRight, Zap, CheckCircle2, Sparkles, Store } from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('shopper'); // 'shopper' or 'merchant'
  const [email, setEmail] = useState('varma@example.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Varma');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (isRegister && !name)) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    
    // Trigger successful login
    onLoginSuccess({
      name: isRegister ? name : (email.includes('admin') ? 'Merchant Admin' : name || 'Valued User'),
      email,
      role: role
    });
  };

  const handleQuickDemo = (demoRole) => {
    if (demoRole === 'merchant') {
      onLoginSuccess({
        name: 'Track 2 Merchant Admin',
        email: 'admin@cartrescue.ai',
        role: 'merchant'
      });
    } else {
      onLoginSuccess({
        name: 'Varma (Shopper)',
        email: 'varma@example.com',
        role: 'shopper'
      });
    }
  };

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '460px',
        background: '#ffffff',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-md)',
        padding: '2.5rem 2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Top Gold Accent Strip */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          background: 'linear-gradient(90deg, var(--accent-gold) 0%, #b45309 50%, var(--accent-emerald) 100%)'
        }} />

        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--accent-gold) 0%, #b45309 100%)',
            width: '54px',
            height: '54px',
            borderRadius: 'var(--radius-sm)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.8rem',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <ShoppingCart size={28} color="#ffffff" />
          </div>
          <h2 className="title-serif" style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '0.3rem' }}>
            {isRegister ? 'Create Cart Rescue Account' : 'Welcome Back to Cart Rescue'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {isRegister ? 'Sign up to start shopping & testing AI recovery' : 'Sign in to access Storefront & Merchant Dashboard'}
          </p>
        </div>

        {/* Quick Demo Access Buttons */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.9rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Sparkles size={14} /> One-Click Quick Demo Sign-In:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
            <button
              type="button"
              onClick={() => handleQuickDemo('shopper')}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-color)',
                padding: '0.5rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.3rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Store size={14} color="var(--accent-gold)" /> Demo Shopper
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('merchant')}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-color)',
                padding: '0.5rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.3rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <ShieldCheck size={14} color="#059669" /> Demo Merchant
            </button>
          </div>
        </div>

        {/* Role Switcher Pills */}
        <div style={{
          display: 'flex',
          background: '#f1f5f9',
          padding: '0.25rem',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '1.5rem',
          border: '1px solid var(--border-color)'
        }}>
          <button
            type="button"
            onClick={() => { setRole('shopper'); setEmail('varma@example.com'); }}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.82rem',
              fontWeight: 600,
              background: role === 'shopper' ? '#ffffff' : 'transparent',
              color: role === 'shopper' ? 'var(--accent-gold)' : 'var(--text-muted)',
              boxShadow: role === 'shopper' ? 'var(--shadow-sm)' : 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Shopper Portal
          </button>
          <button
            type="button"
            onClick={() => { setRole('merchant'); setEmail('admin@cartrescue.ai'); }}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.82rem',
              fontWeight: 600,
              background: role === 'merchant' ? '#ffffff' : 'transparent',
              color: role === 'merchant' ? '#059669' : 'var(--text-muted)',
              boxShadow: role === 'merchant' ? 'var(--shadow-sm)' : 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Merchant Admin
          </button>
        </div>

        {error && (
          <div style={{
            background: '#fff1f2',
            border: '1px solid #fecdd3',
            color: '#e11d48',
            padding: '0.6rem 0.8rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.82rem',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {isRegister && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '0.3rem', fontWeight: 600 }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.8rem 0.65rem 2.4rem',
                    background: '#ffffff',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.9rem',
                    color: 'var(--text-main)'
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '0.3rem', fontWeight: 600 }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.8rem 0.65rem 2.4rem',
                  background: '#ffffff',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.9rem',
                  color: 'var(--text-main)'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '0.3rem', fontWeight: 600 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.8rem 0.65rem 2.4rem',
                  background: '#ffffff',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.9rem',
                  color: 'var(--text-main)'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', padding: '0.8rem', fontSize: '0.95rem', marginTop: '0.5rem' }}
          >
            {isRegister ? 'Create Account & Continue' : `Sign In as ${role === 'merchant' ? 'Merchant' : 'Shopper'}`} <ArrowRight size={16} />
          </button>
        </form>

        {/* Toggle Register / Login */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {isRegister ? 'Already have an account?' : "Don't have an account yet?"}{' '}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            style={{
              background: 'transparent',
              color: 'var(--accent-gold)',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {isRegister ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}
