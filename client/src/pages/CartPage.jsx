import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cart') || '[]');
    setItems(saved);
  }, []);

  const totalQty = items.reduce((sum, item) => sum + item.qty, 0);

  function handleCheckout() {
    navigate('/checkout');
  }

  return (
    <section>
      <h1>Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.productId}>
                Product: {item.productId} - Qty: {item.qty}
              </li>
            ))}
          </ul>
          <p>Total items: {totalQty}</p>
          <button type="button" onClick={handleCheckout}>
            Go to Checkout
          </button>
        </>
      )}
    </section>
  );
}

export default CartPage;


