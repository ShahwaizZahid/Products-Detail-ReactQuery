import { useForm } from "react-hook-form";
import { Product } from "./Context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { products } from "./Context";
import { Link , useNavigate} from "react-router-dom";
import {motion} from "framer-motion"

const NewProduct = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  const addNewProduct = useMutation({
    mutationKey: ["newProduct"],
    mutationFn: async (data: any) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newId = products.length + 1;
      const newData = { ...data, id: newId };
      return products.push(newData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      navigate("/")
    },
  });

  const onSubmitForm = (data: Product) => {
    addNewProduct.mutate(data);
  };

  if (addNewProduct.isPending){

    return <motion.h1 className="text-3xl text-center"  initial={{
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
    transition={{ duration: .5 }}>Adding...</motion.h1>;
  }
  if (addNewProduct.isError){

    return (
      <motion.h1 className="text-3xl text-center"  initial={{
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
      transition={{ duration: .5 }}>
        Error: {addNewProduct.error.message}
      </motion.h1>
    );
  }

  return (
    <>
      <motion.form onSubmit={handleSubmit(onSubmitForm)}
      >
        <motion.button className="w-10 h-10 m-4" initial={{
            y: -700,
            opacity:0,
          }}
          animate={{
            y: 0,
            opacity:1, 
          }}
          transition={{ duration: 1 }} >
          <Link to="/">
            {" "}
            <img src="left-arrow.svg" alt="not found back arrow" />
          </Link>{" "}
        </motion.button>
        
          <motion.h1 className="font-bold text-5xl my-6 text-center"
          initial={{
            x: -700,
            opacity:0,
            scale:0,
          }}
          animate={{
            x: 0,
            opacity:1, 
            scale:1,
          }}
          transition={{ duration: 1 }} 
          >Create New Product</motion.h1>
        <motion.div className="w-full  flex flex-col justify-center items-center px-3" initial={{
            y: 700,
            opacity:0,
          }}
          animate={{
            y: 0,
            opacity:1, 
          }}
          transition={{ duration: 1 }} >
          <div className="lg:w-[60%] my-2 md:w-[75%] w-full flex-col bg-black py-2 px-4 rounded-lg" 
          >
            <div className=" w-full flex md:flex-row flex-col justify-center item-center   py-2 ">
              <label
                htmlFor="title"
                className="w-[30%] px-6  text-gray-300  items-center flex justify-start font-bold text-lg"
              >
                Title
              </label>
              <input
                placeholder="Type here title of Product"
                type="text"
                id="title"
                {...register("title", { required: true })}
                className="mt-1 px-2 py-3 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg border-gray-300 rounded-md"
              />
            </div>
            {errors.title && (
              <span className="text-red-500 w-fit">Title is required</span>
            )}
          </div>

          <div className="lg:w-[60%] my-2 md:w-[75%] sm:w-[100%]  w-[100%] flex-col bg-black py-2 px-4 rounded-lg">
            <div className=" w-full flex md:flex-row  sm:flex-col justify-center item-center   py-2 ">
              <label
                htmlFor="price"
                className="w-[30%] px-6  text-gray-300  items-center flex justify-start font-bold text-lg"
              >
                Price
              </label>
              <input
                placeholder="Type here price of Product in numbers"
                type="number"
                id="price"
                {...register("price", { required: true })}
                className="mt-1 px-2 py-3 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg border-gray-300 rounded-md"
              />
            </div>
            {errors.price && (
              <span className="text-red-500 w-fit">
                Price is required number
              </span>
            )}
          </div>

          <div className="lg:w-[60%] my-2 md:w-[75%] sm:w-[100%] w-[100%] flex-col bg-black py-2 px-4 rounded-lg">
            <div className=" w-full flex md:flex-row  sm:flex-col justify-center item-center   py-2 ">
              <label
                htmlFor="brand"
                className="w-[30%] px-6  text-gray-300  items-center flex justify-start font-bold text-lg"
              >
                Brand
              </label>
              <input
                placeholder="Type here brand of Product "
                type="text"
                id="brand"
                {...register("brand", { required: true })}
                className="mt-1 px-2 py-3 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg border-gray-300 rounded-md"
              />
            </div>
            {errors.brand && (
              <span className="text-red-500 w-fit">Brand is required</span>
            )}
          </div>

          <div className="lg:w-[60%] my-2 md:w-[75%] sm:w-[100%] w-[100%] flex-col bg-black py-2 px-4 rounded-lg">
            <div className=" w-full flex md:flex-row  sm:flex-col justify-center item-center   py-2 ">
              <label
                htmlFor="category"
                className="w-[30%] px-6  text-gray-300  items-center flex justify-start font-bold text-lg"
              >
                Category
              </label>
              <input
                placeholder="Type here category of Product"
                type="text"
                id="category"
                {...register("category", { required: true })}
                className="mt-1 px-2 py-3 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg border-gray-300 rounded-md"
              />
            </div>
            {errors.category && (
              <span className="text-red-500 w-fit">Category is required</span>
            )}
          </div>

          <div className="lg:w-[60%] my-2 md:w-[75%] sm:w-[100%] w-[100%] flex-col bg-black py-2 px-4 rounded-lg">
            <div className=" w-full flex md:flex-row  sm:flex-col justify-center item-center   py-2 ">
              <label
                htmlFor="thumbnail"
                className="w-[30%] px-6  text-gray-300  items-center flex justify-start font-bold text-lg"
              >
                Thumbnail
              </label>
              <input
                placeholder="Give the URL of Product "
                type="text"
                id="thumbnail"
                {...register("thumbnail", { required: true })}
                className="mt-1 px-2 py-3 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg border-gray-300 rounded-md"
              />
            </div>
            {errors.thumbnail && (
              <span className="text-red-500 w-fit">Thumbnailis required</span>
            )}
          </div>

          <div className="lg:w-[60%] my-2 md:w-[75%] sm:w-[100%] w-[100%] flex-col bg-black py-2 px-4 rounded-lg">
            <div className=" w-full flex md:flex-row  sm:flex-col justify-center item-center   py-2 ">
              <label
                htmlFor="description"
                className="w-[30%] px-6  text-gray-300  items-center flex justify-start font-bold text-lg"
              >
                Description
              </label>
              <input
                placeholder="Type here description of Product"
                type="text"
                id="description"
                {...register("description", { required: true })}
                className="mt-1 px-2 py-3 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg border-gray-300 rounded-md"
              />
            </div>
            {errors.description && (
              <span className="text-red-500 w-fit">Description required</span>
            )}
          </div>

          <div className="lg:w-[60%] md:w-[75%] sm:w-[100%]  w-[100%] flex-col bg-black py-2 px-4 rounded-lg">
            <div className=" w-full flex md:flex-row sm:flex-col justify-center item-center   py-2 ">
              <label
                htmlFor="discountPercentage"
                className="w-[30%] xm:none px-6  text-gray-300  items-center flex justify-start font-bold text-lg"
              >
                Discount%
              </label>
              <input
                placeholder="Type here  discount% of Product in numbers"
                type="number"
                id="discountPercentage"
                {...register("discountPercentage", { required: true })}
                className="mt-1 px-2 py-3 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg border-gray-300 rounded-md"
              />
            </div>
            {errors.discountPercentage && (
              <span className="text-red-500 w-fit">
                Discount% required in numbers
              </span>
            )}
          </div>

          <div className="lg:w-[60%] my-2 md:w-[75%] sm:w-[100%]  w-[100%] flex-col bg-black py-2 px-4 rounded-lg">
            <div className=" w-full flex md:flex-row sm:flex-col justify-center item-center   py-2 ">
              <label
                htmlFor="rating"
                className="w-[30%] xm:none px-6  text-gray-300  items-center flex justify-start font-bold text-lg"
              >
                Rating
              </label>
              <input
                placeholder="Type here rating of Product in numbers"
                type="number"
                id="rating"
                {...register("rating", { required: true })}
                className="mt-1 px-2 py-3 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg border-gray-300 rounded-md"
              />
            </div>
            {errors.rating && (
              <span className="text-red-500 w-fit">Rating required number</span>
            )}
          </div>

          <div className="lg:w-[60%] my-2 md:w-[75%] sm:w-[100%]  w-[100%] flex-col bg-black py-2 px-4 rounded-lg">
            <div className=" w-full flex md:flex-row sm:flex-col justify-center item-center   py-2 ">
              <label
                htmlFor="stock"
                className="w-[30%] xm:none px-6  text-gray-300  items-center flex justify-start font-bold text-lg"
              >
                Stock
              </label>
              <input
                placeholder="Type here stock of Product  availible in numbers"
                type="number"
                id="stock"
                {...register("stock", { required: true })}
                className="mt-1 px-2 py-3 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg border-gray-300 rounded-md"
              />
            </div>
            {errors.stock && (
              <span className="text-red-500 w-fit">Stock required number</span>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="inline-flex items-center px-8 py-3 my-8 border-4 font-bold border-transparent text-lg  rounded-md text-white bg-black hover:bg-white hover:text-black hover:border-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-110 transition-all duration-300"
            >
              Create Product
            </button>
          </div>
        </motion.div>
      </motion.form>
    </>
  );
};

export default NewProduct;
