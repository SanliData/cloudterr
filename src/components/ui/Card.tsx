"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { motion } from "framer-motion";

export function Card({
  children,
  href,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  const base =
    "rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md";
  const content = <div className={base}>{children}</div>;

  if (href) {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className={className}
      >
        <Link href={href} className="block">
          {content}
        </Link>
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className={`${base} ${className}`}
    >
      {children}
    </motion.div>
  );
}
