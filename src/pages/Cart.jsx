import React from 'react';
import '../styles/Cart.css';
import Button from '../components/Button';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="cart">
      <h2 className="cart__title">Tu Carrito</h2>
      {cartItems.length === 0 ? (
        <p className="cart__empty">El carrito está vacío.</p>
      ) : (
        <>
          <ul className="cart__list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart__item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart__item-image"
                />
                <div className="cart__item-details">
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                  <div className="cart__quantity">
                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          updateQuantity(item.id, item.quantity - 1);
                        } else {
                          const confirmDelete = window.confirm(
                            `¿Deseas eliminar "${item.name}" del carrito?`
                          );
                          if (confirmDelete) {
                            removeFromCart(item.id);
                          }
                        }
                      }}
                      className="cart__quantity-button"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="cart__quantity-button"
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <Button
                      onClick={() => {
                        const confirmDelete = window.confirm(
                          `¿Estás seguro de que deseas eliminar "${item.name}" del carrito?`
                        );
                        if (confirmDelete) {
                          removeFromCart(item.id);
                        }
                      }}
                    >
                      Eliminar
                    </Button>
                  </div>  
                </div>
              </li>
            ))}
          </ul>
          <div className="cart__total">
            <h3>Total: ${total.toFixed(2)}</h3>
          </div>
        </>
      )}
    </main>
  );
};

export default Cart;
