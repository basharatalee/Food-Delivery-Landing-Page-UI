import React from "react";

function Hero() {
  return (
    <section className="hero">
      <h2 style={{position:"absolute",zIndex:"5",top:"300px",fontSize:"50px",color:"aliceblue",left:"21%" }}>Delicious Food Delivered To You</h2>
      <p style={{position:"absolute",zIndex:"5",top:"370px",fontSize:"30px",color:"yellow",left:"23%" }}>Choose your favorite meal and get it fast at your door.</p>
      <img style={{minWidth:"100vw",objectFit:"cover",height:"450px",filter:"brightness(80%)"}}
        src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
        alt="Food Delivery"
      />
    </section>
  );
}

export default Hero;
