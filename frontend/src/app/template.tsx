'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default function Template({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <motion.div
      initial="pageInitial"
      animate="pageAnimate"
      key={pathname}
      variants={{
        pageInitial: {
          opacity: 0,
          transition: {
            duration: 0.5,
          },
        },
        pageAnimate: {
          opacity: 1,
          transition: {
            duration: 0.5,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
