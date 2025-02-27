import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProductDetail.css';
import Button from '../components/Button';
import api from '../api/axiosInstance';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/items/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al obtener el producto:', err);
        setError('Producto no encontrado');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Cargando producto...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="product-detail">
      <img
        className="product-detail__image"
        src={product.image}
        alt={product.name}
      />
      <div className="product-detail__info">
        <h2 className="product-detail__name">{product.name}</h2>
        <p className="product-detail__price">${product.price}</p>
        <p className="product-detail__description">{product.description}</p>
        <Button
          onClick={() => {
            addToCart(product);
            navigate('/cart');
          }}
        >
          Añadir al carrito
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
