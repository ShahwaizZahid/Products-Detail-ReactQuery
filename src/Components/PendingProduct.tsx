import { motion } from 'framer-motion'
import React from 'react'
import LoadingCircle from '../LoadingCircle'

export default function PendingProduct() {
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
        <LoadingCircle />
      </motion.h1>
  )
}
