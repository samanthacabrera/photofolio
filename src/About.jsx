import { motion, useScroll, useTransform } from "framer-motion";
import Transition from "./Transition";
import { useRef } from "react";

function About() {
  const email = "justinamiller1023@gmail.com";
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [6, -6]);

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <Transition>
      <div
        id="about"
        ref={ref}
        className="relative flex flex-col items-center justify-center h-[80vh] max-w-lg mx-8 md:mx-auto"
      >
        <motion.div
          style={{ y }}
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-left leading-relaxed tracking-wide normal-case space-y-4"
        >
          <motion.p variants={item}>
            Based in Utrecht, Netherlands.
          </motion.p>

          <motion.p variants={item}>
            This is my personal archive of places I’ve visited that felt worth
            holding onto.
          </motion.p>

          <motion.p variants={item}>
            I am self-taught and began photographing in 2020. All photos are
            captured with a Sony Alpha a6000 under natural light.
          </motion.p>

          <motion.p variants={item}>
            You can reach me at
            <motion.a
              href={`mailto:${email}`}
              whileHover={{
                opacity: 0.8,
              }}
              className="italic inline-block pl-2"
            >
              {email}
            </motion.a>
            .
          </motion.p>
        </motion.div>

        <p className="fixed bottom-2 text-[10px] md:text-xs tracking-wide">
          This site was made by
          <a
            href="https://samoontha.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition pl-1"
          >
            Sam Cabrera
          </a>
        </p>
      </div>
    </Transition>
  );
}

export default About;
