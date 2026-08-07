import React, { useState } from 'react';
import { DollarSign, ShoppingCart, Percent, Send, Mail, MessageSquare, Eye, Sparkles, RefreshCw, CheckCircle, Clock } from 'lucide-react';

export default function MerchantDashboard({ stats = {}, carts = [], onSendRescue, onPreviewEmail, onCompleteRescue, fetchStats }) {
  const [aiDiscount, setAiDiscount] = useState(10);
  const [aiChannel, setAiChannel] = useState('email');
  const [aiGeneratedText, setAiGeneratedText] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const safeCarts = Array.isArray(carts) ? carts : [];
  const abandonedCarts = safeCarts.filter(c => c.status === 'abandoned');
  const rescuedCarts = safeCarts.filter(c => c.status === 'rescued');

  const handleGenerateAiCopy = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-rescue-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: 'Sample Customer',
          items: [{ name: 'Classic Leather Bag' }],
          totalValue: 129.00,
          discountPercent: aiDiscount,
          channel: aiChannel
        })
      });
      const data = await response.json();
      if (data.success) {
        setAiGeneratedText(data.data);
      }
    } catch (err) {
      console.error('Failed to generate AI copy:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const revenueDisplay = stats?.totalRevenueRescued ?? '7420.00';
  const rescuedCountDisplay = stats?.totalRescuedCount ?? rescuedCarts.length;
  const rateDisplay = stats?.recoveryRate ?? '33.8%';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header & Refresh */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="title-serif" style={{ fontSize: '1.8rem', color: 'var(--text-main)' }}>
            Merchant Recovery Dashboard
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Monitor active abandoned carts and dispatch single-click rescue messages in simple English.
          </p>
        </div>
        <button onClick={fetchStats} className="btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}>
          <RefreshCw size={16} /> Refresh Metrics
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-emerald)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Sales Rescued</span>
            <DollarSign size={20} color="var(--accent-emerald)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399' }}>
            ${revenueDisplay}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
            {rescuedCountDisplay} completed cart recoveries
          </span>
        </div>

        <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-rose)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Abandoned Carts</span>
            <ShoppingCart size={20} color="var(--accent-rose)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fb7185' }}>
            {abandonedCarts.length}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
            Waiting for rescue reminder
          </span>
        </div>

        <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-gold)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Recovery Conversion Rate</span>
            <Percent size={20} color="var(--accent-gold)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24' }}>
            {rateDisplay}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
            Industry avg: 15% - 25%
          </span>
        </div>
      </div>

      {/* Active Abandoned Carts Section */}
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Clock size={20} color="var(--accent-gold)" /> Active Abandoned Carts Ready for Rescue
          </h3>
          <span className="badge badge-abandoned">
            {abandonedCarts.length} Pending
          </span>
        </div>

        {abandonedCarts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            <CheckCircle size={48} color="var(--accent-emerald)" style={{ marginBottom: '0.8rem', opacity: 0.8 }} />
            <h4 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '0.3rem' }}>Great job! No abandoned carts pending.</h4>
            <p style={{ fontSize: '0.9rem' }}>Go to the Storefront tab to simulate a new abandoned cart.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {abandonedCarts.map(cart => {
              const itemNames = Array.isArray(cart.items) && cart.items.length > 0
                ? cart.items.map(i => i.name).join(', ')
                : 'Classic Store Items';
              const cartTotal = typeof cart.totalValue === 'number' ? cart.totalValue : parseFloat(cart.totalValue || 0);

              return (
                <div key={cart.id} style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.3rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)' }}>
                        {cart.customerName || 'Customer'}
                      </span>
                      <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
                        ID: {cart.id}
                      </span>
                      {cart.lastNotificationSent && (
                        <span className="badge badge-rescued" style={{ fontSize: '0.72rem' }}>
                          Sent: {cart.lastNotificationSent}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      {cart.customerEmail || 'No Email'} • {cart.customerPhone || 'No Phone'}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-subtle)' }}>
                      Items: <strong>{itemNames}</strong> (${cartTotal.toFixed(2)})
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => onPreviewEmail(cart)}
                      className="btn-secondary"
                      style={{ padding: '0.5rem 0.9rem', fontSize: '0.82rem' }}
                    >
                      <Eye size={15} /> Preview Email
                    </button>

                    <button
                      onClick={() => onSendRescue(cart.id, 'email', 10)}
                      className="btn-primary"
                      style={{ padding: '0.5rem 0.9rem', fontSize: '0.82rem' }}
                    >
                      <Mail size={15} /> Send Email (10% Off)
                    </button>

                    <button
                      onClick={() => onSendRescue(cart.id, 'sms', 15)}
                      className="btn-primary"
                      style={{ padding: '0.5rem 0.9rem', fontSize: '0.82rem', background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)' }}
                    >
                      <MessageSquare size={15} /> Send SMS (15% Off)
                    </button>

                    <button
                      onClick={() => onCompleteRescue(cart.id)}
                      className="btn-success"
                      style={{ padding: '0.5rem 0.9rem', fontSize: '0.82rem' }}
                    >
                      <CheckCircle size={15} /> Mark Rescued
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* AI Rescue Message Generator Tool */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.95) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
          <Sparkles size={22} color="var(--accent-gold)" />
          <h3 className="title-serif" style={{ fontSize: '1.3rem', color: 'var(--text-main)' }}>
            AI Simple English Recovery Copy Generator
          </h3>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.2rem' }}>
          Generate friendly, high-converting recovery copy tailored with instant discounts.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '0.3rem', fontWeight: 600 }}>
              Discount Percentage:
            </label>
            <select
              value={aiDiscount}
              onChange={(e) => setAiDiscount(Number(e.target.value))}
              style={{ background: '#0f172a', color: 'var(--text-main)', border: '1px solid var(--border-color)', padding: '0.5rem 0.8rem', borderRadius: 'var(--radius-sm)' }}
            >
              <option value={5}>5% Off</option>
              <option value={10}>10% Off (Recommended)</option>
              <option value={15}>15% Off</option>
              <option value={20}>20% Off</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '0.3rem', fontWeight: 600 }}>
              Channel:
            </label>
            <select
              value={aiChannel}
              onChange={(e) => setAiChannel(e.target.value)}
              style={{ background: '#0f172a', color: 'var(--text-main)', border: '1px solid var(--border-color)', padding: '0.5rem 0.8rem', borderRadius: 'var(--radius-sm)' }}
            >
              <option value="email">Email Campaign</option>
              <option value="sms">SMS Text Message</option>
              <option value="whatsapp">WhatsApp Message</option>
            </select>
          </div>

          <button
            onClick={handleGenerateAiCopy}
            disabled={isGenerating}
            className="btn-primary"
            style={{ marginTop: 'auto', padding: '0.6rem 1.2rem' }}
          >
            {isGenerating ? 'Generating Copy...' : 'Generate Copy Now'}
          </button>
        </div>

        {aiGeneratedText && (
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--border-hover)', borderRadius: 'var(--radius-sm)', padding: '1rem', fontSize: '0.88rem' }}>
            <div style={{ color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '0.5rem' }}>
              Subject / Headline: {aiGeneratedText.subject}
            </div>
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', color: 'var(--text-main)', lineHeight: 1.5 }}>
              {aiGeneratedText.message || aiGeneratedText.bodyText}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
