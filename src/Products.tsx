import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { products, Product } from "./Context";
import {motion} from "framer-motion"

const fetchProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  }).then(() => [...products]);
};

export default function Products() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  if (isLoading){
   return <motion.div className="text-3xl font-bold"  initial={{
    x: 100,
    y: 100,
    scale: 1,
    rotate: 60,
    opacity:0,
  }}
  animate={{
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    opacity:1, 
  }}
  transition={{ duration: .5 }} >Loading.....</motion.div>;
}

  if (isError){
    return <motion.div className="text-3xl font-bold"  initial={{
      x: 100,
      y: 100,
      scale: 1,
      rotate: 60,
      opacity:0,
    }}
    animate={{
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      opacity:1, 
    }}
    transition={{ duration: .5 }} >Error: {error.message}</motion.div>;
  }

  return (
    <div className="bg-white">
      <motion.button className="bg-black px-4 py-3 text-white rounded-xl font-bold mt-3 mx-3"
        initial={{
          x: -100,
          scale: 1,
          opacity:0,
        }}
        animate={{
          x: 0,
          scale: 1,
          opacity:1, 
        }}
        transition={{ duration: .7 }} 
      >
        <Link to="/newproduct">Create new product</Link>
      </motion.button>
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8 flex flex-col justify-center items-center">
        <motion.h1 className="font-bold text-3xl"  initial={{
          x: 100,
          scale: 1,
          opacity:0,
        }}
        animate={{
          x: 0,
          scale: 1,
          opacity:1, 
        }}
        transition={{ duration: 1 }} >Products</motion.h1>
        <motion.h2 className="text-2xl font-bold tracking-tight text-gray-900" initial={{
              x: 100,
              scale: 1,
              opacity:0,
            }}
            animate={{
              x: 0,
              scale: 1,
              opacity:1, 
            }} 
        transition={{ duration: .9 }} >
          Customers also purchased
        </motion.h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data?.map((product: Product, index: number) => (
            <motion.div key={product.id} className="group relative" 
            initial={{
              y: 400,
              scale: 1,
              opacity:0,
            }}
            animate={{
              y: 0,
              scale: 1,
              opacity:1, 
            }} 
        transition={{ duration: .9 }} >
              <div className="aspect-h-1 aspect-w-1 w-full h-[200px]  overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product?.thumbnail || "images-regular.svg"}
                  alt={`${product?.title || "Product"} image not found`}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  onError={(e) => {
                    e.currentTarget.src = "images-regular.svg";
                  }}
                />
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/product/${index}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}