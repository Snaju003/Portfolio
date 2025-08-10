import type React from "react"
import { cn } from "@/lib/utils"

type CodeWindowProps = {
  title?: string
  subtitle?: string
  className?: string
  children?: React.ReactNode
}

export function CodeWindow({ title = "terminal", subtitle = "bash", className, children }: CodeWindowProps) {
  return (
    <div
      className={cn("rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden", "font-mono", className)}
      role="region"
      aria-label={`${title} ${subtitle}`}
    >
      <div className="flex items-center gap-2 px-3 py-2 border-b bg-muted/50">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <div className="ml-2 text-xs text-muted-foreground">{`${title} • ${subtitle}`}</div>
      </div>
      <div className="p-4 bg-background/60">{children}</div>
    </div>
  )
}
