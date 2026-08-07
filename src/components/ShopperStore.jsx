import React, { useState } from 'react';
import { ShoppingBag, Plus, Trash2, ArrowRight, AlertTriangle, CheckCircle, Tag, Sparkles, User, ShieldAlert, CreditCard, Truck, RefreshCw, Star, Layers } from 'lucide-react';

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80';

const PRODUCTS = [
  // Home Appliances
  {
    id: 501,
    name: 'Samsung 580L Double Door Convertible Refrigerator',
    category: 'Appliances',
    subCategory: 'Refrigerators',
    brand: 'Samsung',
    price: 899.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=80',
    description: 'Frost-free double door stainless steel refrigerator with Twin Cooling Plus.'
  },
  {
    id: 502,
    name: 'LG 8kg Front Load Smart Inverter Washing Machine',
    category: 'Appliances',
    subCategory: 'Washing Machines',
    brand: 'LG',
    price: 649.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80',
    description: 'AI Direct Drive washer with steam hygiene wash and TurboWash 360° technology.'
  },
  {
    id: 503,
    name: 'Daikin 1.5 Ton 5-Star Inverter Split AC',
    category: 'Appliances',
    subCategory: 'Air Conditioners',
    brand: 'Daikin',
    price: 749.00,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&q=80',
    description: '3D airflow inverter split AC with PM 2.5 filter and dew clean technology.'
  },

  // Branded Jeans
  {
    id: 301,
    name: "Levi's 501 Original Fit Straight Jeans",
    category: 'Fashion',
    subCategory: 'Jeans',
    brand: "Levi's",
    price: 79.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80',
    description: "Iconic Levi's 501 straight-leg stretch denim with signature leather patch."
  },
  {
    id: 302,
    name: 'Wrangler Authentic Regular Fit Denim Jeans',
    category: 'Fashion',
    subCategory: 'Jeans',
    brand: 'Wrangler',
    price: 64.00,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=600&q=80',
    description: 'Durable heavyweight cotton denim with comfort flex waistband.'
  },

  // Branded Shirts
  {
    id: 303,
    name: 'Ralph Lauren Custom Fit Oxford Shirt',
    category: 'Fashion',
    subCategory: 'Shirts',
    brand: 'Polo Ralph Lauren',
    price: 98.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80',
    description: 'Signature embroidered pony logo on 100% breathable Oxford cotton.'
  },
  {
    id: 304,
    name: 'Tommy Hilfiger Casual Plaid Cotton Shirt',
    category: 'Fashion',
    subCategory: 'Shirts',
    brand: 'Tommy Hilfiger',
    price: 85.00,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    description: 'Classic American heritage checked cotton shirt with flag logo embroidery.'
  },

  // Branded Round Neck T-Shirts
  {
    id: 305,
    name: 'Nike Sportswear Essential Crewneck T-Shirt',
    category: 'Fashion',
    subCategory: 'Round Neck T-Shirts',
    brand: 'Nike',
    price: 35.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    description: 'Heavyweight organic cotton round neck t-shirt with classic Swoosh logo.'
  },
  {
    id: 306,
    name: 'Adidas Trefoil Essentials Round Neck Tee',
    category: 'Fashion',
    subCategory: 'Round Neck T-Shirts',
    brand: 'Adidas',
    price: 32.00,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
    description: 'Soft single jersey cotton round neck t-shirt featuring the iconic Trefoil logo.'
  },

  // Jackets
  {
    id: 307,
    name: 'Classic Biker Lambskin Leather Jacket',
    category: 'Fashion',
    subCategory: 'Jackets',
    brand: 'Jack & Jones',
    price: 249.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80',
    description: '100% genuine lambskin leather with vintage asymmetrical metal zippers.'
  },

  // Electronics
  {
    id: 101,
    name: 'Sony WH-1000XM5 Wireless Headphones',
    category: 'Electronics',
    subCategory: 'Headphones',
    brand: 'Sony',
    price: 349.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    description: 'Industry-leading noise canceling headphones with dual processors and 30hr battery.'
  },
  
  // Mobiles
  {
    id: 201,
    name: 'iPhone 15 Pro Max Titanium',
    category: 'Mobiles',
    subCategory: 'Smartphones',
    brand: 'Apple',
    price: 1199.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80',
    description: 'A17 Pro chip, Aerospace-grade titanium design, and 5x Telephoto camera.'
  },
  {
    id: 202,
    name: 'Samsung Galaxy S24 Ultra 5G',
    category: 'Mobiles',
    subCategory: 'Smartphones',
    brand: 'Samsung',
    price: 1299.00,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80',
    description: 'Galaxy AI features, integrated S Pen, and 200MP camera resolution.'
  },

  // Chocolates
  {
    id: 401,
    name: 'Swiss Dark Chocolate Truffles Box',
    category: 'Chocolates',
    subCategory: 'Truffles',
    brand: 'Lindt',
    price: 45.00,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=600&q=80',
    description: '24-piece artisan truffles crafted with 70% Single-Origin cocoa & ganache.'
  }
];

const SAMPLE_CUSTOMERS = [
  { name: 'Robert Fox', email: 'robert.fox@example.com', phone: '+1 (555) 333-4444' },
  { name: 'Emily Clark', email: 'emily.c@example.com', phone: '+1 (555) 777-8888' },
  { name: 'Michael Scott', email: 'michael.s@example.com', phone: '+1 (555) 999-0000' },
  { name: 'Alex Morgan', email: 'alex.m@example.com', phone: '+1 (555) 987-6543' }
];

export default function ShopperStore({ cartItems, setCartItems, onAbandonCart, onCheckoutSuccess, promoCode, discountPercent }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showExitNotice, setShowExitNotice] = useState(false);
  const [sessionSignal, setSessionSignal] = useState('hasPaymentError');
  const [customerInfo, setCustomerInfo] = useState({
    name: 'Robert Fox',
    email: 'robert.fox@example.com',
    phone: '+1 (555) 333-4444'
  });

  const categories = ['All', 'Appliances', 'Fashion', 'Mobiles', 'Electronics', 'Chocolates'];

  const filteredProducts = selectedCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = DEFAULT_FALLBACK_IMAGE;
  };

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
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 className="title-serif" style={{ fontSize: '1.8rem', color: 'var(--text-main)' }}>
              Premium Indian Superstore
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Explore High-Resolution Refrigerators, Washing Machines, ACs, Fashion & Mobiles.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', background: '#ffffff', padding: '0.3rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  background: selectedCategory === cat ? 'var(--accent-gold)' : 'transparent',
                  color: selectedCategory === cat ? '#ffffff' : 'var(--text-muted)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {filteredProducts.map(product => (
            <div key={product.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
              <div style={{ height: '200px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', marginBottom: '1rem', position: 'relative', background: '#f1f5f9' }}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  onError={handleImageError}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                />
                <span className="badge badge-gold" style={{ position: 'absolute', top: '10px', left: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  ★ {product.rating}
                </span>
                <span style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(15,23,42,0.85)', color: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontWeight: 600 }}>
                  {product.brand ? product.brand : (product.subCategory || product.category)}
                </span>
              </div>

              <h3 style={{ fontSize: '1.05rem', margin: '0.2rem 0 0.4rem 0', color: 'var(--text-main)', fontWeight: 700 }}>
                {product.name}
              </h3>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', marginBottom: '1rem', flex: 1, lineHeight: 1.4 }}>
                {product.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', borderTop: '1px solid #f1f5f9', paddingTop: '0.8rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
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

        {/* Customer Information Form */}
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
            <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '1rem', paddingRight: '0.3rem' }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem', background: '#f8fafc', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #f1f5f9' }}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    onError={handleImageError}
                    style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '4px' }} 
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden', whitespace: 'nowrap' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
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
