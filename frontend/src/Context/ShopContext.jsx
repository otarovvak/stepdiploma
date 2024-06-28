import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [all_products, setAll_products] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched products:", data);
        setAll_products(data);
      })
      .catch((error) => console.error("Error fetching products:", error));

    if (localStorage.getItem("auth-token")) {
      fetchCartData();
    }
  }, []);

  const fetchCartData = () => {
    fetch("http://localhost:4000/getcart", {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched cart items:", data);
        const cartItemsArray = data.map((item) => ({
          _id: item.productId,
          productId: item.productId,
          quantity: item.quantity,
          color: item.color,
        }));
        setCartItems(cartItemsArray);
      })
      .catch((error) => console.error("Error fetching cart:", error));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item of cartItems) {
      if (item.quantity > 0) {
        const itemInfo = all_products.find(
          (product) => product._id === item.productId
        );
        if (itemInfo) {
          totalAmount += itemInfo.price * item.quantity;
        }
      }
    }
    return totalAmount;
  };

  const addToCart = (productId, selectedColor) => {
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, selectedColor }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Added to cart:", data);
          fetchCartData();
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
        });
    }
  };

  const removeFromCart = (productId, color) => {
    if (localStorage.getItem("auth-token")) {
      console.log("Removing item ID:", productId, "Color:", color);
      fetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, color }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Removed from cart:", data.message);
          fetchCartData();
        })
        .catch((error) => console.error("Error removing from cart:", error));
    }
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item].quantity > 0) {
        totalItem += cartItems[item].quantity;
      }
    }
    return totalItem;
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
