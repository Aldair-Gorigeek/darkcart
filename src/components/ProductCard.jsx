import React from 'react';
import '../styles/ProductCard.css';
import { Link } from 'react-router-dom';
import Button from '../components/Button';


const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <img
        className="product-card__image"
        src={product.image}
        alt={product.name}
      />
      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__price">${product.price}</p>
      <Link to={`/product/${product.id}`} className="product-card__link">
        Ver Detalle
      </Link>
      <div className="product-card__button">
        <Button
          onClick={() => {
            addToCart(product);
          }}
        >
          Añadir al carrito
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
