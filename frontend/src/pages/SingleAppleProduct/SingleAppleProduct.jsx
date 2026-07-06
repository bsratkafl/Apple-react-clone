import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Four04 from "../Four404/Four404";

function SingleAppleProduct() {
  // useParams is a hook that returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>.
  //   console.log(useParams());

  // destructure the id from the useParams hook
  const { id } = useParams();
  // console.log(id);

  const [product, setProduct] = useState([]);

  // fetch the product details from the backend using the id from the URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/iphones/${id}`,
        );
        const data = await res.json();
        // console.log(data.products);
        setProduct(data.products);
      } catch (error) {
        console.log("Error fetching product", error);
        setProduct([]);
      }
    };

    fetchData();
  }, [id]); //  the dependency array includes id, so the effect will run whenever the id changes (i.e., when the user navigates to a different product page)

  // console.log(product);
  // console.log(product[0].product_name);

  if (product.length > 0) {
    return (
      <div>
        <section className="internal-page-wrapper">
          <div className="container">
            {product?.map((product) => {
              return (
                <div key={product.product_id}>
                  <div className="row justify-content-center text-center">
                    <div className="col-12 mt-5 pt-5">
                      <div className="title-wraper font-weight-bold">
                        {product.product_name}
                      </div>
                      <div className="brief-description">
                        {product.product_brief_description}
                      </div>
                    </div>
                  </div>

                  <div className="row justify-content-center text-center product-holder h-100 m-5">
                    <div className={`col-sm-12 col-md-6 my-auto`}>
                      <div className="starting-price">
                        {`Starting at ${product.starting_price}`}
                      </div>
                      <div className="monthly-price">{product.price_range}</div>
                      <div className="product-details">
                        {product.product_description}
                      </div>
                    </div>

                    <div className={`col-sm-12 col-md-6`}>
                      <div className="product-image">
                        <img src={product.product_img} alt="product" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  } else {
    return <Four04 />;
  }
}

export default SingleAppleProduct;
