import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const Item = ({
  id,
  name,
  image,
  price,
  category,
  product_colors,
  rating,
  tags,
  description,
}) => {
  const renderStars = () => {
    let stars = [];
    for (let i = 0; i < 10; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i < rating ? "text-yellow-500" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  return (
    <Link to={`/product/${id}`} className="block">
      <div className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
        <div className="relative flex justify-center items-center overflow-hidden transition-all duration-300">
          <img src={image} alt={name} className="w-58 h-60 object-cover" />
        </div>
        <div className="p-4">
          <h4 className="text-lg font-semibold my-2 line-clamp-2 text-gray-800">
            {name}
          </h4>
          <div className="text-xl font-bold text-green-600 mb-2">${price}</div>
          <div className="flex mb-2">{renderStars()}</div>
          {category && (
            <div className="text-sm text-gray-500 mb-4">
              Category: {category}
            </div>
          )}
          {product_colors && (
            <div className="flex gap-2 flex-wrap mb-4">
              {product_colors.slice(0, 9).map((color, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: color.hex_value }}
                  className="w-5 h-5 rounded-full border border-gray-300"
                ></div>
              ))}
            </div>
          )}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 px-2 py-1 rounded-md text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Item;
