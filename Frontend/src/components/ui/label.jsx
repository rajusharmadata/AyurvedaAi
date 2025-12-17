/* Label.jsx - A reusable Label component for React applications, built with Radix UI and styled using class-variance-authority. Uses client-side rendering. */

"use client"; // Enables client-side rendering for this component

import * as React from "react"; // Import React library
import * as LabelPrimitive from "@radix-ui/react-label"; // Import Radix UI Label component
import { cva } from "class-variance-authority"; // Import class-variance-authority for variant-based styling

import { cn } from "../../../lib/utils"; // Import utility function for class name concatenation

// Define label variants using class-variance-authority
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

// Create a Label component using React.forwardRef to allow ref forwarding
const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref} // Forward the ref to the Radix UI Label root
    className={cn(labelVariants(), className)} // Combine variant styles with custom className
    {...props} // Spread remaining props
  />
));

// Set display name for debugging and React DevTools
Label.displayName = LabelPrimitive.Root.displayName;

// Export the Label component
export { Label };
