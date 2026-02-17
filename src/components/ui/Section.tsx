import { ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  children,
  className = "",
  containerClassName = "",
  as: Tag = "section",
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  as?: "section" | "div";
}) {
  return (
    <Tag className={`py-16 sm:py-20 ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </Tag>
  );
}
