import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import useCart from './hooks/useCart'; // Importar el custom hook
import ProductDetail from './pages/ProductDetail'; // Importar el componente de detalle
import About from './pages/About'; 
import Contact from './pages/Contact'; 

function App() {
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart(); // Usar el hook

  return (
    <Router>
      <div className="App">
        <Header cartCount={cartItems.length} /> {/* Pasamos el contador al Header */}
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity} 
              />
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetail addToCart={addToCart} />}
          />
          <Route path="/about" element={<About />} /> 
          <Route path="/contact" element={<Contact />} /> 
          <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
