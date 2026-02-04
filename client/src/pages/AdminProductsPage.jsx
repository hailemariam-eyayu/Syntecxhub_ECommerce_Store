import { useEffect, useState } from 'react';

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const token = localStorage.getItem('token');

  async function fetchProducts() {
    const res = await fetch('http://localhost:5000/api/products');
    const data = await res.json();
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description: 'Sample description',
        price: Number(price),
        countInStock: 10,
      }),
    });
    if (res.ok) {
      setName('');
      setPrice('');
      fetchProducts();
    } else {
      const data = await res.json();
      alert(data.message || 'Failed to create product (are you admin?)');
    }
  }

  return (
    <section>
      <h1>Admin - Products</h1>
      <form onSubmit={handleCreate} className="form">
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} - ${p.price}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default AdminProductsPage;

