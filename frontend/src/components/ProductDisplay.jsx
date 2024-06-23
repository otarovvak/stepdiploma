import { useContext, useState } from "react";
import { FaStar, FaCheck } from "react-icons/fa";
import { ShopContext } from "../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  const [selectedColor, setSelectedColor] = useState(null);
  const [error, setError] = useState("");

  const renderStars = () => {
    let stars = [];
    for (let i = 0; i < 10; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i < product.rating ? "text-yellow-500" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    setError("");
  };

  const handleAddToCart = () => {
    if (!selectedColor) {
      setError("Please select a color before adding to cart.");
      return;
    }
    addToCart(product._id, selectedColor);
  };

  return (
    <section className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col gap-6 xl:flex-row">
        <div className="flex justify-center xl:flex-1">
          <img
            src={product.api_featured_image}
            alt={product.name}
            className="rounded-lg"
          />
        </div>
        <div className="flex-col flex xl:flex-[1.7]">
          <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
          <h3 className="text-xl font-semibold text-green-600 mb-4">
            ${product.price}
          </h3>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="flex gap-x-2 mb-4">{renderStars()}</div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">Select Color:</h4>
            <div className="flex flex-wrap gap-3 mb-3">
              {product.product_colors &&
                product.product_colors.map((color, index) => (
                  <div
                    key={index}
                    className={`relative h-10 w-10 cursor-pointer rounded-full ${
                      selectedColor?.hex_value === color.hex_value
                        ? "ring-4 ring-blue-500"
                        : "ring-2 ring-gray-300"
                    }`}
                    style={{ backgroundColor: color.hex_value }}
                    onClick={() => handleColorClick(color)}
                  ></div>
                ))}
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4">
              <button
                onClick={handleAddToCart}
                className="btn_secondary_rounded"
              >
                Add to cart
              </button>
            </div>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Category:</span>{" "}
              {product.category}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Tags:</span>
              {product.tag_list && product.tag_list.length > 0 ? (
                product.tag_list.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 px-2 py-1 rounded-md mr-2"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span>No tags available</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplay;
