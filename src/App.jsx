import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import ShopperStore from './components/ShopperStore';
import MerchantDashboard from './components/MerchantDashboard';
import LiveCartFeed from './components/LiveCartFeed';
import EmailPreviewModal from './components/EmailPreviewModal';
import ExitIntentModal from './components/ExitIntentModal';
import LoginPage from './components/LoginPage';
import { AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState({
    name: 'Varma',
    email: 'varma@example.com',
    role: 'shopper'
  });

  const [activeTab, setActiveTab] = useState('storefront');
  const [cartItems, setCartItems] = useState([
    {
      id: 401,
      name: 'Cadbury Dairy Milk Silk Chocolate Bar',
      price: 180.00,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80'
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [carts, setCarts] = useState([]);
  const [stats, setStats] = useState({
    totalRevenueRescued: '4,85,900',
    activeAbandonedCount: 2,
    totalRescuedCount: 48,
    recoveryRate: '33.8%'
  });

  const [previewCart, setPreviewCart] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [notification, setNotification] = useState(null);

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchBackendData = async () => {
    try {
      const [cartsRes, statsRes] = await Promise.all([
        fetch('/api/carts'),
        fetch('/api/stats')
      ]);
      if (cartsRes.ok && statsRes.ok) {
        const cartsData = await cartsRes.json();
        const statsData = await statsRes.json();
        if (Array.isArray(cartsData)) {
          setCarts(cartsData);
        }
        if (statsData && typeof statsData === 'object') {
          setStats(statsData);
        }
      }
    } catch (err) {
      console.warn('Backend API offline or starting, using active local state fallback.', err);
    }
  };

  useEffect(() => {
    fetchBackendData();
    const interval = setInterval(fetchBackendData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    showToast(`Welcome ${userData.name}! Logged in as ${userData.role === 'merchant' ? 'Merchant Admin' : 'Shopper'}.`, 'success');
    if (userData.role === 'merchant') {
      setActiveTab('dashboard');
    } else {
      setActiveTab('storefront');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('login');
    showToast('Signed out successfully.', 'warning');
  };

  // Handle Cart Abandon Simulation
  const handleAbandonCart = async (abandonPayload) => {
    try {
      const response = await fetch('/api/carts/abandon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(abandonPayload)
      });
      if (response.ok) {
        const data = await response.json();
        showToast('Cart saved as abandoned! Switch to Merchant Dashboard to trigger rescue.', 'warning');
        fetchBackendData();
        setShowExitModal(true);
      }
    } catch (err) {
      showToast('Simulated cart abandonment locally!', 'warning');
      setShowExitModal(true);
    }
  };

  // Handle Rescue Reminder Dispatch
  const handleSendRescue = async (cartId, channel = 'email', discount = 10) => {
    try {
      const response = await fetch(`/api/carts/${cartId}/rescue`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel, discountPercent: discount })
      });
      if (response.ok) {
        const data = await response.json();
        showToast(`Rescue reminder sent via ${channel.toUpperCase()} with ${discount}% discount!`, 'success');
        fetchBackendData();
      }
    } catch (err) {
      showToast(`Sent ${channel.toUpperCase()} reminder locally!`, 'success');
    }
  };

  // Handle Completing Rescue / Checkout
  const handleCompleteRescue = async (cartId) => {
    try {
      const response = await fetch(`/api/carts/${cartId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        const data = await response.json();
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        showToast(`Cart #${cartId} rescued successfully! Revenue added to dashboard.`, 'success');
        fetchBackendData();
      }
    } catch (err) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      showToast(`Cart rescued! Order completed.`, 'success');
    }
  };

  // Handle Direct Storefront Checkout Success
  const handleCheckoutSuccess = (paidAmount) => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    showToast(`Thank you! Order of ₹${paidAmount.toLocaleString('en-IN')} completed successfully.`, 'success');
    setCartItems([]);
    setPromoCode('');
    setDiscountPercent(0);
  };

  const handleApplyDiscount = (code, percent) => {
    setPromoCode(code);
    setDiscountPercent(percent);
    showToast(`Promo code ${code} applied! Saved ${percent}%.`, 'success');
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.length}
        rescuedRevenue={stats.totalRevenueRescued}
        activeAbandonedCount={stats.activeAbandonedCount || carts.filter(c => c.status === 'abandoned').length}
        user={user}
        onLogout={handleLogout}
      />

      {/* Global Notification Banner */}
      {notification && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
          background: notification.type === 'warning' ? 'var(--accent-gold)' : 'var(--accent-emerald)',
          color: '#ffffff',
          padding: '0.8rem 1.4rem',
          borderRadius: 'var(--radius-sm)',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontWeight: 600,
          fontSize: '0.9rem',
          animation: 'slideUp 0.2s ease-out'
        }}>
          {notification.type === 'warning' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
          {notification.message}
        </div>
      )}

      {/* Main View Area */}
      <main className="main-content">
        {activeTab === 'login' && (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        )}

        {activeTab === 'storefront' && (
          <ShopperStore
            cartItems={cartItems}
            setCartItems={setCartItems}
            onAbandonCart={handleAbandonCart}
            onCheckoutSuccess={handleCheckoutSuccess}
            promoCode={promoCode}
            discountPercent={discountPercent}
          />
        )}

        {activeTab === 'dashboard' && (
          <MerchantDashboard
            stats={stats}
            carts={carts}
            onSendRescue={handleSendRescue}
            onPreviewEmail={(cart) => setPreviewCart(cart)}
            onCompleteRescue={handleCompleteRescue}
            fetchStats={fetchBackendData}
          />
        )}

        {activeTab === 'livefeed' && (
          <LiveCartFeed
            carts={carts}
            onSendRescue={handleSendRescue}
            onCompleteRescue={handleCompleteRescue}
            onPreviewEmail={(cart) => setPreviewCart(cart)}
          />
        )}
      </main>

      {/* Modals */}
      <EmailPreviewModal
        cart={previewCart}
        onClose={() => setPreviewCart(null)}
        onSendConfirm={handleSendRescue}
      />

      <ExitIntentModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onApplyDiscount={handleApplyDiscount}
      />

      {/* Classic Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-color)',
        padding: '1.5rem',
        textAlign: 'center',
        color: 'var(--text-subtle)',
        fontSize: '0.85rem',
        marginTop: 'auto',
        background: 'rgba(15, 23, 42, 0.95)'
      }}>
        <div>Cart Rescue • Simple English & Classic Abandoned Cart Recovery System</div>
      </footer>
    </div>
  );
}
