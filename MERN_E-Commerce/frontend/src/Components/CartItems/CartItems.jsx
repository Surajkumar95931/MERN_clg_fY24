import React, { useContext, useEffect } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assests/cart_cross_icon.png";

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
    useContext(ShopContext);

  useEffect(() => {
    const loadRazorpayScript = async () => {
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
          console.log("Razorpay SDK loaded successfully");
        };
        document.body.appendChild(script);
      }
    };

    loadRazorpayScript();

    return () => {
      // Clean up function to remove the script if component unmounts
      const script = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );
      if (script) {
        script.remove();
      }
    };
  }, []);

  const handlePayment = () => {
    if (window.Razorpay) {
      const options = {
        key: "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", 
        amount: getTotalCartAmount() * 100, // Amount in paise
        currency: "INR",
        name: "Your Company Name",
        description: "Payment for Products",
        image: "https://your-company-logo.png",
        handler: function (response) {
          alert(response.razorpay_payment_id);
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
        },
        notes: {
          address: "Customer Address",
        },
        theme: {
          color: "#F37254",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      console.error("Razorpay SDK not loaded");
    }
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Titles</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} className="carticon-product-icon" alt="" />
                <p>{e.name}</p>
                <p>₹{e.new_price}</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>₹{e.new_price * cartItems[e.id]}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>SubTotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping fee</p>
              <p>free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Totals</h3>
              <h3>₹{getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>if you have a promocode enter here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promocode" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
