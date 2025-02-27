import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import ProductList from '../components/ProductList';
import Loader from '../components/Loader';
import Message from '../components/Message';
import SearchBar from '../components/SearchBar';
import api, { getFacets } from '../api/axiosInstance';

const Home = ({ addToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]); // 🔹 Categorías obtenidas con `facets`
  const [selectedCategory, setSelectedCategory] = useState(''); // 🔹 Filtro de categoría

  // 🔹 Cargar productos desde el backend
  useEffect(() => {
    api.get('/items')
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener los productos:', error);
        setLoading(false);
      });
  }, []);

  // 🔹 Cargar categorías desde el backend con manejo de errores
  useEffect(() => {
    const fetchFacets = async () => {
      try {
        const response = await getFacets();
        console.log("Facets recibidos:", response);

        // ✅ Verificar que `response.categorias` existe y es un array
        if (response && response.categorias && Array.isArray(response.categorias)) {
          setCategories(response.categorias);
        } else {
          setCategories([]); // ✅ Si no es un array, lo inicializamos vacío
        }
      } catch (error) {
        console.error("Error al obtener facets:", error);
        setCategories([]); // ✅ En caso de error, evitar `undefined`
      }
    };

    fetchFacets();
  }, []);

  // 🔹 Filtrar productos por búsqueda y categoría
  useEffect(() => {
    let results = products;

    if (searchTerm) {
      results = results.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      results = results.filter((product) => product.category === selectedCategory);
    }

    setFilteredProducts(results);
  }, [searchTerm, selectedCategory, products]);

  if (loading) {
    return <Loader />;
  }

  // 🔹 Dividir productos por categorías fijas
  const categoriasFijas = [
    { key: 'destacados', titulo: 'Productos Destacados' },
    { key: 'nuevos', titulo: 'Nuevos Lanzamientos' },
    { key: 'mas-vendidos', titulo: 'Los Más Vendidos' },
    { key: 'ofertas', titulo: 'Ofertas Especiales' }
  ];

  return (
    <main className="home">
      <section className="home__hero">
        <h1 className="home__title">Bienvenido a D@rkCart</h1>
        <p className="home__subtitle">Explora nuestra tienda y descubre productos increíbles.</p>
      </section>

      {/* 🔹 Barra de búsqueda */}
      <section className="home__search">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </section>

      {/* 🔹 Filtros de categoría con `facets` */}
      <section className="home__filters">
        <label htmlFor="category">Filtrar por categoría:</label>
        <select id="category" onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Todas</option>
          {categories.map((cat) => (
            <option key={cat.key} value={cat.key}>
              {cat.key} ({cat.doc_count})
            </option>
          ))}
        </select>
      </section>

      {/* 🔹 Secciones Fijas con Productos Filtrados */}
      {categoriasFijas.map(({ key, titulo }) => {
        const productosCategoria = filteredProducts.filter((product) => product.category === key);

        if (productosCategoria.length === 0) return null; // Oculta la sección si no tiene productos

        return (
          <section key={key} className="home__products">
            <h2 className="home__section-title">{titulo}</h2>
            <ProductList products={productosCategoria} addToCart={addToCart} />
          </section>
        );
      })}
    </main>
  );
};

export default Home;
