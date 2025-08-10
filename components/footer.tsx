import Link from "next/link"
import { TerminalPrompt } from "@/components/terminal-elements"
import { cn } from "@/lib/utils"

export function Footer() {
  return (
    <footer className={cn("border-t border-emerald-600/20")}>
      <div className="container max-w-6xl mx-auto px-4 py-6 md:py-8">
        <div className="rounded-lg border border-emerald-600/30 bg-neutral-900/5 dark:bg-neutral-900/40 p-4 font-mono">
          <div className="flex items-center gap-2 pb-2 border-b border-emerald-600/20">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs text-muted-foreground">footer • terminal</span>
          </div>
          <div className="pt-3 space-y-2 text-sm">
            <TerminalPrompt path="~" command='echo "last login: $(date)"' />
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-muted-foreground">
              <div>
                {"© "} {new Date().getFullYear()} {" Soumya Raj Sarkar"}
              </div>
              <Link href="#top" className="underline underline-offset-4">
                {"Back to top"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
