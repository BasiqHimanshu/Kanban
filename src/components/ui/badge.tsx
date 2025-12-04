import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 px-2.5 py-0.5 text-xs font-semibold text-slate-900 dark:text-slate-50 transition-colors",
      className
    )}
    {...props}
  />
))
Badge.displayName = "Badge"

export { Badge }
