import { Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

type Achievement = { title: string; org: string; detail: string };

export function AchievementsSection({ achievements }: { achievements: Achievement[] }) {
  return (
    <div className="space-y-6">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold tracking-tight"
      >
        {"Achievements"}
      </motion.h2>
      <div className="grid gap-6 md:grid-cols-2">
        {achievements.map((a, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5, 
              delay: idx * 0.15,
              ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <Card className="border-emerald-600/20 h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{a.title}</CardTitle>
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 10,
                      delay: 0.3 + (idx * 0.1)
                    }}
                  >
                    <Trophy className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </motion.div>
                </div>
                <p className="text-xs text-muted-foreground">{a.org}</p>
              </CardHeader>
              <CardContent>
                <motion.p 
                  className="text-sm"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + (idx * 0.1) }}
                >
                  {a.detail}
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
