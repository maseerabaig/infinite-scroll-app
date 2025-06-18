import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  const loadProducts = useCallback(() => {
    if (!hasMore || loading) return;

    setLoading(true);
    axios
      .get(`https://dummyjson.com/products?limit=10&skip=${skip}`)
      .then((res) => {
        const newProducts = res.data.products;
        setProducts((prev) => [...prev, ...newProducts]);
        setHasMore(res.data.total > skip + 10);
        setSkip((prev) => prev + 10);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [skip, hasMore, loading]);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) loadProducts();
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loadProducts]);

  return (
    <div className="product-container">
      {products.map((prod) => (
        <div key={prod.id} className="product-card">
          <img src={prod.thumbnail} alt={prod.title} />
          <h3>{prod.title}</h3>
          <p>₹{prod.price}</p>
        </div>
      ))}
      {loading && <p className="loading">Loading...</p>}
      <div ref={loaderRef} style={{ height: '20px' }} />
    </div>
  );
};

export default ProductList;
