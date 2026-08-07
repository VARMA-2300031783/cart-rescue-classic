// Simple English AI Recovery Message Generator Service

export function generateRescueMessage({ customerName, items, totalValue, discountPercent = 10, channel = 'email' }) {
  const name = customerName || 'Valued Customer';
  const itemNames = items && items.length > 0 ? items.map(i => i.name).join(', ') : 'items';
  const code = `RESCUE${discountPercent}`;

  if (channel === 'sms' || channel === 'whatsapp') {
    return {
      channel,
      subject: `Special ${discountPercent}% discount on your cart!`,
      message: `Hello ${name}! You left ${itemNames} ($${totalValue}) in your shopping cart. Finish your order today with code ${code} for ${discountPercent}% off! Click here to return: https://cartrescue.shop/restore?code=${code}`
    };
  }

  return {
    channel: 'email',
    subject: `Did you leave something behind, ${name}? Here is ${discountPercent}% off!`,
    headline: `Your items are saved and waiting for you!`,
    bodyText: `Hi ${name},

We noticed you left ${itemNames} in your shopping cart. 

Because we want you to have a great shopping experience, we have added a special ${discountPercent}% discount just for you!

Use promo code: ${code} at checkout.

Total Cart Value: $${totalValue}
Discount Amount: $${((totalValue * discountPercent) / 100).toFixed(2)}
Final Price: $${(totalValue - (totalValue * discountPercent) / 100).toFixed(2)}

Click the button below to restore your shopping cart in one click.`,
    buttonText: `Restore My Cart & Save ${discountPercent}%`,
    code
  };
}
