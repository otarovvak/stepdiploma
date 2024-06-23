import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { TbTrash } from "react-icons/tb";
import AddressModal from "../components/AddressModal";

const Cart = () => {
  const {
    cartItems,
    all_products,
    removeFromCart,
    getTotalCartAmount,
    clearCart,
  } = useContext(ShopContext);
  const [productsInCart, setProductsInCart] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (cartItems.length > 0 && all_products.length > 0) {
      const items = cartItems
        .map((cartItem) => {
          const product = all_products.find(
            (prod) => prod._id === cartItem.productId
          );
          if (product) {
            return {
              ...cartItem,
              product,
            };
          }
          return null;
        })
        .filter((item) => item !== null);
      setProductsInCart(items);
    } else {
      setProductsInCart([]);
    }
  }, [cartItems, all_products]);

  const handleCheckout = () => {
    setShowModal(true);
  };

  const handlePlaceOrder = (address) => {
    const totalAmount = getTotalCartAmount();
    const orderItems = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      color: item.color,
    }));

    fetch("http://localhost:4000/placeorder", {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: orderItems, totalAmount, address }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Order placed successfully:", data.message);
          setShowModal(false);
          clearCart();
          window.location.reload();
        } else {
          console.error("Error placing order:", data);
        }
      })
      .catch((error) => console.error("Error placing order:", error));
  };

  return (
    <section className="max-w-screen-lg max_padd_container mx-auto p-8 pt-28">
      <div className="grid grid-cols-1 gap-6">
        {productsInCart.length > 0 ? (
          productsInCart.map(({ _id, productId, quantity, product, color }) => (
            <div
              key={_id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
            >
              <div className="flex items-center">
                <img
                  src={product.api_featured_image}
                  alt="Product Image"
                  className="rounded-lg ring-1 ring-gray-300 h-24 w-24"
                />
                <div className="ml-4">
                  <div className="font-medium text-lg">{product.name}</div>
                  <div className="text-gray-500 text-sm">
                    Color: {color.colour_name}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-lg">${product.price}</div>
                <div className="text-lg">{quantity}</div>
                <div className="text-lg">${product.price * quantity}</div>
                <TbTrash
                  className="cursor-pointer text-xl text-red-500"
                  onClick={() => removeFromCart(productId, color)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">Cart is empty</div>
        )}
      </div>

      {productsInCart.length > 0 && (
        <div className="flex items-center justify-between p-4 mt-6 bg-white rounded-lg shadow-md">
          <div className="text-lg font-bold">
            Total: ${getTotalCartAmount()}
          </div>
          <button className="btn_secondary_rounded" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}

      {showModal && (
        <AddressModal
          onClose={() => setShowModal(false)}
          onPlaceOrder={handlePlaceOrder}
        />
      )}
    </section>
  );
};

export default Cart;
