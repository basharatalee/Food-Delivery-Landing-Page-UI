import React from "react";


export default function CartDrawer({
  open,
  onClose,
  cart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
  cartCount,
  cartTotal,
}) {
  return (
    <>
      <div className={`cart-backdrop ${open ? "visible" : ""}`} onClick={onClose} />
      <aside className={`cart-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="empty">Your cart is empty</div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((it) => (
                  <div className="cart-item" key={it.id}>
                    <img src={it.img} alt={it.name} />
                    <div className="item-info">
                      <div className="name">{it.name}</div>
                      <div className="price">${it.price.toFixed(2)}</div>
                      <div className="qty-controls">
                        <button onClick={() => decreaseQty(it.id)}>-</button>
                        <span>{it.qty}</span>
                        <button onClick={() => increaseQty(it.id)}>+</button>
                      </div>
                    </div>
                    <button className="remove" onClick={() => removeFromCart(it.id)}>Remove</button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Items:</span>
                  <span>{cartCount}</span>
                </div>
                <div className="summary-row total">
                  <strong>Total:</strong>
                  <strong>${cartTotal.toFixed(2)}</strong>
                </div>
                <div className="summary-actions">
                  <button className="clear" onClick={clearCart}>Clear Cart</button>
                  <button className="checkout" onClick={() => alert("Proceed to checkout (demo)")}>Checkout</button>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
