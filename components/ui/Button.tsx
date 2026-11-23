import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost" | "inverse";

type SharedProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonAsButton = SharedProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function classNames(variant: Variant, className?: string) {
  return [styles.button, styles[variant], className].filter(Boolean).join(" ");
}

export function Button({
  children,
  variant = "primary",
  className,
  ...rest
}: ButtonProps) {
  const classes = classNames(variant, className);

  if ("href" in rest && typeof rest.href === "string") {
    return (
      <Link className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as Omit<ButtonAsButton, "children" | "variant" | "className">;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
