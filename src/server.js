import { createServer } from "node:http";
import { cartTotal, shippingFor } from "./cart/totals.js";
import { charge } from "./payments/charge.js";

const carts = new Map([
  ["c-100", { items: [{ sku: "mug", price: 18, quantity: 2 }], coupon: { percent: 10 } }],
  ["c-101", { items: [{ sku: "candle", price: 24, quantity: 1 }] }],
]);

createServer(async (req, res) => {
  const id = new URL(req.url, "http://localhost").searchParams.get("cart") ?? "c-100";
  try {
    const cart = carts.get(id);
    const total = cartTotal(cart) + shippingFor(cart);
    const receipt = await charge({ total });
    res.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify(receipt));
  } catch (error) {
    res.writeHead(500).end("Checkout failed");
    throw error;
  }
}).listen(process.env.PORT ?? 3000);
