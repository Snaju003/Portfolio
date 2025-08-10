import Link from "next/link"
import { TerminalPrompt } from "@/components/terminal-elements"
import { cn } from "@/lib/utils"
import { Github, Linkedin, Mail, Heart } from "lucide-react"
import { TypedText } from "@/components/typed-text"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function Footer() {
  const [date, setDate] = useState<string>("")

  // Update date every minute
  useEffect(() => {
    const updateDate = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
      setDate(now.toLocaleDateString('en-US', options))
    }
    
    updateDate()
    const interval = setInterval(updateDate, 60000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className={cn("border-t border-emerald-600/20 relative")}>
      <div className="container max-w-6xl mx-auto px-4 py-6 md:py-8">
        <motion.div 
          initial={{ opacity: 0.8, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-lg border border-emerald-600/30 bg-neutral-900/5 dark:bg-neutral-900/40 p-4 font-mono shadow-lg hover:shadow-emerald-500/5 transition-shadow duration-500"
        >
          <div className="flex items-center gap-2 pb-2 border-b border-emerald-600/20">
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="h-3 w-3 rounded-full bg-red-500/80" 
            />
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
              className="h-3 w-3 rounded-full bg-yellow-500/80" 
            />
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
              className="h-3 w-3 rounded-full bg-green-500/80" 
            />
            <span className="ml-2 text-xs text-muted-foreground">footer • terminal</span>
          </div>
          
          <div className="pt-3 space-y-4 text-sm">
            <div className="terminal-output">
              <TerminalPrompt path="~" command='echo "last login:"' />
              <div className="pl-6 text-emerald-600 dark:text-emerald-400">
                <TypedText text={date} speed={5} startDelay={0} />
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="text-muted-foreground flex items-center gap-1"
              >
                <span>© {new Date().getFullYear()} Soumya Raj Sarkar</span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart className="h-3 w-3 text-red-500 ml-1" />
                </motion.span>
              </motion.div>
              
              <div className="flex items-center gap-4">
                <motion.div className="flex gap-3">
                  <motion.a 
                    href="https://github.com/Snaju003" 
                    target="_blank" 
                    rel="noreferrer"
                    whileHover={{ y: -3, color: "#24292e" }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </motion.a>
                  <motion.a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noreferrer"
                    whileHover={{ y: -3, color: "#0077B5" }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </motion.a>
                  <motion.a 
                    href="mailto:contact@example.com" 
                    whileHover={{ y: -3, color: "#EA4335" }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
