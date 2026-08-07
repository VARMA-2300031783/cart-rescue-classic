import express from 'express';
import cors from 'cors';
import { generateRescueMessage } from './aiService.js';

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());

let carts = [
  {
    id: 'cart-101',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@example.com',
    customerPhone: '+91 98765 43210',
    items: [
      { id: 401, name: 'Cadbury Dairy Milk Silk Chocolate Bar', price: 180.00, quantity: 2, image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=400&q=80' }
    ],
    totalValue: 360.00,
    status: 'abandoned',
    abandonedAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    lastNotificationSent: 'OFFER_UPI_RETRY_LINK',
    discountApplied: 0,
    riskScore: 82,
    diagnosis: 'PAYMENT_FAILURE',
    recommendedAction: 'OFFER_UPI_RETRY_LINK',
    actionReason: 'Payment timeout detected on UPI gateway. Do not discount (payment issue, not price issue).',
    marginSaved: 54.00
  },
  {
    id: 'cart-102',
    customerName: 'David Miller',
    customerEmail: 'david.m@example.com',
    customerPhone: '+91 98765 12345',
    items: [
      { id: 503, name: 'Daikin 1.5 Ton 5-Star Inverter Split AC', price: 44990.00, quantity: 1, image: 'https://images.unsplash.com/photo-1631545806606-444736f1c496?auto=format&fit=crop&w=400&q=80' }
    ],
    totalValue: 44990.00,
    status: 'abandoned',
    abandonedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    lastNotificationSent: 'MARGIN_BOUNDED_DISCOUNT (10% Off)',
    discountApplied: 10,
    riskScore: 68,
    diagnosis: 'PRICE_SHOPPING',
    recommendedAction: 'MARGIN_BOUNDED_DISCOUNT',
    actionReason: 'Tab switching detected. Apply 10% coupon (RESCUE10) to match price expectation.',
    marginSaved: 2249.50
  },
  {
    id: 'cart-103',
    customerName: 'Emma Watson',
    customerEmail: 'emma.w@example.com',
    customerPhone: '+91 98765 67890',
    items: [
      { id: 301, name: "Levi's 501 Original Fit Straight Jeans", price: 3999.00, quantity: 1, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80' }
    ],
    totalValue: 3999.00,
    status: 'rescued',
    abandonedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    rescuedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    lastNotificationSent: 'WAIVE_SHIPPING_FEE',
    discountApplied: 0,
    riskScore: 74,
    diagnosis: 'SURPRISE_SHIPPING',
    recommendedAction: 'WAIVE_SHIPPING_FEE',
    actionReason: 'Free shipping promo code FLATSIP applied.',
    marginSaved: 399.90
  }
];

let stats = {
  totalCartsAbandoned: 142,
  totalCartsRescued: 48,
  totalRevenueRescued: 485900.00,
  marginSaved: 84500.00,
  activeCampaigns: 3,
  holdoutControlGroupRecoveryRate: '18.4%',
  aiIncrementalLift: '+15.4%'
};

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    message: 'Cart Rescue Track 2 AI Express Backend is running.'
  });
});

app.post('/api/score-session', (req, res) => {
  const { paymentAttempts = 0, hasPaymentError = false, reachedShippingStep = false, askedForCOD = false, tabSwitchCount = 0, timeOnPageSeconds = 30, cartTotal = 100.0 } = req.body;

  let riskScore = 15;
  if (hasPaymentError || paymentAttempts > 0) riskScore += 55;
  if (reachedShippingStep) riskScore += 25;
  if (askedForCOD) riskScore += 20;
  if (tabSwitchCount >= 3) riskScore += 20;
  if (timeOnPageSeconds > 120) riskScore += 15;
  riskScore = Math.min(98, Math.max(5, riskScore));

  let diagnosis = 'LOW_RISK_HIGH_INTENT';
  let diagnosisExplanation = 'High purchase intent without friction. Customer is likely to complete purchase naturally.';
  let recommendedAction = 'DO_NOTHING';
  let actionReason = 'Do not intervene or offer discount! Customer will convert naturally without eroding margin.';
  let discountPercent = 0;
  let marginSaved = cartTotal * 0.15;

  if (hasPaymentError || paymentAttempts > 0) {
    diagnosis = 'PAYMENT_FAILURE';
    diagnosisExplanation = 'Customer experienced a UPI / Netbanking gateway failure during checkout.';
    recommendedAction = 'OFFER_UPI_RETRY_LINK';
    actionReason = 'Send instant 1-click UPI retry link via WhatsApp/SMS. DO NOT DISCOUNT (Payment issue, not price issue).';
    discountPercent = 0;
  } else if (reachedShippingStep && timeOnPageSeconds > 45) {
    diagnosis = 'SURPRISE_SHIPPING';
    diagnosisExplanation = 'Customer hesitated at checkout due to unexpected delivery or shipping costs.';
    recommendedAction = 'WAIVE_SHIPPING_FEE';
    actionReason = 'Offer free shipping code (FLATSIP) to eliminate delivery friction.';
    discountPercent = 0;
  } else if (askedForCOD) {
    diagnosis = 'NO_COD_AVAILABLE';
    diagnosisExplanation = 'Customer is searching for Cash on Delivery (COD) payment option.';
    recommendedAction = 'ENABLE_COD_PAYMENT';
    actionReason = 'Enable Cash on Delivery option for this customer session.';
    discountPercent = 0;
  } else if (tabSwitchCount >= 2) {
    diagnosis = 'PRICE_SHOPPING';
    diagnosisExplanation = 'Customer switched browser tabs multiple times to compare prices on other apps.';
    recommendedAction = 'MARGIN_BOUNDED_DISCOUNT';
    actionReason = 'Apply policy-bounded 10% discount code (RESCUE10) to beat competing app prices.';
    discountPercent = 10;
    marginSaved = cartTotal * 0.05;
  }

  res.json({
    riskScore,
    riskCategory: riskScore >= 70 ? 'HIGH' : (riskScore >= 40 ? 'MEDIUM' : 'LOW'),
    diagnosis,
    diagnosisExplanation,
    recommendedAction,
    actionReason,
    discountPercent,
    marginSaved: parseFloat(marginSaved.toFixed(2)),
    traiConsentStatus: 'OPTED_IN_DND_COMPLIANT',
    latencyMs: 14
  });
});

app.get('/api/carts', (req, res) => {
  const { status } = req.query;
  if (status) {
    return res.json(carts.filter(c => c.status === status));
  }
  res.json(carts);
});

app.post('/api/carts/abandon', (req, res) => {
  const { customerName, customerEmail, customerPhone, items, totalValue, hasPaymentError, reachedShippingStep, askedForCOD, tabSwitchCount } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Cart must contain at least one item.' });
  }

  let riskScore = 20;
  let diagnosis = 'LOW_RISK_HIGH_INTENT';
  let recommendedAction = 'DO_NOTHING';
  let actionReason = 'Do not intervene or offer discount! Customer will convert naturally without eroding margin.';
  let marginSaved = (parseFloat(totalValue) || 100.0) * 0.15;

  if (hasPaymentError) {
    riskScore = 85;
    diagnosis = 'PAYMENT_FAILURE';
    recommendedAction = 'OFFER_UPI_RETRY_LINK';
    actionReason = 'Payment timeout detected on UPI gateway. Do not discount (payment issue, not price issue).';
  } else if (reachedShippingStep) {
    riskScore = 72;
    diagnosis = 'SURPRISE_SHIPPING';
    recommendedAction = 'WAIVE_SHIPPING_FEE';
    actionReason = 'Free shipping promo code FLATSIP applied.';
  } else if (askedForCOD) {
    riskScore = 65;
    diagnosis = 'NO_COD_AVAILABLE';
    recommendedAction = 'ENABLE_COD_PAYMENT';
    actionReason = 'Enable Cash on Delivery option for this customer session.';
  } else if (tabSwitchCount > 1) {
    riskScore = 68;
    diagnosis = 'PRICE_SHOPPING';
    recommendedAction = 'MARGIN_BOUNDED_DISCOUNT';
    actionReason = 'Tab switching detected. Apply 10% coupon (RESCUE10).';
    marginSaved = (parseFloat(totalValue) || 100.0) * 0.05;
  }

  const newCart = {
    id: `cart-${Date.now()}`,
    customerName: customerName || 'Guest Customer',
    customerEmail: customerEmail || 'guest@example.com',
    customerPhone: customerPhone || '+91 98765 00000',
    items,
    totalValue: parseFloat(totalValue) || items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0),
    status: 'abandoned',
    abandonedAt: new Date().toISOString(),
    lastNotificationSent: recommendedAction,
    discountApplied: 0,
    riskScore,
    diagnosis,
    recommendedAction,
    actionReason,
    marginSaved: parseFloat(marginSaved.toFixed(2))
  };

  carts.unshift(newCart);
  stats.totalCartsAbandoned += 1;
  stats.marginSaved += newCart.marginSaved;

  res.status(201).json({
    message: 'Cart evaluated by AI Remediation Agent and recorded!',
    cart: newCart
  });
});

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

app.get('/api/stats', (req, res) => {
  const activeAbandonedCount = carts.filter(c => c.status === 'abandoned').length;
  const totalRescuedCount = carts.filter(c => c.status === 'rescued').length;
  const recoveryRate = stats.totalCartsAbandoned > 0 
    ? ((stats.totalCartsRescued / stats.totalCartsAbandoned) * 100).toFixed(1) 
    : '0.0';

  res.json({
    totalCartsAbandoned: stats.totalCartsAbandoned,
    totalCartsRescued: stats.totalCartsRescued,
    totalRevenueRescued: stats.totalRevenueRescued.toLocaleString('en-IN'),
    marginSaved: stats.marginSaved.toLocaleString('en-IN'),
    activeAbandonedCount,
    totalRescuedCount,
    recoveryRate: `${recoveryRate}%`,
    holdoutControlGroupRecoveryRate: stats.holdoutControlGroupRecoveryRate,
    aiIncrementalLift: stats.aiIncrementalLift,
    activeCampaigns: stats.activeCampaigns
  });
});

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
  console.log(`✅ Cart Rescue Track 2 AI Express Backend is running on http://localhost:${PORT}`);
});
