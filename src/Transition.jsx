import { motion } from "framer-motion";

const variants = {
  hidden: {
    opacity: 0,
    scale: 1.15,     
    filter: "blur(6px)", 
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.6,             
      ease: [0.22, 1, 0.36, 1], 
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    filter: "blur(6px)",
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export default function Transition({ children }) {
  return (
    <motion.div
      className="w-full h-full"
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
