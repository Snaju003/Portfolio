"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isActive, setIsActive] = useState(false)
  
  useEffect(() => setMounted(true), [])
  
  // Once mounted, determine the actual theme
  useEffect(() => {
    if (mounted) {
      const isDarkTheme = resolvedTheme === "dark";
      setIsActive(isDarkTheme);
    }
  }, [mounted, resolvedTheme]);
  
  if (!mounted) return null
  
  // Use local state for immediate visual feedback
  const handleToggle = () => {
    const newTheme = isActive ? "light" : "dark";
    setTheme(newTheme);
    setIsActive(!isActive); // Update local state immediately for UI
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      aria-label="Toggle theme" 
      onClick={handleToggle}
      className="overflow-hidden transition-all duration-300"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Sun className={`h-[1.2rem] w-[1.2rem] transition-all duration-300 absolute ${isActive ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-90'}`} />
        <Moon className={`h-[1.2rem] w-[1.2rem] transition-all duration-300 absolute ${!isActive ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-90'}`} />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
