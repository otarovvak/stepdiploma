import { useState, useEffect } from "react";
import { SketchPicker } from "react-color";

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    brand: "",
    price: "",
    price_sign: "$",
    currency: "USD",
    description: "",
    rating: "1",
    category: "",
    product_type: "",
    tag_list: [],
    product_colors: [],
    product_api_url: "",
    api_featured_image: "",
  });
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [color, setColor] = useState("#fff");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/allproducts");
        const data = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.map((product) => product.category))
        );
        const uniqueTags = Array.from(
          new Set(data.flatMap((product) => product.tag_list))
        );
        setCategories(uniqueCategories);
        setTags(uniqueTags);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const handleAddColor = () => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      product_colors: [...prevDetails.product_colors, color],
    }));
    setColor("#fff");
  };

  const Add_Product = async () => {
    try {
      const addProductResponse = await fetch(
        "http://localhost:4000/addproduct",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productDetails),
        }
      );

      const addProductData = await addProductResponse.json();
      if (addProductData.success) {
        alert("Product Added");
        setProductDetails({
          name: "",
          brand: "",
          price: "",
          price_sign: "$",
          currency: "USD",
          description: "",
          rating: "1",
          category: "",
          product_type: "",
          tag_list: [],
          product_colors: [],
          product_api_url: "",
          api_featured_image: "",
        });
        setError("");
      } else {
        setError(addProductData.errors || "Upload Failed");
      }
    } catch (error) {
      console.error("Error adding product:", error.message);
      setError("Upload Failed: " + error.message);
    }
  };

  return (
    <div className="p-8 bg-white w-full rounded-sm mt-5 lg:ml-5">
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Product Title:</h4>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here.."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
        />
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Brand:</h4>
        <input
          value={productDetails.brand}
          onChange={changeHandler}
          type="text"
          name="brand"
          placeholder="Type here.."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
        />
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Price:</h4>
        <input
          value={productDetails.price}
          onChange={changeHandler}
          type="text"
          name="price"
          placeholder="Type here.."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
        />
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Price Sign:</h4>
        <input
          value={productDetails.price_sign}
          onChange={changeHandler}
          type="text"
          name="price_sign"
          placeholder="Type here.."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
        />
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Currency:</h4>
        <select
          value={productDetails.currency}
          onChange={changeHandler}
          name="currency"
          className="bg-primary ring-1 ring-slate-900/20 medium-16 rounded-sm outline-none"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Description:</h4>
        <textarea
          value={productDetails.description}
          onChange={changeHandler}
          name="description"
          placeholder="Type here.."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
        />
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Rating:</h4>
        <input
          type="number"
          name="rating"
          value={productDetails.rating}
          onChange={changeHandler}
          min="1"
          max="10"
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
        />
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Category:</h4>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="bg-primary ring-1 ring-slate-900/20 medium-16 rounded-sm outline-none"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Product Type:</h4>
        <input
          value={productDetails.product_type}
          onChange={changeHandler}
          type="text"
          name="product_type"
          placeholder="Type here.."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
        />
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Tags:</h4>
        <select
          multiple
          value={productDetails.tag_list}
          onChange={(e) =>
            setProductDetails({
              ...productDetails,
              tag_list: Array.from(
                e.target.selectedOptions,
                (option) => option.value
              ),
            })
          }
          name="tag_list"
          className="bg-primary ring-1 ring-slate-900/20 medium-16 rounded-sm outline-none"
        >
          {tags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Product API URL:</h4>
        <input
          value={productDetails.product_api_url}
          onChange={changeHandler}
          type="text"
          name="product_api_url"
          placeholder="Type here.."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
        />
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2">API Featured Image:</h4>
        <input
          value={productDetails.api_featured_image}
          onChange={changeHandler}
          type="text"
          name="api_featured_image"
          placeholder="Type here.."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
        />
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Colors:</h4>
        <SketchPicker
          color={color}
          onChange={(updatedColor) => setColor(updatedColor.hex)}
        />
        <button
          type="button"
          onClick={handleAddColor}
          className="btn_secondary_rounded"
        >
          Add Color
        </button>
      </div>
      {productDetails.product_colors.length > 0 && (
        <div className="mb-3">
          <h4 className="bold-18 pb-2">Added Colors:</h4>
          <div className="flex flex-wrap">
            {productDetails.product_colors.map((color, index) => (
              <div
                key={index}
                className="w-8 h-8 m-1"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="button"
        onClick={Add_Product}
        className="btn_secondary_rounded"
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
