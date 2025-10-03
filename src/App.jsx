import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import FoodCarousel from "./components/FoodCarousel";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [menu, setMenu] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // load menu (with price) once
  useEffect(() => {
    const data = [
      {
        category: "Pizza",
        items: [
          { id: 1, name: "Margherita", price: 10, img: "https://avatars.mds.yandex.net/i?id=d7c932d6a6953bcd017a6db2a73de0f0e1876b64-4615765-images-thumbs&n=13" },
          { id: 2, name: "Pepperoni", price: 12, img: "https://avatars.mds.yandex.net/i?id=3b93fb13c16a7c13446e33eeaf0ee28ce23686d5-5504208-images-thumbs&n=13" },
          { id: 3, name: "Veggie Pizza", price: 11, img: "https://as1.ftcdn.net/jpg/01/58/36/46/1000_F_158364628_VUZDidwq6xANixJmMVVQ19kOFGU9V8Yq.jpg" },
          { id: 4, name: "BBQ Chicken", price: 14, img: "https://avatars.mds.yandex.net/i?id=46349d5714c348c1c61de514262b467a90e0a37a-5858580-images-thumbs&n=13" },
          { id: 5, name: "Hawaiian", price: 13, img: "https://avatars.mds.yandex.net/i?id=adb56ab27fb34ad767e79aca0193575673d80b38-16281568-images-thumbs&n=13" },
          { id: 6, name: "Four Cheese", price: 15, img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/0d/63/22/cheese-pizza.jpg?w=600&h=400&s=1" },
          { id: 7, name: "Mexican", price: 14, img: "https://avatars.mds.yandex.net/i?id=c637054d868542612de064726dc12c680be936bb-9244694-images-thumbs&n=13" },
        ],
      },
      {
        category: "Burgers",
        items: [
          { id: 11, name: "Cheeseburger", price: 8, img: "https://avatars.mds.yandex.net/i?id=873eaaf7241023eb0f229cc49b1a0ed3da99e7bd-5146554-images-thumbs&n=13" },
          { id: 12, name: "Chicken Burger", price: 9, img: "https://avatars.mds.yandex.net/i?id=a7a5aa5c1ac3936c4237cf77a48b91f59a33fd2e-5151259-images-thumbs&n=13" },
          { id: 13, name: "Veggie Burger", price: 7, img: "https://avatars.mds.yandex.net/i?id=b2c0df581ca63c27269af3354608c1d32a37b71c-5285620-images-thumbs&n=13" },
          { id: 14, name: "Double Patty", price: 11, img: "https://avatars.mds.yandex.net/i?id=ffc3efa77d66b7ca19de319570825afa2ca6de28-9150090-images-thumbs&n=13" },
          { id: 15, name: "Bacon Burger", price: 10, img: "https://avatars.mds.yandex.net/i?id=5501bde81d51c1724cdc8446caf65f445c334055-10717580-images-thumbs&n=13" },
          { id: 16, name: "Mushroom Swiss", price: 12, img: "https://avatars.mds.yandex.net/i?id=093a8f85f3e5d9e86ea08af629d990f8744b388c-5887129-images-thumbs&n=13" },
          { id: 17, name: "Spicy Burger", price: 9, img: "https://avatars.mds.yandex.net/i?id=54cbca9a4cc9ff634dda24053071bf164567bd81-16507896-images-thumbs&n=13" },
        ],
      },
      {
        category: "Drinks",
        items: [
          { id: 21, name: "Coke", price: 3, img: "https://images.coolwallpapers.me/picsup/5819131-coca-cola-wallpapers.jpg" },
          { id: 22, name: "Pepsi", price: 3, img: "https://avatars.mds.yandex.net/i?id=2b0c2c8d7bff83a4a24d8b8ad67b70d66b9611ec-16324058-images-thumbs&n=13" },
          { id: 23, name: "Orange Juice", price: 5, img: "https://avatars.mds.yandex.net/i?id=bccf7e5e70209504979f26d0ab9a018df7467a7e-4613903-images-thumbs&n=13" },
          { id: 24, name: "Lemonade", price: 4, img: "https://avatars.mds.yandex.net/i?id=76341c76870c4919368c7f4312efda87aa1753a5-12492711-images-thumbs&n=13" },
          { id: 25, name: "Iced Tea", price: 4, img: "https://avatars.mds.yandex.net/i?id=f2daeface7a0af41a765ea841c32b0c21a79e004-4369980-images-thumbs&n=13" },
          { id: 26, name: "Mango Shake", price: 6, img: "https://avatars.mds.yandex.net/i?id=05e9f1f2bb15b24ca9b3cffaa7049012f72383da-4501055-images-thumbs&n=13" },
        ],
      },
    ];
    setMenu(data);
  }, []);

  // load cart from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  // save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // cart operations
  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setIsCartOpen(true); // optionally open drawer when adding
  };

  const increaseQty = (id) => {
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p)));
  };
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p))
    );
  };
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };
  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((s, it) => s + it.qty, 0);
  const cartTotal = cart.reduce((s, it) => s + it.qty * it.price, 0);

  return (
    <div className="App">
      <Header cartCount={cartCount} openCart={() => setIsCartOpen(true)} />
      <Hero />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {menu.map((cat, index) => (
        <FoodCarousel
          key={index}
          category={cat.category}
          items={cat.items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))}
          addToCart={addToCart}
        />
      ))}

      <Footer />

      <CartDrawer
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        cartCount={cartCount}
        cartTotal={cartTotal}
      />
    </div>
  );
}

export default App;
