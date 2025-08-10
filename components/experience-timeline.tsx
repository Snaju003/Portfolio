import { Briefcase, Terminal, Calendar, MapPin } from "lucide-react";
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
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: i * 0.1
      }
    })
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <div className="flex items-center gap-2">
          <Terminal size={22} className="text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-mono">
            {"$ work_experience"}
            <motion.span 
              className="ml-1 inline-block h-5 w-2 bg-emerald-600 dark:bg-emerald-400" 
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </h2>
        </div>
        <p className="text-muted-foreground mt-2 font-mono pl-7">
          {"// Professional roles and responsibilities"}
        </p>
      </motion.div>
      
      <motion.div 
        className="grid gap-6 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {experiences.map((exp, idx) => (
          <motion.div key={idx} custom={idx} variants={itemVariants}>
            <Card className="overflow-hidden border-2 border-emerald-600/30">
              <CardHeader className="pb-3 bg-neutral-950/5 dark:bg-neutral-900/20 border-b border-emerald-600/20">
                <div className="flex items-center gap-2 pb-1">
                  <span className="h-3 w-3 rounded-full bg-red-500/70" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                  <span className="h-3 w-3 rounded-full bg-green-500/70" />
                  <span className="ml-2 text-xs text-muted-foreground font-mono">{exp.company.toLowerCase().replace(/\s+/g, "-")} • job</span>
                </div>
                <div className="flex items-center justify-between gap-2 mt-1">
                  <CardTitle className="text-base md:text-lg font-mono">
                    <span className="text-emerald-600 dark:text-emerald-400">$</span> {exp.role}
                  </CardTitle>
                  <motion.div
                    initial={{ rotate: -15 }}
                    whileInView={{ rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                  >
                    <Briefcase className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </motion.div>
                </div>
                <div className="text-sm font-mono flex items-center gap-2">
                  <span className="text-muted-foreground">
                    <MapPin className="h-3 w-3 inline-block mr-1" />
                    {exp.location}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-xs flex items-center">
                    <Calendar className="h-3 w-3 inline-block mr-1 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400">{exp.range}</span>
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-3 p-4 font-mono">
                <div className="space-y-2 text-sm">
                  {exp.highlights.map((h, i) => (
                    <motion.div 
                      key={i}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -5 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
                    >
                      <span className="text-emerald-600 dark:text-emerald-400 mt-1">$</span>
                      <span>{h}</span>
                    </motion.div>
                  ))}
                </div>
                {exp.stack?.length ? (
                  <motion.div 
                    className="mt-4 text-xs border-t border-dashed border-emerald-600/20 pt-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <span className="text-muted-foreground">// tech stack:</span>{" "}
                    <span className="text-emerald-600 dark:text-emerald-400">[{exp.stack.join(", ")}]</span>
                  </motion.div>
                ) : null}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
