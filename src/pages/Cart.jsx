import React from 'react';
import '../styles/Cart.css';
import Button from '../components/Button';
import { createOperaciones } from '../api/axiosInstance';

const Cart = ({ cartItems, removeFromCart, updateQuantity, clearCart }) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("No tienes productos en el carrito.");
      return;
    }

    // 🔹 Simulación: Usuario ID 1 (esto debería venir de la sesión del usuario)
    const usuarioId = 1;

    // 🔹 Crear una operación para cada producto en el carrito con su cantidad
    const operaciones = cartItems.map(item => ({
      tipo: "COMPRA",
      itemId: item.id,
      usuarioId,
      fecha: new Date().toISOString(),
      cantidad: item.quantity 
    }));

    try {
      console.log("➡ Enviando operaciones al backend:", JSON.stringify(operaciones, null, 2));

      // 🔹 Enviar todas las operaciones al backend
      const results = await createOperaciones(operaciones);

      console.log(" Respuesta del backend:", results);

      if (results) {
        alert("✅ Compra registrada con éxito.");
        clearCart(); // 🔹 Vaciar el carrito después de comprar
      } else {
        alert("❌ Hubo un error registrando la compra.");
      }
    } catch (error) {
      console.error("❌ Error en la compra:", error);
      alert("❌ Error al procesar la compra.");
    }
  };

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
                <img src={item.image} alt={item.name} className="cart__item-image" />
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
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
          <Button onClick={handleCheckout}>Comprar</Button>
        </>
      )}
    </main>
  );
};

export default Cart;
