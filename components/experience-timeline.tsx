import { Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeWindow } from "@/components/code-window";
import { motion } from "framer-motion";

type Experience = {
  company: string;
  role: string;
  location: string;
  range: string;
  highlights: string[];
  stack?: string[];
};

export function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  // Animation variants for the stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="space-y-6">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold tracking-tight"
      >
        {"Experience"}
      </motion.h2>
      
      <motion.div 
        className="grid gap-6 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {experiences.map((exp, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base md:text-lg">{exp.role}</CardTitle>
                  <motion.div
                    initial={{ rotate: -15 }}
                    whileInView={{ rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                  >
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {exp.company} • {exp.location}
                </div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400">{exp.range}</div>
              </CardHeader>
              <CardContent className="pt-0">
                <CodeWindow title={exp.company} subtitle="summary">
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    {exp.highlights.map((h, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -5 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
                      >
                        {h}
                      </motion.li>
                    ))}
                  </ul>
                  {exp.stack?.length ? (
                    <motion.div 
                      className="mt-4 text-xs text-muted-foreground"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      {"stack => "}
                      <span className="font-mono text-emerald-600 dark:text-emerald-400">{exp.stack.join(", ")}</span>
                    </motion.div>
                  ) : null}
                </CodeWindow>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
