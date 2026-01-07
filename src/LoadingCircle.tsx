import "./Loading.css";
import { motion } from "framer-motion";
import { loadingVarient } from "./Context";
export default function LoadingCircle() {
  return(
    
  <>
    <motion.div
      className="text-3xl font-bold"
      variants={loadingVarient}
      initial="initial"
      animate="animate"
    >
      <span className="loader "></span>
    </motion.div>
  </>
  )
}
