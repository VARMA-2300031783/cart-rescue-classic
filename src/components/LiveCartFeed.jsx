import React, { useState } from 'react';
import { Radio, Filter, Mail, MessageSquare, CheckCircle, Clock, ExternalLink } from 'lucide-react';

export default function LiveCartFeed({ carts = [], onSendRescue, onCompleteRescue, onPreviewEmail }) {
  const [filter, setFilter] = useState('all'); // all, abandoned, rescued

  const safeCarts = Array.isArray(carts) ? carts : [];

  const filteredCarts = safeCarts.filter(cart => {
    if (filter === 'abandoned') return cart.status === 'abandoned';
    if (filter === 'rescued') return cart.status === 'rescued';
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="title-serif" style={{ fontSize: '1.8rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Radio size={24} color="var(--accent-rose)" /> Live Cart Activity Feed
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Real-time tracking of abandoned customer shopping carts and recovery outcomes.
          </p>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(30, 41, 59, 0.6)', padding: '0.3rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.82rem',
              fontWeight: 600,
              background: filter === 'all' ? 'var(--accent-gold)' : 'transparent',
              color: filter === 'all' ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            All Carts ({safeCarts.length})
          </button>
          <button
            onClick={() => setFilter('abandoned')}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.82rem',
              fontWeight: 600,
              background: filter === 'abandoned' ? 'var(--accent-rose)' : 'transparent',
              color: filter === 'abandoned' ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            Abandoned ({safeCarts.filter(c => c.status === 'abandoned').length})
          </button>
          <button
            onClick={() => setFilter('rescued')}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.82rem',
              fontWeight: 600,
              background: filter === 'rescued' ? 'var(--accent-emerald)' : 'transparent',
              color: filter === 'rescued' ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            Rescued ({safeCarts.filter(c => c.status === 'rescued').length})
          </button>
        </div>
      </div>

      <div className="glass-card">
        {filteredCarts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            <p>No carts found matching the filter "{filter}".</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {filteredCarts.map(cart => {
              const cartTotal = typeof cart.totalValue === 'number' ? cart.totalValue : parseFloat(cart.totalValue || 0);

              return (
                <div 
                  key={cart.id} 
                  style={{ 
                    background: 'rgba(15, 23, 42, 0.6)', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: 'var(--radius-sm)', 
                    padding: '1.2rem',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>{cart.customerName || 'Customer'}</span>
                      <span className={cart.status === 'rescued' ? 'badge badge-rescued' : 'badge badge-abandoned'}>
                        {cart.status === 'rescued' ? '✓ Rescued' : '• Abandoned'}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
                        {cart.abandonedAt ? new Date(cart.abandonedAt).toLocaleTimeString() : 'Just now'}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      Email: <strong>{cart.customerEmail || 'N/A'}</strong> | Phone: <strong>{cart.customerPhone || 'N/A'}</strong>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {Array.isArray(cart.items) && cart.items.length > 0 ? (
                        cart.items.map((item, idx) => (
                          <span key={idx} style={{ background: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text-main)' }}>
                            {item.name} × {item.quantity || 1}
                          </span>
                        ))
                      ) : (
                        <span style={{ background: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text-main)' }}>
                          Classic Store Items
                        </span>
                      )}
                      <span style={{ fontWeight: 700, color: 'var(--accent-gold)', marginLeft: '0.5rem', fontSize: '0.9rem' }}>
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>

                    {cart.notes && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '0.4rem', fontStyle: 'italic' }}>
                        Note: {cart.notes}
                      </div>
                    )}
                  </div>

                  {cart.status === 'abandoned' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <button
                        onClick={() => onSendRescue(cart.id, 'email', 10)}
                        className="btn-primary"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                      >
                        <Mail size={14} /> Send Email Reminder
                      </button>
                      <button
                        onClick={() => onCompleteRescue(cart.id)}
                        className="btn-success"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                      >
                        <CheckCircle size={14} /> Recover Cart
                      </button>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'right' }}>
                      <span className="badge badge-rescued" style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
                        Revenue Saved: ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
