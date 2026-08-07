import React from 'react';
import { ShoppingCart, LayoutDashboard, Radio, Zap, ShieldCheck } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, cartCount, rescuedRevenue, activeAbandonedCount }) {
  return (
    <header style={{
      background: 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      sticky: 'top',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Brand Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--accent-gold) 0%, #d97706 100%)',
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
              Classic & Simple English Edition
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', gap: '0.5rem', background: 'rgba(30, 41, 59, 0.7)', padding: '0.3rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setActiveTab('storefront')}
            style={{
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.88rem',
              fontWeight: 600,
              background: activeTab === 'storefront' ? 'var(--accent-gold)' : 'transparent',
              color: activeTab === 'storefront' ? '#ffffff' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <ShoppingCart size={16} />
            Storefront
            {cartCount > 0 && (
              <span style={{
                background: '#ffffff',
                color: '#d97706',
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
              background: activeTab === 'dashboard' ? 'var(--accent-gold)' : 'transparent',
              color: activeTab === 'dashboard' ? '#ffffff' : 'var(--text-muted)',
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
              background: activeTab === 'livefeed' ? 'var(--accent-gold)' : 'transparent',
              color: activeTab === 'livefeed' ? '#ffffff' : 'var(--text-muted)',
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

        {/* Quick Merchant Metric Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '0.4rem 0.8rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.82rem',
            color: '#34d399',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontWeight: 600
          }}>
            <ShieldCheck size={16} />
            <span>Rescued Sales: <strong>${rescuedRevenue}</strong></span>
          </div>
        </div>
      </div>
    </header>
  );
}
