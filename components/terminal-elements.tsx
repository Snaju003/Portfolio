"use client"

import { useEffect, useState } from "react"

export function Cursor({ className = "" }: { className?: string }) {
  const [show, setShow] = useState(true)
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    if (mq.addEventListener) mq.addEventListener("change", onChange)
    else mq.addListener(onChange as any)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange)
      else mq.removeListener(onChange as any)
    }
  }, [])

  useEffect(() => {
    if (reduced) return
    const t = setInterval(() => setShow((s) => !s), 550)
    return () => clearInterval(t)
  }, [reduced])

  return (
    <span
      aria-hidden
      className={`inline-block w-2 h-4 bg-emerald-500 ml-1 align-baseline ${className}`}
      style={{ opacity: reduced ? 1 : show ? 1 : 0 }}
    />
  )
}

export function TerminalPrompt({
  user = "soumya",
  host = "portfolio",
  path = "~",
  command,
}: {
  user?: string
  host?: string
  path?: string
  command?: string
}) {
  return (
    <div className="text-sm">
      <span className="text-emerald-600 dark:text-emerald-400">{user}</span>
      <span className="text-muted-foreground">@</span>
      <span className="text-emerald-600 dark:text-emerald-400">{host}</span>
      <span className="text-muted-foreground">:</span>
      <span className="text-emerald-700 dark:text-emerald-300">{path}</span>
      <span className="text-muted-foreground">$</span>
      {command ? <span className="ml-2">{command}</span> : <Cursor />}
    </div>
  )
}
