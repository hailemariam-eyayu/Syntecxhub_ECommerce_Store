import { useEffect, useState } from 'react';

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function loadOrders() {
      const res = await fetch('http://localhost:5000/api/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setOrders(data);
    }

    if (token) {
      loadOrders();
    }
  }, [token]);

  return (
    <section>
      <h1>Admin - Orders</h1>
      {!token && <p>Please login as admin to view orders.</p>}
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            {order.user?.name || 'User'} - {order.orderItems.length} items - ${order.totalPrice}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default AdminOrdersPage;

