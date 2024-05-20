import { useSearchParams, Link } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { loadingVarient, createNewVariants, cardVariants } from "./Context";
import Loading from "./Loading";
const fetchCategory = async () => {
  const response = await axios.get("https://dummyjson.com/products/categories");
  return response.data;
};

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams({
    limit: "4",
    skip: "0",
  });
  const limit = parseInt(`${searchParams.get("limit") || 0}`);
  const skip = parseInt(`${searchParams.get("skip") || 0}`);
  const q = searchParams.get("q") || "";
  const catagory = searchParams.get("category") || "";

  const fetchProducts = async () => {
    let url = `https://dummyjson.com/products/search?limit=${limit}&skip=${skip}&q=${q}`;
    if (catagory) {
      url = `https://dummyjson.com/products/category/${catagory}?limit=${limit}&skip=${skip}`; // Add missing /
    }
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", limit, skip, q, catagory],
    queryFn: fetchProducts,
    placeholderData: keepPreviousData,
  });

  const category = useQuery({
    queryKey: ["products", "categoruy"],
    queryFn: fetchCategory,
  });

  const handleMove = (moveCount: any) => {
    setSearchParams((prevSearchParams) => {
      const currentSkip = parseInt(`${prevSearchParams.get("skip")}`) || 0;
      const newSkip = Math.max(currentSkip + moveCount, 0);
      prevSearchParams.set("skip", `${newSkip}`);
      return prevSearchParams;
    });
  };

  if (isLoading) {
    return (
      <motion.div
        className="text-3xl font-bold"
        variants={loadingVarient}
        initial="initial"
        animate="animate"
      >
        <Loading />
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
    <div>
      <div className="flex justify-end">
        <motion.button
          className="bg-black px-4 py-3 text-white rounded-xl font-bold mt-3 mx-3"
          variants={createNewVariants}
          initial="initial"
          animate="animate"
        >
          <Link to="/newproduct">Create new product</Link>
        </motion.button>
      </div>

      <motion.div
        className="flex justify-center  items-center bg-black py-2 flex-col md:flex-row mt-10 rounded-full mx-4 px-4"
        variants={createNewVariants}
        initial="initial"
        animate="animate"
      >
        <div className="w-[80%] my-2 mx-5">
          <input
            placeholder="Search here product"
            className="border-2 border-black w-full py-4 px-5 outline-none rounded-2xl text-2xl font-semibold"
            type="text"
            onChange={(e) => {
              e.preventDefault(); // Prevent default form submission behavior
              setSearchParams((prev) => {
                prev.set("q", e.target.value);
                prev.set("skip", `${0}`);
                prev.delete("category");
                return prev;
              });
            }}
          />
        </div>
        <div>
          <select
            className="border-2 border-black w-fit h-fit py-4 px-5 rounded-lg font-bold text-lg"
            onChange={(e) => {
              console.log("ehh");
              setSearchParams((prev) => {
                prev.set("skip", `${0}`);
                prev.delete("q");
                prev.set("category", `${e.target.value}`);
                return prev;
              });
            }}
          >
            <option value="">Select Category</option>
            {category.data &&
              category.data.map((pro: any) => (
                <option key={pro} value={pro}>
                  {pro}
                </option>
              ))}
          </select>
        </div>
      </motion.div>
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8 flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl">Products</h1>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data?.products.map((product: any) => (
            <motion.div
              key={product.id}
              className="group relative "
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover={{ y: -30 }}
            >
              <div className="aspect-h-1 aspect-w-1 w-full h-[200px]  overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.thumbnail || "images-regular.svg"}
                  alt={`${product.title || "Product"} image not found`}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  onError={(e) => {
                    e.currentTarget.src = "images-regular.svg";
                  }}
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/product/${product.id}`}>
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
      {data.products.length !== 0 && (
        <div className="flex justify-center items-center ">
          <motion.button
            disabled={skip < limit}
            className={`h-fit w-fit rounded-lg py-3 px-5 my-3 mx-6 ${
              skip < limit ? "bg-blue-200" : "bg-blue-400"
            }`}
            onClick={() => {
              handleMove(-limit);
            }}
            initial={{ x: -500, scale: 0 }}
            animate={{ x: skip < limit ? -1000 : 0, scale: 1 }}
            whileHover={{ y: -10, scale: 1.2 }}
          >
            {" "}
            Previous
          </motion.button>

          <motion.button
            disabled={skip + limit >= data.total}
            className={`h-fit w-fit bg-blue-400 rounded-lg py-3 px-5 my-3 mx-6 ${
              skip + limit >= data.total ? "bg-blue-200" : "bg-blue-400"
            }`}
            onClick={() => {
              handleMove(limit);
            }}
            initial={{ x: 500, scale: 0 }}
            animate={{ x: skip + limit >= data.total ? 1000 : 0, scale: 1 }}
          >
            {" "}
            Next
          </motion.button>
        </div>
      )}
      {data.products.length === 0 && (
        <div className="flex justify-center items-center text-2xl font-bold">
          <div>Your search Category not availiable</div>
        </div>
      )}
    </div>
  );
}
