import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { products } from "./Context";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { loadingVarient } from "./Context";
import axios from "axios";

export default function Product() {
  const params = useParams();
  const fetchProduct = async () => {
    if (params.productId) { 
      const res = await axios.get(`https://dummyjson.com/products/${params.productId}`);
      return res.data;
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", params.productId],
    queryFn: fetchProduct,
  });

  if (isLoading) {
    return (
      <motion.div
        className="text-3xl font-bold"
        variants={loadingVarient}
        initial="initial"
        animate="animate"
      >
        Loading.....
      </motion.div>
    );
  }

  if (isError) {
    return (
      <motion.div
        className="text-3xl font-bold"
        variants={loadingVarient}
        initial="initial"
        animate="animate"
      >
        Error: {error.message}
      </motion.div>
    );
  }

  return (
    <>
        <button
          className="w-10 h-10 mt-4 ml-4">
          <Link to="/">
            {" "}
            <img src="/left-arrow.svg" alt="not found back arrow" />
          </Link>{" "}
        </button>
      <div className=" flex justify-center items-center flex-col">
        <div>
          
        </div>
        <div className="flex justify-center flex-col items-center sm:w-[90%] md:w-[60%] ">
          <motion.h1
            className="text-4xl py-6 font-bold"
            initial={{
              x: 100,
              scale: 1,
              opacity: 0,
            }}
            animate={{
              x: 0,
              scale: 1,
              opacity: 1,
            }}
            transition={{ duration: 0.4 }}
          >
            Product Details
          </motion.h1>

          <motion.div
            className="bg-white rounded-lg p-4 mb-4 mt-11"
            initial={{
              x: -200,
              scale: 1,
              opacity: 0,
            }}
            animate={{
              x: 0,
              scale: 1,
              opacity: 1,
            }}
            transition={{ duration: 0.9 }}
          >
            <img
              className="w-[400px] h-[400px] mb-4 rounded-full overflow-hidden object-fill"
              src={ data?.thumbnail}
              alt={`Product image not found`}
            />

            <div className="flex flex-col text-2xl py-12">
              <div className="flex font-semibold mb-2">
                <h2>Title:</h2>
                <h2 className="ml-3">{data?.title}</h2>
              </div>

              <div className="flex  mb-2">
                <p className="font-semibold">Brand:</p>
                <p className="ml-3">{data?.brand}</p>
              </div>

              <div className="flex  mb-2">
                <p className="font-semibold">Category:</p>
                <p className="ml-3">{data?.category}</p>
              </div>

              <div className="flex  mb-2">
                <p className="font-semibold">Price:</p>
                <p className="ml-3">{data?.price}</p>
              </div>

              {data!.discountPercentage > 0 && (
                <div className="flex  mb-2">
                  <p className="font-semibold">Discount:</p>
                  <p className="ml-3">{data?.discountPercentage}</p>
                </div>
              )}

              <div className="flex  mb-2">
                <p className="font-semibold">Rating:</p>
                <p className="ml-3">{data?.rating}</p>
              </div>

              <div className="flex  mb-2">
                <p className="font-semibold">Stock: </p>
                <p className="ml-3">{data?.stock}</p>
              </div>

              <div className="flex  mb-2">
                <p className="font-semibold">Description:</p>
                <p className="ml-3">{data?.description}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
