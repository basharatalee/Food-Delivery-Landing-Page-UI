import React from "react";
import "./Header.css";

export default function Header({ cartCount = 0, openCart }) {
  return (
    <header className="site-header">
      <div className="site-brand">ChopNow 🍔</div>
      <div className="cart-button-wrap">
        <button className="cart-btn" onClick={openCart} aria-label="Open cart">
          🛒
          <span className="cart-count">{cartCount}</span>
        </button>
      </div>
    </header>
  );
}
