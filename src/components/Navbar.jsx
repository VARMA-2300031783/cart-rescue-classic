import React from 'react';
import { ShoppingCart, LayoutDashboard, Radio, Zap, ShieldCheck, LogIn, LogOut, User } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, cartCount, rescuedRevenue, activeAbandonedCount, user, onLogout }) {
  return (
    <header style={{
      background: '#ffffff',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0.9rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Brand Title */}
        <div 
          onClick={() => setActiveTab('storefront')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, var(--accent-gold) 0%, #b45309 100%)',
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <ShoppingCart size={22} color="#ffffff" />
          </div>
          <div>
            <h1 className="title-serif" style={{ fontSize: '1.4rem', color: 'var(--text-main)', lineHeight: 1.1 }}>
              Cart Rescue
            </h1>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
              Indian Rupees (₹) Edition
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', gap: '0.4rem', background: '#f1f5f9', padding: '0.3rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setActiveTab('login')}
            style={{
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.88rem',
              fontWeight: 600,
              background: activeTab === 'login' ? '#ffffff' : 'transparent',
              color: activeTab === 'login' ? 'var(--accent-gold)' : 'var(--text-muted)',
              boxShadow: activeTab === 'login' ? 'var(--shadow-sm)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <LogIn size={16} />
            Login Portal
          </button>

          <button
            onClick={() => setActiveTab('storefront')}
            style={{
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.88rem',
              fontWeight: 600,
              background: activeTab === 'storefront' ? '#ffffff' : 'transparent',
              color: activeTab === 'storefront' ? 'var(--accent-gold)' : 'var(--text-muted)',
              boxShadow: activeTab === 'storefront' ? 'var(--shadow-sm)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <ShoppingCart size={16} />
            Storefront
            {cartCount > 0 && (
              <span style={{
                background: 'var(--accent-gold)',
                color: '#ffffff',
                borderRadius: '50%',
                padding: '0.1rem 0.45rem',
                fontSize: '0.75rem',
                fontWeight: 700
              }}>
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            style={{
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.88rem',
              fontWeight: 600,
              background: activeTab === 'dashboard' ? '#ffffff' : 'transparent',
              color: activeTab === 'dashboard' ? 'var(--accent-gold)' : 'var(--text-muted)',
              boxShadow: activeTab === 'dashboard' ? 'var(--shadow-sm)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <LayoutDashboard size={16} />
            Merchant Dashboard
          </button>

          <button
            onClick={() => setActiveTab('livefeed')}
            style={{
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.88rem',
              fontWeight: 600,
              background: activeTab === 'livefeed' ? '#ffffff' : 'transparent',
              color: activeTab === 'livefeed' ? 'var(--accent-gold)' : 'var(--text-muted)',
              boxShadow: activeTab === 'livefeed' ? 'var(--shadow-sm)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Radio size={16} />
            Live Cart Feed
            {activeAbandonedCount > 0 && (
              <span className="badge badge-abandoned" style={{ padding: '0.1rem 0.4rem', fontSize: '0.7rem' }}>
                {activeAbandonedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Quick User Profile & Rescued Sales Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{
            background: '#d1fae5',
            border: '1px solid #a7f3d0',
            padding: '0.4rem 0.8rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.82rem',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontWeight: 600
          }}>
            <ShieldCheck size={16} />
            <span>Rescued: <strong>₹{rescuedRevenue}</strong></span>
          </div>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8fafc', padding: '0.35rem 0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <User size={15} color="var(--accent-gold)" />
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {user.name}
              </span>
              <button
                onClick={onLogout}
                title="Sign Out"
                style={{
                  background: 'transparent',
                  color: 'var(--accent-rose)',
                  padding: '0.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  border: 'none'
                }}
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActiveTab('login')}
              className="btn-secondary"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
