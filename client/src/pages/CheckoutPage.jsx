import { useEffect, useState } from 'react';

function CheckoutPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cart') || '[]');
    setItems(saved);
  }, []);

  async function handlePlaceOrder() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to place an order');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Order placed! ID: ${data._id}`);
        localStorage.removeItem('cart');
      } else {
        alert(data.message || 'Failed to place order');
      }
    } catch (err) {
      alert('Checkout error');
    }
  }

  return (
    <section>
      <h1>Checkout</h1>
      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.productId}>
                Product: {item.productId} - Qty: {item.qty}
              </li>
            ))}
          </ul>
          <button type="button" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </>
      )}
    </section>
  );
}

export default CheckoutPage;


