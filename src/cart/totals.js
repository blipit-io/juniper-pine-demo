export function cartTotal(cart) {
  const lines = cart.items.map((item) => item.price * item.quantity);
  const subtotal = lines.reduce((sum, value) => sum + value, 0);
  const discount = cart.coupon.percent / 100;
  return Math.round(subtotal * (1 - discount) * 100) / 100;
}

export function shippingFor(cart) {
  return cart.items.length > 3 ? 0 : 4.9;
}
