import { useEffect, useState } from "react";
import { TbTrash } from "react-icons/tb";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loadCount, setLoadCount] = useState(15);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setVisibleProducts(data.slice(0, loadCount));
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  useEffect(() => {
    const filtered = allProducts.filter((product) => {
      const nameMatch = product.name
        .toLowerCase()
        .includes(filter.toLowerCase());
      const categoryMatch = product.category
        .toLowerCase()
        .includes(categoryFilter.toLowerCase());
      return nameMatch && categoryMatch;
    });
    setVisibleProducts(filtered.slice(0, loadCount));
  }, [categoryFilter, allProducts, filter, loadCount]);

  const removeProduct = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };

  const loadMore = () => {
    setLoadCount((prevCount) => prevCount + 20);
    setVisibleProducts(allProducts.slice(0, loadCount + 20));
  };

  const uniqueCategories = Array.from(
    new Set(allProducts.map((product) => product.category))
  );

  return (
    <div className="p-2 bg-white mb-0 rounded-sm w-full mt-5 lg:ml-5">
      <h4 className="bold-22 p-5 uppercase">Products List</h4>
      <div className="p-4">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Filter by name..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Filter by category...</option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleProducts.map((product, i) => (
            <div
              key={i}
              className="border p-4 rounded shadow-md flex flex-col items-center"
            >
              <img
                src={product.api_featured_image}
                alt={product.name}
                className="rounded-lg ring-1 ring-slate-900/5 mb-4"
                height={80}
                width={80}
              />
              <div className="text-center">
                <h5 className="line-clamp-3 mb-2">{product.name}</h5>
                <p className="text-gray-600">{product.price}$</p>
                <p className="text-gray-600">{product.category}</p>
              </div>
              <button
                onClick={() => removeProduct(product.id)}
                className="mt-4 p-2 bg-red-500 text-white rounded-full"
              >
                <TbTrash />
              </button>
            </div>
          ))}
        </div>
        {visibleProducts.length < allProducts.length && (
          <div className="text-center mt-4">
            <button
              onClick={loadMore}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
