import express from 'express';
import cors from 'cors';
import { generateRescueMessage } from './aiService.js';

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());

// In-memory data storage for Cart Rescue
let carts = [
  {
    id: 'cart-101',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@example.com',
    customerPhone: '+1 (555) 234-5678',
    items: [
      { id: 1, name: 'Classic Leather Tote Bag', price: 129.00, quantity: 1, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80' },
      { id: 2, name: 'Minimalist Wrist Watch', price: 89.00, quantity: 1, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=400&q=80' }
    ],
    totalValue: 218.00,
    status: 'abandoned', // abandoned, rescued, checkout
    abandonedAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(), // 18 mins ago
    lastNotificationSent: null,
    discountApplied: 0,
    notes: 'Customer stopped at payment step.'
  },
  {
    id: 'cart-102',
    customerName: 'David Miller',
    customerEmail: 'david.m@example.com',
    customerPhone: '+1 (555) 876-5432',
    items: [
      { id: 3, name: 'Ergonomic Wooden Desk Chair', price: 249.00, quantity: 1, image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d1290?auto=format&fit=crop&w=400&q=80' }
    ],
    totalValue: 249.00,
    status: 'abandoned',
    abandonedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    lastNotificationSent: 'Email Reminder #1 (10% Off)',
    discountApplied: 10,
    notes: 'Customer clicked exit-intent discount modal.'
  },
  {
    id: 'cart-103',
    customerName: 'Emma Watson',
    customerEmail: 'emma.w@example.com',
    customerPhone: '+1 (555) 432-1098',
    items: [
      { id: 4, name: 'Wireless Noise Canceling Headphones', price: 179.00, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80' }
    ],
    totalValue: 179.00,
    status: 'rescued',
    abandonedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    rescuedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    lastNotificationSent: 'WhatsApp Quick Rescue',
    discountApplied: 15,
    notes: 'Successfully recovered after WhatsApp discount notification!'
  }
];

let stats = {
  totalCartsAbandoned: 142,
  totalCartsRescued: 48,
  totalRevenueRescued: 7420.00,
  activeCampaigns: 3
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    message: 'Cart Rescue Express Server is running smoothly.'
  });
});

// Get all carts
app.get('/api/carts', (req, res) => {
  const { status } = req.query;
  if (status) {
    return res.json(carts.filter(c => c.status === status));
  }
  res.json(carts);
});

// Get single cart by ID
app.get('/api/carts/:id', (req, res) => {
  const cart = carts.find(c => c.id === req.params.id);
  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }
  res.json(cart);
});

// Abandon a cart (Simulate from Storefront)
app.post('/api/carts/abandon', (req, res) => {
  const { customerName, customerEmail, customerPhone, items, totalValue } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Cart must contain at least one item.' });
  }

  const newCart = {
    id: `cart-${Date.now()}`,
    customerName: customerName || 'Guest Customer',
    customerEmail: customerEmail || 'guest@example.com',
    customerPhone: customerPhone || '+1 (555) 000-0000',
    items,
    totalValue: parseFloat(totalValue) || items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0),
    status: 'abandoned',
    abandonedAt: new Date().toISOString(),
    lastNotificationSent: null,
    discountApplied: 0,
    notes: 'Cart abandoned directly from storefront simulation.'
  };

  carts.unshift(newCart);
  stats.totalCartsAbandoned += 1;

  res.status(201).json({
    message: 'Cart saved as abandoned. Recovery campaign ready!',
    cart: newCart
  });
});

// Send Rescue Notification
app.post('/api/carts/:id/rescue', (req, res) => {
  const { id } = req.params;
  const { channel = 'email', discountPercent = 10 } = req.body;

  const cart = carts.find(c => c.id === id);
  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  const rescueMessage = generateRescueMessage({
    customerName: cart.customerName,
    items: cart.items,
    totalValue: cart.totalValue,
    discountPercent,
    channel
  });

  cart.lastNotificationSent = `${channel.toUpperCase()} (${discountPercent}% Off)`;
  cart.discountApplied = discountPercent;

  res.json({
    success: true,
    message: `Rescue reminder successfully sent via ${channel.toUpperCase()}!`,
    cartId: id,
    rescueMessage
  });
});

// Complete Purchase (Rescue execution)
app.post('/api/carts/:id/complete', (req, res) => {
  const { id } = req.params;
  const cart = carts.find(c => c.id === id);

  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  if (cart.status === 'rescued') {
    return res.json({ message: 'Cart was already rescued and paid.', cart });
  }

  cart.status = 'rescued';
  cart.rescuedAt = new Date().toISOString();

  // Calculate final revenue after discount
  const finalPaidAmount = cart.totalValue * (1 - (cart.discountApplied || 0) / 100);
  stats.totalCartsRescued += 1;
  stats.totalRevenueRescued += finalPaidAmount;

  res.json({
    success: true,
    message: `Cart #${id} successfully rescued! Customer completed checkout.`,
    finalPaidAmount: finalPaidAmount.toFixed(2),
    cart
  });
});

// Get Statistics
app.get('/api/stats', (req, res) => {
  const activeAbandonedCount = carts.filter(c => c.status === 'abandoned').length;
  const totalRescuedCount = carts.filter(c => c.status === 'rescued').length;
  const recoveryRate = stats.totalCartsAbandoned > 0 
    ? ((stats.totalCartsRescued / stats.totalCartsAbandoned) * 100).toFixed(1) 
    : '0.0';

  res.json({
    totalCartsAbandoned: stats.totalCartsAbandoned,
    totalCartsRescued: stats.totalCartsRescued,
    totalRevenueRescued: stats.totalRevenueRescued.toFixed(2),
    activeAbandonedCount,
    totalRescuedCount,
    recoveryRate: `${recoveryRate}%`,
    activeCampaigns: stats.activeCampaigns
  });
});

// AI Rescue Generator Endpoint
app.post('/api/generate-rescue-message', (req, res) => {
  const { customerName, items, totalValue, discountPercent, channel } = req.body;
  const messageData = generateRescueMessage({
    customerName,
    items,
    totalValue,
    discountPercent,
    channel
  });
  res.json({
    success: true,
    message: 'Simple English rescue message generated successfully.',
    data: messageData
  });
});

app.listen(PORT, () => {
  console.log(`✅ Cart Rescue Backend is running on http://localhost:${PORT}`);
});
