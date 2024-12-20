'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);

      const uniqueCategories = ['All', ...new Set(data.map((item) => item.category))];
      setCategories(uniqueCategories);
    };

    fetchProducts();
  }, []);

  const filterByCategory = (category) => {
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
    setDropdownOpen(false); // Close the dropdown after selecting a category
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const goToCart = () => {
    router.push('/cart');
  };

  const goToAbout = () => {
    router.push('/about');
  };

  const goToContact = () => {
    router.push('/contact');
  };

  return (
    <div style={pageStyles}>
      {/* Navbar */}
      <div style={navbarStyles}>
        <div style={logoSectionStyles} onClick={() => router.push('/')}>
          <img src="/logo.png" alt="Amazon Logo" style={logoStyles} />
        </div>
        <div style={menuStyles}>
          {/* Dropdown for Categories */}
          <div style={dropdownStyles}>
            <button style={dropdownButtonStyles} onClick={toggleDropdown}>
              Categories
            </button>
            {dropdownOpen && (
              <div style={dropdownContentStyles}>
                {categories.map((category) => (
                  <button
                    key={category}
                    style={dropdownItemStyles}
                    onClick={() => filterByCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* About and Contact Links */}
          <button style={navButtonStyles} onClick={goToAbout}>
            About
          </button>
          <button style={navButtonStyles} onClick={goToContact}>
            Contact
          </button>
        </div>
        <div style={searchBarStyles}>
          <input
            type="text"
            placeholder="Search Amazon"
            style={searchInputStyles}
          />
          <button style={searchButtonStyles}>Search</button>
        </div>
        <div style={userSectionStyles}>
          <button style={navButtonStyles}>Hello, Sign in</button>
          <button style={navButtonStyles} onClick={goToCart}>
            Cart ({cart.length})
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <div style={categoriesSectionStyles}>
        {categories.map((category) => (
          <button
            key={category}
            style={categoryButtonStyles}
            onClick={() => filterByCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Dashboard Content */}
      <div style={dashboardContentStyles}>
        <h1>Products</h1>
        <div style={productListStyles}>
          {filteredProducts.map((product) => (
            <div key={product.id} style={productItemStyles}>
              <img src={product.image} alt={product.title} style={productImageStyles} />
              <div style={productDetailsStyles}>
                <h3>{product.title}</h3>
                <p>${product.price.toFixed(2)}</p>
                <button onClick={() => addToCart(product)} style={addToCartButtonStyles}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={footerStyles}>
        <p>&copy; 2024 Amazon Clone, All Rights Reserved.</p>
      </div>
    </div>
  );
};

// Styles
const pageStyles = { paddingTop: '120px', backgroundColor: '#F3F3F3' };
const navbarStyles = {
  position: 'fixed',
  top: 0,
  width: '100%',
  backgroundColor: '#232F3E',
  color: '#FFFFFF',
  display: 'flex',
  alignItems: 'center',
  padding: '10px 20px',
  zIndex: 1000,
};
const logoSectionStyles = { cursor: 'pointer' };
const logoStyles = { height: '40px' };

const menuStyles = { display: 'flex', gap: '15px', marginLeft: '20px' };
const dropdownStyles = { position: 'relative' };
const dropdownButtonStyles = {
  backgroundColor: 'transparent',
  color: '#FFFFFF',
  padding: '10px',
  border: 'none',
  cursor: 'pointer',
};
const dropdownContentStyles = {
  position: 'absolute',
  top: '40px',
  left: 0,
  backgroundColor: '#FFFFFF',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  zIndex: 10,
  borderRadius: '5px',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
};
const dropdownItemStyles = {
  backgroundColor: '#000000',
  color: '#FFFFFF',
  padding: '8px 12px',
  cursor: 'pointer',
  textAlign: 'left',
  border: 'none',
};

const searchBarStyles = { display: 'flex', flex: 1, margin: '0 20px' };
const searchInputStyles = { flex: 1, padding: '10px', borderRadius: '5px 0 0 5px', border: 'none' };
const searchButtonStyles = {
  padding: '10px 20px',
  backgroundColor: '#FEBE10',
  color: '#232F3E',
  border: 'none',
  borderRadius: '0 5px 5px 0',
  cursor: 'pointer',
};

const userSectionStyles = { display: 'flex', gap: '15px' };
const navButtonStyles = {
  backgroundColor: 'transparent',
  color: '#FFFFFF',
  padding: '10px',
  border: 'none',
  cursor: 'pointer',
};

const categoriesSectionStyles = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '15px',
  padding: '20px',
  backgroundColor: '#FFFFFF',
};
const categoryButtonStyles = {
  backgroundColor: '#FEBE10',
  color: '#232F3E',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const dashboardContentStyles = { padding: '20px' };
const productListStyles = { display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' };
const productItemStyles = {
  backgroundColor: '#000000',
  padding: '15px',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  width: '250px',
  textAlign: 'center',
};
const productImageStyles = { width: '100%', height: '200px', objectFit: 'cover', marginBottom: '10px' };
const productDetailsStyles = { marginBottom: '10px' };
const addToCartButtonStyles = {
  backgroundColor: '#28a745',
  color: '#FFFFFF',
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const footerStyles = { backgroundColor: '#232F3E', color: '#FFFFFF', padding: '20px', textAlign: 'center' };

export default DashboardPage;