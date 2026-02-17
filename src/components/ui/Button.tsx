"use client";

import Link from "next/link";
import { ReactNode, ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50";
  const variants = {
    primary:
      "bg-accent text-white hover:bg-accent-dark focus:ring-accent",
    secondary:
      "bg-primary text-white hover:bg-primary-light focus:ring-primary",
    outline:
      "border-2 border-accent text-accent hover:bg-accent hover:text-white focus:ring-accent",
    ghost:
      "text-accent hover:bg-accent/10 focus:ring-accent",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };
  const styles = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  const Comp = motion.button;
  const content = <span>{children}</span>;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {content}
      </Link>
    );
  }
  return (
    <Comp
      type={type}
      className={styles}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </Comp>
  );
}
