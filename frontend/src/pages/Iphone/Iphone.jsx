import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Iphone() {
  // state to hold the videos fetched from the backend
  const [products, setProducts] = useState([]);
  // fetch data from the backend and display it here
  useEffect(() => {
    try {
      const fetchIphones = async () => {
        // fetch the videos from the backend
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/iphones`,
        );
        const data = await response.json();
        console.log(data.products);
        // set the videos in the state
        setProducts(data.products);
      };

      fetchIphones();
    } catch (error) {
      console.log("Error fetching videos", error);
    }
  }, []);
  return (
    <>
      <div>
        <section className="internal-page-wrapper">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-12 mt-5 pt-5">
                <h1 className="font-weight-bold">Iphones</h1>
                <div className="brief-description mb-5">
                  The best for the brightest.
                </div>
              </div>
            </div>
            {products?.map((product, index) => {
              let productDiv = (
                <div
                  key={product.product_url}
                  className="row justify-content-center text-center product-holder h-100"
                >
                  <div
                    className={`col-sm-12 col-md-6 my-auto order-${
                      index % 2 === 0 ? "1" : "2"
                    }`}
                  >
                    <div className="product-title">{product.product_name}</div>
                    <div className="product-brief">
                      {product.product_brief_description}
                    </div>
                    <div className="starting-price">
                      {`Starting at ${product.starting_price}`}
                    </div>
                    <div className="monthly-price">{product.price_range}</div>
                    <div className="links-wrapper">
                      <ul>
                        <li>
                          <Link to={`/iphone/${product.product_id}`}>
                            Learn more
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div
                    className={`col-sm-12 col-md-6 order-${
                      index % 2 === 0 ? "2" : "1"
                    }`}
                  >
                    <div className="product-image">
                      <img src={product.product_img} alt="product" />
                    </div>
                  </div>
                </div>
              );
              return productDiv;
            })}
          </div>
        </section>
      </div>
    </>
  );
}

export default Iphone;
