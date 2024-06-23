import { useState } from "react";

const Filter = ({ categories, onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");

  const handleFilter = () => {
    onFilter({
      category: selectedCategory,
      minPrice: minPrice,
      maxPrice: maxPrice,
      minRating: minRating,
    });
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg mb-8">
      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Price Range</label>
        <div className="flex">
          <input
            type="number"
            placeholder="Min"
            className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mr-2"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Minimum Rating</label>
        <input
          type="number"
          placeholder="Min Rating"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
        />
      </div>
      <button className="w-full btn_secondary_rounded" onClick={handleFilter}>
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;
