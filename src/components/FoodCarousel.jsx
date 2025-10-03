import React, { useState, useEffect, useRef } from "react";
import "./FoodCarousel.css";

export default function FoodCarousel({ category, items, addToCart }) {
  const [itemsPerView, setItemsPerView] = useState(4);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);
  const innerRef = useRef(null);

  // Drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    function updateItemsPerView() {
      const w = window.innerWidth;
      if (w >= 1200) setItemsPerView(4);
      else if (w >= 900) setItemsPerView(3);
      else if (w >= 700) setItemsPerView(2);
      else setItemsPerView(1);
    }
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardWidth = containerWidth && itemsPerView ? containerWidth / itemsPerView : 200;

  // Drag handlers
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2; // scroll speed
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section className="carousel-section">
      <div className="carousel-header">
        <h3>{category}</h3>
        {/* Removed arrow controls */}
      </div>

      <div
        className="carousel-outer"
        ref={containerRef}
        style={{ overflow: "hidden", overflowX: "auto" }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <div
          className="carousel-inner"
          ref={innerRef}
          style={{
            width: `${cardWidth * items.length}px`,
            display: "flex",
            gap: "12px",
          }}
        >
          {items.map((item) => (
            <div
              className="card"
              key={item.id}
              style={{ flex: `0 0 ${cardWidth}px` }}
            >
              <div className="card-inner">
                <img
                  src={item.img}
                  alt={item.name}
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    height: "150px",
                  }}
                />
                <p className="item-name">{item.name}</p>
                <p className="item-price">${item.price}</p>
                <button className="add-btn" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
