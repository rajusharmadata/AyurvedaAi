// components/ui/button.jsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../../lib/utils";

const buttonVariants = {
  default: "bg-green-600 text-white hover:bg-green-700",
  outline:
    "border border-green-600 text-green-600 bg-transparent hover:bg-green-50",
  ghost: "bg-transparent hover:bg-gray-100",
};

const sizes = {
  default: "h-10 px-4 py-2",
  icon: "h-10 w-10 p-0 flex items-center justify-center",
};

const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none",
          buttonVariants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
