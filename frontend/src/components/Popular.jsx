import React, { useEffect, useState } from "react";
import Item from "./Item";

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/popularproducts")
      .then((response) => response.json())
      .then((data) => setPopularProducts(data));
  }, []);

  return (
    <section className=" py-16">
      <div className="container mx-auto px-4 max_padd_container">
        <h3 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Top Products
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {popularProducts.map((item) => (
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
      </div>
    </section>
  );
};

export default Popular;
