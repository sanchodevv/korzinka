import React, { useState } from "react";
import "./index.css";

function App() {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const products = [
    { 
      id: 1,
      img: "https://i1-e.pinimg.com/1200x/f4/24/2c/f4242c233b261eae78a9a8b6934db13c.jpg",
      title: "Coca Cola 1L", 
      description: "Coca Cola is a carbonated soft drink that is enjoyed by millions of people around the world",
      price: 1500
    },
    {
      id: 2,
      img: "https://i1-e.pinimg.com/1200x/13/8d/21/138d2114d0b48b1370ce986c6a375335.jpg",
      title: "Coca Cola 2L", 
      description: "Coca Cola is a carbonated soft drink that is enjoyed by millions of people around the world.",
      price: 2000
    },
    {
      id: 3,
      img: "https://i1-e.pinimg.com/1200x/3f/4f/c3/3f4fc3ce0a123de1167ac3b3802cb5e2.jpg",
      title: "Coca Cola 0.5L", 
      description: "Coca Cola is a carbonated soft drink that is enjoyed by millions of people around the world.",
      price: 800
    },
    {
      id: 4,
      img: "https://i1-e.pinimg.com/1200x/42/bc/38/42bc3848c205fdeddb544e443cfe7941.jpg",
      title: "Coca Cola 0.33L", 
      description: "Coca Cola is a carbonated soft drink that is enjoyed by millions of people around the world.",
      price: 500
    },
    {
      id: 5,
      img: "https://i1-e.pinimg.com/1200x/34/91/f6/3491f6b86dba1e9c85465a8856fb329d.jpg",
      title: "Coca Cola 0.33L", 
      description: "Coca Cola is a carbonated soft drink that is enjoyed by millions of people around the world.",
      price: 500
    }
  
  ];

  // ADD
  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // +
  const increase = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // -
  const decrease = (id)  => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // REMOVE
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="container">
      <h1>Coca Cola</h1>
      <p>O'z ichimlikingizni bizdan oling</p>
      <div className="cards">
      {products.map((product) => (  
          <div key={product.id} className="card">
            <img src={product.img} alt="" />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <div className="ha">
              <p>{product.price}$</p>
              <button onClick={() => addToCart(product)}>
                + Add to Cart
              </button>
            </div>
          </div>
      ))}
      </div>

      {/* CART BUTTON */}
      <div className="cart-badge">
        <button className="cart-btn" onClick={() => setIsOpen(true)}>
          🛒
        </button>
        {totalItems > 0 && (
          <span className="badge-count">{totalItems}</span>
        )}
      </div>

       


      

      {/* SIDEBAR */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setIsOpen(false)}>
          ✖
        </button>

        <h2>Korzina</h2>

        {cart.length === 0 && <p>Bo‘sh</p>}

        {cart.map((item) => (
          <div key={item.id} className="cart-item">
              <div className="sb">
                 <img src={item.img} alt="" />
            <div>
              <h4>{item.title}</h4>
            <p>{item.price}$</p> </div> 
              </div>

            <div className="gh">
              <button onClick={() => decrease(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increase(item.id)}>+</button>
            </div>
            <button className="delete" onClick={() => removeItem(item.id)}>
              🗑️
            </button>

          </div>
        ))}

        <h3>Total: {total}$</h3>
      </div>

      <footer className="footer">
        <p>© 2026 Korzinka. Kichik va sodda Jamshid uchun yasalgan korzinka.</p>
      </footer>
    </div>
  );
}

export default App;