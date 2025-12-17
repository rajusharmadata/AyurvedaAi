/* Alert.jsx - A reusable Alert component with title and description sub-components. Supports variant styling with class-variance-authority and client-side rendering. */

"use client"; // Enables client-side rendering (only needed for Next.js, omit for Vite/Create React App)

import * as React from "react"; // Import React library
import { cva } from "class-variance-authority"; // Import class-variance-authority for variant-based styling
import { cn } from "../../../lib/utils"; // Import utility function for class name concatenation

// Define alert variants using class-variance-authority
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Alert component: A styled container for alerts with variant support
const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

// AlertTitle component: A styled heading for alert titles
const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

// AlertDescription component: A styled container for alert descriptions
const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

// Export all components
export { Alert, AlertTitle, AlertDescription };
