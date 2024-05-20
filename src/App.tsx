import Products from "./Products";
import Product from "./Product";
import NewProduct from "./NewProduct";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const loaction = useLocation();
  return (
    <>
      <AnimatePresence>
        <Routes key={loaction.pathname} location={loaction}>
          <Route path="/" element={<Products />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newproduct/" element={<NewProduct />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
