import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to load products', err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  function handleAddToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((c) => c.productId === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ productId, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  }

  if (loading) return <p>Loading products...</p>;

  return (
    <section>
      <h1>Products</h1>
      <div className="product-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            {p.image && <img src={p.image} alt={p.name} />}
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>${p.price}</p>
            <button type="button" onClick={() => handleAddToCart(p._id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductsPage;

