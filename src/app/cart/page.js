'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
    calculateTotal(storedCart);
  }, []);

  const calculateTotal = (cartItems) => {
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);
    setTotal(totalAmount);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    calculateTotal(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <div style={styles.logo} onClick={() => router.push('/dashboard')}>Amazon Clone</div>
        <button style={styles.navButton} onClick={() => router.push('/dashboard')}>
          Back to Dashboard
        </button>
      </div>

      {/* Cart Content */}
      <div style={styles.cartContainer}>
        <h1>Your Cart</h1>
        <div style={styles.cartItems}>
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} style={styles.cartItem}>
                <Image src={item.image} alt={item.title} style={styles.cartItemImage} />
                <div style={styles.cartItemDetails}>
                  <h2>{item.title}</h2>
                  <p>Price: ${item.price}</p>
                  <button onClick={() => removeItem(item.id)} style={styles.removeButton}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        {/* Footer with Total and Checkout Button */}
        <footer style={styles.footer}>
          <h3>Total: ${total.toFixed(2)}</h3>
          {cart.length > 0 ? (
            <button
              style={styles.payButton}
              onClick={() => router.push('/checkout')}
            >
              Proceed to Checkout
            </button>
          ) : (
            <p>Your cart is empty. Add some items to proceed.</p>
          )}
        </footer>
      </div>
    </div>
  );
};

const styles = {
  page: { padding: '20px', backgroundColor: '#FFFFFF', paddingTop: '80px', color: '#000' },
  navbar: { backgroundColor: '#3A3A3A', color: '#FFFFFF', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' },
  logo: { fontSize: '24px', fontWeight: 'bold', color: '#FF5733' },
  navButton: { backgroundColor: '#FF5733', color: '#FFFFFF', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  cartContainer: { marginTop: '40px', padding: '20px', backgroundColor: '#F5F5F5', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' },
  cartItems: { display: 'flex', flexDirection: 'column', gap: '15px' },
  cartItem: { display: 'flex', backgroundColor: '#FFFFFF', padding: '15px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' },
  cartItemImage: { width: '100px', height: '100px', objectFit: 'cover', borderRadius: '10px' },
  cartItemDetails: { marginLeft: '20px', flex: 1 },
  removeButton: { backgroundColor: '#FF0000', color: '#FFFFFF', padding: '5px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  footer: { marginTop: '20px', textAlign: 'center' },
  payButton: { padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' },
};

export default CartPage;
