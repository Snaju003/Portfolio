import { Trophy, Award, Medal, Star, BadgeCheck, Crown, Sparkles, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Achievement = { title: string; org: string; detail: string };

// Function to get a random icon for achievements
const getAchievementIcon = (index: number) => {
  const icons = [
    <Trophy className="h-6 w-6" />,
    <Award className="h-6 w-6" />,
    <Medal className="h-6 w-6" />,
    <Star className="h-6 w-6" />,
    <BadgeCheck className="h-6 w-6" />,
    <Crown className="h-6 w-6" />,
    <Sparkles className="h-6 w-6" />,
    <Target className="h-6 w-6" />,
  ];
  
  return icons[index % icons.length];
};

// Generate a color scheme based on the achievement title
const getAchievementColor = (title: string, isActive: boolean) => {
  const colors = [
    {
      bg: "from-emerald-500/10 to-emerald-500/5",
      glow: "bg-emerald-500/20",
      icon: "text-emerald-500 dark:text-emerald-400",
      border: isActive ? "border-emerald-500/50" : "border-emerald-500/20"
    },
    {
      bg: "from-blue-500/10 to-blue-500/5",
      glow: "bg-blue-500/20",
      icon: "text-blue-500 dark:text-blue-400",
      border: isActive ? "border-blue-500/50" : "border-blue-500/20"
    },
    {
      bg: "from-amber-500/10 to-amber-500/5",
      glow: "bg-amber-500/20",
      icon: "text-amber-500 dark:text-amber-400",
      border: isActive ? "border-amber-500/50" : "border-amber-500/20"
    },
    {
      bg: "from-violet-500/10 to-violet-500/5",
      glow: "bg-violet-500/20",
      icon: "text-violet-500 dark:text-violet-400",
      border: isActive ? "border-violet-500/50" : "border-violet-500/20"
    },
  ];
  
  // Simple hash function to select a color
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = ((hash << 5) - hash) + title.charCodeAt(i);
    hash = hash & hash;
  }
  
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

export function AchievementsSection({ achievements }: { achievements: Achievement[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Particles animation for the achievement cards
  const particles = Array(3).fill(0);
  
  return (
    <div className="space-y-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center relative"
      >
        <motion.div 
          className="absolute inset-x-0 top-8 md:top-10 flex justify-center -z-10 opacity-70"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.7, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="w-32 h-32 rounded-full bg-gradient-radial from-amber-500/20 via-transparent to-transparent blur-xl" />
        </motion.div>
        
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-500 dark:from-amber-400 dark:via-yellow-300 dark:to-orange-300 bg-clip-text text-transparent">
          Recognitions & Achievements
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Milestones and acknowledgments that highlight my journey and expertise in the field.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 md:grid-cols-2"
      >
        {achievements.map((a, idx) => {
          const colorScheme = getAchievementColor(a.title, activeIndex === idx);
          const isActive = activeIndex === idx;
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: idx * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ 
                y: -5,
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
              className="relative"
            >
              {/* Glowing effect behind card */}
              <div className={cn(
                "absolute -inset-0.5 rounded-xl opacity-0 transition-opacity duration-300 blur",
                colorScheme.glow,
                isActive ? "opacity-40" : "opacity-0"
              )} />
              
              <Card className={cn(
                "h-full overflow-hidden bg-gradient-to-br border-2 transition-all duration-300 shadow-md",
                colorScheme.bg,
                colorScheme.border
              )}>
                <CardHeader className="pb-3 relative">
                  {isActive && (
                    <>
                      {particles.map((_, i) => (
                        <motion.div
                          key={i}
                          className={cn(
                            "absolute w-1 h-1 rounded-full",
                            colorScheme.icon.replace("text-", "bg-")
                          )}
                          initial={{ 
                            x: 20, 
                            y: 20, 
                            opacity: 0.7 
                          }}
                          animate={{ 
                            x: 20 + (Math.random() * 30 - 15), 
                            y: 20 - (20 + Math.random() * 30),
                            opacity: 0 
                          }}
                          transition={{ 
                            duration: 1 + Math.random(), 
                            repeat: Infinity, 
                            repeatDelay: Math.random() * 0.5 
                          }}
                        />
                      ))}
                    </>
                  )}
                  
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "p-2 rounded-md bg-background/50 backdrop-blur-sm shrink-0",
                      isActive ? "scale-110" : "",
                      "transition-transform duration-300"
                    )}>
                      <motion.div
                        className={cn(colorScheme.icon)}
                        initial={{ rotate: 0 }}
                        animate={isActive ? { rotate: [0, 15, 0, -15, 0] } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        {getAchievementIcon(idx)}
                      </motion.div>
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold line-clamp-2">{a.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1 font-medium">{a.org}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <motion.div 
                    className="relative"
                    initial={{ opacity: 0.8 }}
                    animate={isActive ? { opacity: 1 } : {}}
                  >
                    <p className="text-sm leading-relaxed">
                      {a.detail}
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
