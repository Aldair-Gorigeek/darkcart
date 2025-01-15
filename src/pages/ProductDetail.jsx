import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProductDetail.css';
import products from '../data/products.jsx'; // Importar productos simulados
import Button from '../components/Button';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <p>Producto no encontrado</p>;
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
