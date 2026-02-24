import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base Layout & Typography
        "h-9 w-full min-w-0 rounded-sm bg-transparent px-3 py-1 text-ls-base font-bold shadow-none transition-colors outline-none",
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        
        // Binance Border Logic: Default is secondary/border
        "border border-secondary hover:border-primary/50",
        
        // Active/Focus State: Border becomes Primary Yellow
        "focus-visible:border-primary focus-visible:ring-0",
        
        // Error States
        "aria-invalid:border-destructive dark:aria-invalid:border-destructive",
        
        className
      )}
      {...props}
    />
  )
}

export { Input }