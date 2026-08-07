import React, { useState } from 'react';
import { ShoppingBag, Plus, Trash2, ArrowRight, AlertTriangle, CheckCircle, Tag, Sparkles, User, ShieldAlert, CreditCard, Truck, RefreshCw } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    name: 'Classic Leather Tote Bag',
    category: 'Accessories',
    price: 129.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
    description: 'Handcrafted premium leather bag with durable brass hardware.'
  },
  {
    id: 2,
    name: 'Minimalist Wrist Watch',
    category: 'Watches',
    price: 89.00,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80',
    description: 'Sleek stainless steel watch with scratch-resistant sapphire crystal.'
  },
  {
    id: 3,
    name: 'Ergonomic Wooden Desk Chair',
    category: 'Furniture',
    price: 249.00,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d1290?auto=format&fit=crop&w=600&q=80',
    description: 'Comfortable lumbar support crafted from oak and breathable mesh.'
  },
  {
    id: 4,
    name: 'Wireless Noise Canceling Headphones',
    category: 'Electronics',
    price: 179.00,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    description: 'Immersive sound quality with 30-hour battery life and soft ear cushions.'
  }
];

const SAMPLE_CUSTOMERS = [
  { name: 'Robert Fox', email: 'robert.fox@example.com', phone: '+1 (555) 333-4444' },
  { name: 'Emily Clark', email: 'emily.c@example.com', phone: '+1 (555) 777-8888' },
  { name: 'Michael Scott', email: 'michael.s@example.com', phone: '+1 (555) 999-0000' },
  { name: 'Alex Morgan', email: 'alex.m@example.com', phone: '+1 (555) 987-6543' }
];

export default function ShopperStore({ cartItems, setCartItems, onAbandonCart, onCheckoutSuccess, promoCode, discountPercent }) {
  const [showExitNotice, setShowExitNotice] = useState(false);
  const [sessionSignal, setSessionSignal] = useState('hasPaymentError');
  const [customerInfo, setCustomerInfo] = useState({
    name: 'Robert Fox',
    email: 'robert.fox@example.com',
    phone: '+1 (555) 333-4444'
  });

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleSimulateAbandon = () => {
    if (cartItems.length === 0) return;
    onAbandonCart({
      customerName: customerInfo.name || 'Valued Customer',
      customerEmail: customerInfo.email || 'customer@example.com',
      customerPhone: customerInfo.phone || '+1 (555) 000-0000',
      items: cartItems,
      totalValue: subtotal,
      hasPaymentError: sessionSignal === 'hasPaymentError',
      reachedShippingStep: sessionSignal === 'reachedShippingStep',
      askedForCOD: sessionSignal === 'askedForCOD',
      tabSwitchCount: sessionSignal === 'tabSwitchCount' ? 4 : 0
    });
    setShowExitNotice(true);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 370px', gap: '2rem' }}>
      {/* Product Catalog */}
      <div>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 className="title-serif" style={{ fontSize: '1.8rem', color: 'var(--text-main)' }}>
            Classic Goods Store
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Select items to add to your shopping cart. Test AI session signals (Payment failure, Shipping cost, Price shopping).
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {PRODUCTS.map(product => (
            <div key={product.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ height: '180px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', marginBottom: '1rem', position: 'relative' }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="badge badge-gold" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                  ★ {product.rating}
                </span>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', textTransform: 'uppercase', fontWeight: 600 }}>
                {product.category}
              </span>
              <h3 style={{ fontSize: '1.1rem', margin: '0.3rem 0', color: 'var(--text-main)' }}>
                {product.name}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', flex: 1 }}>
                {product.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="btn-primary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                  <Plus size={16} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shopping Cart Drawer & AI Session Signal Simulator */}
      <div className="glass-card" style={{ height: 'fit-content', position: 'sticky', top: '90px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.8rem', borderBottom: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag size={20} color="var(--accent-gold)" /> Your Cart
          </h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {/* Customer Information Editable Form */}
        <div style={{ background: '#f8fafc', border: '1px solid var(--border-color)', padding: '0.9rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>
          <div style={{ color: 'var(--accent-gold)', marginBottom: '0.6rem', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <User size={15} /> Customer Details:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.6rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-subtle)', marginBottom: '0.1rem' }}>Customer Name:</label>
              <input
                type="text"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                placeholder="Enter customer name..."
                style={{ width: '100%', background: '#ffffff', color: 'var(--text-main)', border: '1px solid var(--border-color)', padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.8rem' }}>
            {SAMPLE_CUSTOMERS.map((cust, idx) => (
              <button
                key={idx}
                onClick={() => setCustomerInfo(cust)}
                style={{
                  background: customerInfo.name === cust.name ? 'var(--accent-gold)' : '#e2e8f0',
                  color: customerInfo.name === cust.name ? '#ffffff' : 'var(--text-main)',
                  fontSize: '0.72rem',
                  padding: '0.2rem 0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 600
                }}
              >
                {cust.name}
              </button>
            ))}
          </div>

          {/* AI Session Friction Signal Selector */}
          <div style={{ color: '#0284c7', marginBottom: '0.4rem', fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.6rem' }}>
            <ShieldAlert size={15} /> Track 2 AI Abandonment Signal:
          </div>
          <select
            value={sessionSignal}
            onChange={(e) => setSessionSignal(e.target.value)}
            style={{ width: '100%', background: '#ffffff', color: '#0284c7', border: '1px solid #0284c7', padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', fontWeight: 600 }}
          >
            <option value="hasPaymentError">💳 Payment Timeout (UPI Gateway Failure)</option>
            <option value="reachedShippingStep">🚚 Surprise Shipping Cost Hesitation</option>
            <option value="tabSwitchCount">🔍 Price Shopping (4 Tab Switches)</option>
            <option value="askedForCOD">💵 Cash On Delivery Request</option>
            <option value="normal">✨ Low Risk / High Intent (Will Convert Naturally)</option>
          </select>
        </div>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
            <ShoppingBag size={40} style={{ opacity: 0.3, marginBottom: '0.5rem' }} />
            <p style={{ fontSize: '0.9rem' }}>Your shopping cart is empty.</p>
          </div>
        ) : (
          <div>
            <div style={{ maxHeight: '180px', overflowY: 'auto', marginBottom: '1rem', paddingRight: '0.3rem' }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem', background: '#f8fafc', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #f1f5f9' }}>
                  <img src={item.image} alt={item.name} style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '4px' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden', whitespace: 'nowrap' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    style={{ background: 'transparent', color: 'var(--accent-rose)', padding: '0.3rem' }}
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.8rem', marginBottom: '1.2rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-main)', fontWeight: 700, fontSize: '1.1rem', marginTop: '0.4rem' }}>
                <span>Total Amount:</span>
                <span style={{ color: 'var(--accent-gold)' }}>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <button
                onClick={() => onCheckoutSuccess(finalTotal)}
                className="btn-success"
                style={{ width: '100%', padding: '0.8rem' }}
              >
                <CheckCircle size={18} /> Complete Order (${finalTotal.toFixed(2)})
              </button>

              <button
                onClick={handleSimulateAbandon}
                className="btn-secondary"
                style={{ width: '100%', padding: '0.7rem', color: '#e11d48', borderColor: '#fecdd3', background: '#fff1f2' }}
              >
                <AlertTriangle size={16} /> Test AI Remediation Agent ({customerInfo.name})
              </button>
            </div>
          </div>
        )}

        {showExitNotice && (
          <div style={{ marginTop: '1rem', padding: '0.8rem', background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: '#b45309' }}>
            <strong>AI Agent Diagnosed Session!</strong> Check the <em>Merchant Dashboard</em> to see the Risk Score %, Diagnosis, Policy-Bounded Action, and Margin Saved.
          </div>
        )}
      </div>
    </div>
  );
}
