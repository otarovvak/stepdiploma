import React, { useContext, useState } from "react";
import Item from "../components/Item";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import { ShopContext } from "../Context/ShopContext";

const Category = () => {
  const { all_products } = useContext(ShopContext);
  const [productsToDisplay, setProductsToDisplay] = useState(12);
  const [filteredProducts, setFilteredProducts] = useState(all_products);

  const handleLoadMore = () => {
    setProductsToDisplay(productsToDisplay + 12);
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const filtered = all_products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(all_products);
    }
  };

  const handleFilter = (filters) => {
    let filtered = all_products;

    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(
        (product) => product.price >= parseFloat(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(
        (product) => product.price <= parseFloat(filters.maxPrice)
      );
    }

    if (filters.minRating) {
      filtered = filtered.filter(
        (product) => product.rating >= parseFloat(filters.minRating)
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <section className="max_padd_container py-12 xl:py-28">
      <div>
        <SearchBar onSearch={handleSearch} />
        <Filter
          categories={[
            ...new Set(all_products.map((product) => product.category)),
          ]}
          onFilter={handleFilter}
        />
        {/* container */}
        <div className="grid xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.slice(0, productsToDisplay).map((item) => (
            <Item
              key={item._id}
              id={item._id}
              image={item.api_featured_image}
              name={item.name}
              price={item.price}
              product_colors={item.product_colors}
              category={item.category}
              rating={item.rating}
              tags={item.tag_list}
              description={item.description}
            />
          ))}
        </div>
        {productsToDisplay < filteredProducts.length && (
          <div className="mt-16 text-center">
            <button className="btn_secondary_rounded" onClick={handleLoadMore}>
              Load more
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Category;
