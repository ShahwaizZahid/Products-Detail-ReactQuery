import { motion } from 'framer-motion'
import React from 'react'

export default function NewProductError(addNewProduct: any) {
  return (
     <motion.h1
        className="text-3xl text-center"
        initial={{
          x: 100,
          y: 100,
          scale: 1,
          rotate: 60,
          opacity: 0,
        }}
        animate={{
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
        }}
        transition={{ duration: 0.5 }}
      >
        Error: {addNewProduct.error.message}
      </motion.h1>
  )
}
