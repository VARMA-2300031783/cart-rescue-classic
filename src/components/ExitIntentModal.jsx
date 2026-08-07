import React from 'react';
import { X, Tag, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

export default function ExitIntentModal({ isOpen, onClose, onApplyDiscount }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={e => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          border: '2px solid var(--accent-gold)',
          textAlign: 'center',
          boxShadow: 'var(--shadow-glow)'
        }}
      >
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', color: 'var(--text-muted)' }}
        >
          <X size={22} />
        </button>

        <div style={{
          background: 'rgba(245, 158, 11, 0.15)',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem auto'
        }}>
          <Sparkles size={32} color="var(--accent-gold)" />
        </div>

        <h2 className="title-serif" style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
          Wait! Don't leave your cart behind!
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          We would love to welcome you as a customer. Take an instant <strong>10% OFF</strong> your entire cart right now!
        </p>

        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px dashed var(--accent-gold)',
          padding: '1rem',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '1.5rem'
        }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>
            YOUR DISCOUNT CODE:
          </span>
          <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-gold)', letterSpacing: '0.08em' }}>
            RESCUE10
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <button
            onClick={() => { onApplyDiscount('RESCUE10', 10); onClose(); }}
            className="btn-primary"
            style={{ width: '100%', padding: '0.8rem', fontSize: '1rem' }}
          >
            <CheckCircle size={18} /> Apply 10% Discount & Complete Purchase
          </button>
          
          <button
            onClick={onClose}
            style={{ background: 'transparent', color: 'var(--text-subtle)', fontSize: '0.85rem', padding: '0.5rem' }}
          >
            No thanks, I will pay full price later
          </button>
        </div>
      </div>
    </div>
  );
}
