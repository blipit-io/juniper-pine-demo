export async function charge(order) {
  const response = await fetch("https://payments.juniper-demo.example/charge", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: order.total, currency: "USD" }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Payment gateway returned ${response.status}`);
  return response.json();
}
