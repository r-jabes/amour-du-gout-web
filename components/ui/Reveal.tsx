"use client";

import type { ReactNode } from "react";
import { useInView } from "@/lib/useInView";
import styles from "./Reveal.module.css";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

export function Reveal({ children, className }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={[styles.reveal, inView ? styles.visible : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
