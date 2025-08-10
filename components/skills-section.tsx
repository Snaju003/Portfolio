import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

type SkillGroup = { title: string; caption: string; items: string[] };

export function SkillsSection({ skills }: { skills: SkillGroup[] }) {
  return (
    <div className="space-y-6">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold tracking-tight"
      >
        {"Skills"}
      </motion.h2>
      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((group, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5, 
              delay: idx * 0.1,
              ease: "easeOut" 
            }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{group.title}</CardTitle>
                <p className="text-xs text-muted-foreground">{group.caption}</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: (idx * 0.05) + (i * 0.05),
                      }}
                    >
                      <Badge variant="outline" className="font-mono">
                        {s}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
