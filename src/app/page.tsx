import React from 'react';

const HomePage = () => {
  const categories = [
    { title: 'Electronics', image: 'https://via.placeholder.com/150' },
    { title: 'Fashion', image: 'https://via.placeholder.com/150' },
    { title: 'Home Appliances', image: 'https://via.placeholder.com/150' },
    { title: 'Books', image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div>
      {/* Navbar */}
      <nav style={navbarStyles}>
        <div style={logoStyles}>Amazon V2</div>
        <input type="text" placeholder="Search products..." style={searchBarStyles} />
        <button style={searchButtonStyles}>Search</button>
      </nav>

      {/* Hero Section */}
      <div style={heroStyles}>
        <img
          src="https://via.placeholder.com/1200x400"
          alt="Hero Banner"
          style={heroImageStyles}
        />
      </div>

      {/* Featured Categories */}
      <div style={categoriesContainerStyles}>
        {categories.map((category, index) => (
          <div key={index} style={categoryCardStyles}>
            <img src={category.image} alt={category.title} style={categoryImageStyles} />
            <h3>{category.title}</h3>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={footerStyles}>
        <p>© 2024 Amazon Clone. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Inline Styles
const navbarStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 20px',
  backgroundColor: '#232f3e',
  color: 'white',
};

const logoStyles = { fontSize: '1.5rem', fontWeight: 'bold' };

const searchBarStyles = {
  flex: 1,
  margin: '0 10px',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const searchButtonStyles = {
  backgroundColor: '#f0c14b',
  border: '1px solid #a88734',
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
};

const heroStyles = { textAlign: 'center', margin: '20px 0' };

const heroImageStyles = {
  width: '100%',
  maxHeight: '400px',
  objectFit: 'cover',
};

const categoriesContainerStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: '20px',
  padding: '20px',
};

const categoryCardStyles = {
  textAlign: 'center',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '10px',
  transition: 'transform 0.2s ease',
  cursor: 'pointer',
};

const categoryImageStyles = {
  width: '100%',
  borderRadius: '8px',
};

const footerStyles = {
  textAlign: 'center',
  padding: '10px',
  backgroundColor: '#f3f3f3',
  marginTop: '20px',
};

export default HomePage;
