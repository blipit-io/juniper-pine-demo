export function cartTotal(cart) {
  if (!cart) throw new Error("Cart not found");
  const lines = cart.items.map((item) => item.price * item.quantity);
  const subtotal = lines.reduce((sum, value) => sum + value, 0);
  const discount = (cart.coupon?.percent ?? 0) / 100;
  return Math.round(subtotal * (1 - discount) * 100) / 100;
}

export function shippingFor(cart) {
  return cart.items.length > 3 ? 0 : 4.9;
}
