import type { ReactNode } from "react";
import styles from "./Container.module.css";

type ContainerProps = {
  children: ReactNode;
  as?: "div" | "section" | "article" | "main";
  width?: "default" | "narrow" | "wide";
  className?: string;
};

export function Container({
  children,
  as: Tag = "div",
  width = "default",
  className,
}: ContainerProps) {
  const widthClass =
    width === "narrow"
      ? styles.narrow
      : width === "wide"
        ? styles.wide
        : styles.container;

  return (
    <Tag className={[widthClass, className].filter(Boolean).join(" ")}>
      {children}
    </Tag>
  );
}
