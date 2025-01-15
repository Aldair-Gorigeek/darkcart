import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import ProductList from '../components/ProductList';
import Loader from '../components/Loader';
import Message from '../components/Message'; // Importamos el componente Message
import SearchBar from '../components/SearchBar'; // Importamos el componente SearchBar
import products from '../data/products';

const Home = ({ addToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simular tiempo de carga
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilteredProducts(products);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  // Filtrar productos por búsqueda y categoría
  useEffect(() => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm]);

  if (loading) {
    return <Loader />;
  }

  // Dividir productos por categoría después de la búsqueda
  const destacados = filteredProducts.filter((product) => product.category === 'destacados');
  const nuevos = filteredProducts.filter((product) => product.category === 'nuevos');
  const masVendidos = filteredProducts.filter((product) => product.category === 'mas-vendidos');
  const ofertas = filteredProducts.filter((product) => product.category === 'ofertas');

  return (
    <main className="home">
      <section className="home__hero">
        <h1 className="home__title">Bienvenido a D@rkCart</h1>
        <p className="home__subtitle">
          Explora nuestra tienda y descubre productos increíbles.
        </p>
      </section>
      {/* Barra de búsqueda */}
      <section className="home__search">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </section>
      {/* Sección de Productos Destacados */}
      <section className="home__products home__products--destacados">
        <h2 className="home__section-title">Productos Destacados</h2>
        {destacados.length > 0 ? (
          <ProductList products={destacados} addToCart={addToCart} />
        ) : (
          <Message text="No hay productos destacados disponibles." />
        )}
      </section>
      {/* Sección de Productos Nuevos */}
      <section className="home__products home__products--nuevos">
        <h2 className="home__section-title">Productos Nuevos</h2>
        {nuevos.length > 0 ? (
          <ProductList products={nuevos} addToCart={addToCart} />
        ) : (
          <Message text="No hay productos nuevos disponibles." />
        )}
      </section>
      {/* Sección de Los Más Vendidos */}
      <section className="home__products home__products--mas-vendidos">
        <h2 className="home__section-title">Los Más Vendidos</h2>
        {masVendidos.length > 0 ? (
          <ProductList products={masVendidos} addToCart={addToCart} />
        ) : (
          <Message text="No hay productos más vendidos disponibles." />
        )}
      </section>
      {/* Sección de Ofertas Especiales */}
      <section className="home__products home__products--ofertas">
        <h2 className="home__section-title">Ofertas Especiales</h2>
        {ofertas.length > 0 ? (
          <ProductList products={ofertas} addToCart={addToCart} />
        ) : (
          <Message text="No hay ofertas especiales disponibles." />
        )}
      </section>
    </main>
  );
};

export default Home;
