import { motion } from 'framer-motion'
import { loadingVarient } from './Context'

export default function ErrorCompomentent(error:any) {
    console.log(error.message);
  return (
     <motion.div
        className="text-3xl font-bold"
        variants={loadingVarient}
        initial="initial"
        animate="animate"
      >
        Error: {error.message}
      </motion.div>
  )
}
