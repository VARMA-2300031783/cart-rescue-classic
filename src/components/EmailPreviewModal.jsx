import React from 'react';
import { X, Mail, Tag, ArrowRight, ShieldCheck } from 'lucide-react';

export default function EmailPreviewModal({ cart, onClose, onSendConfirm }) {
  if (!cart) return null;

  const discountPercent = 10;
  const promoCode = `RESCUE${discountPercent}`;
  const subtotal = cart.totalValue;
  const discountVal = (subtotal * discountPercent) / 100;
  const finalPrice = subtotal - discountVal;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Mail color="var(--accent-gold)" size={20} />
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>Email Rescue Preview</h3>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Email Envelope Header */}
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '0.8rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.85rem' }}>
          <div><strong style={{ color: 'var(--text-subtle)' }}>To:</strong> {cart.customerName} ({cart.customerEmail})</div>
          <div><strong style={{ color: 'var(--text-subtle)' }}>From:</strong> support@classicstore.com</div>
          <div><strong style={{ color: 'var(--text-subtle)' }}>Subject:</strong> You left something behind! Enjoy {discountPercent}% off your order</div>
        </div>

        {/* Realistic HTML Email Body */}
        <div style={{ background: '#ffffff', color: '#1e293b', borderRadius: 'var(--radius-sm)', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', color: '#0f172a', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
            Hi {cart.customerName},
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.5, marginBottom: '1rem' }}>
            We saved the items in your shopping cart! Complete your order today and use promo code <strong>{promoCode}</strong> to receive <strong>{discountPercent}% off</strong> your purchase.
          </p>

          {/* Cart Item Summary */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.8rem', marginBottom: '1rem' }}>
            {cart.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#1e293b', marginBottom: '0.4rem' }}>
                <span>{item.name} (×{item.quantity || 1})</span>
                <strong>${item.price.toFixed(2)}</strong>
              </div>
            ))}
            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '0.5rem 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b' }}>
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#16a34a', fontWeight: 600 }}>
              <span>Discount ({discountPercent}%):</span>
              <span>-${discountVal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', color: '#0f172a', fontWeight: 700, marginTop: '0.3rem' }}>
              <span>Total Price:</span>
              <span style={{ color: '#d97706' }}>${finalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.2rem' }}>
            <span style={{ display: 'inline-block', background: '#d97706', color: '#ffffff', padding: '0.7rem 1.4rem', borderRadius: '6px', fontWeight: 600, fontSize: '0.95rem' }}>
              Restore My Cart & Save ${discountVal.toFixed(2)} →
            </span>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem' }}>
          <button onClick={onClose} className="btn-secondary">
            Close Preview
          </button>
          <button onClick={() => { onSendConfirm(cart.id, 'email', discountPercent); onClose(); }} className="btn-primary">
            <Mail size={16} /> Send Email Now
          </button>
        </div>
      </div>
    </div>
  );
}
