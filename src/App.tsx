import Products from "./Products";
import Product from "./Product";
import NewProduct from "./NewProduct";
import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/newproduct/" element={<NewProduct />} />
      </Routes>
    </>
  );
}
