// // components/progress.tsx
// import * as React from "react";
// import * as ProgressPrimitive from "@radix-ui/react-progress";
// // import { cn } from "../../lib/utils"; // Adjusted the import path to match the relative file structure

// export const Progress = React.forwardRef<
//   React.ElementRef<typeof ProgressPrimitive.Root>,
//   React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
// >(({ className, value, ...props }, ref) => (
// <ProgressPrimitive.Root
//     ref={ref}
//     className={`relative h-4 w-full overflow-hidden rounded-full bg-gray-200 ${className || ""}`}
//     {...props}
// >
//     <ProgressPrimitive.Indicator
//         className="h-full w-full flex-1 bg-green-500 transition-all duration-500"
//         style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
//     />
// </ProgressPrimitive.Root>
// ));

// Progress.displayName = "Progress";
