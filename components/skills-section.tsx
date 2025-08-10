import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { Code, Laptop, Server, Brush, Layers, Database, Workflow, Binary, Zap } from "lucide-react";

type SkillGroup = { title: string; caption: string; items: string[] };

// Get icon based on skill group title
const getIconForSkill = (title: string) => {
  const icons = {
    "Frontend": <Laptop className="h-6 w-6" />,
    "Backend": <Server className="h-6 w-6" />,
    "Languages": <Code className="h-6 w-6" />,
    "Design": <Brush className="h-6 w-6" />,
    "Frameworks": <Layers className="h-6 w-6" />,
    "Databases": <Database className="h-6 w-6" />,
    "DevOps": <Workflow className="h-6 w-6" />,
    "Tools": <Zap className="h-6 w-6" />,
  };
  
  // @ts-ignore - Dynamic property access
  return icons[title] || <Binary className="h-6 w-6" />;
};

// Get a color for a skill badge based on its name
const getSkillColor = (skill: string) => {
  // Map common tech to their brand colors
  const colorMap: Record<string, string> = {
    "React": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-300 dark:border-blue-700",
    "Next.js": "bg-neutral-100 text-neutral-800 dark:bg-neutral-900/30 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700",
    "TypeScript": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-300 dark:border-blue-700",
    "JavaScript": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700",
    "Node.js": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-300 dark:border-green-700",
    "Express": "bg-neutral-100 text-neutral-800 dark:bg-neutral-900/30 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700",
    "MongoDB": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-300 dark:border-green-700",
    "PostgreSQL": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-300 dark:border-blue-700",
    "HTML": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-300 dark:border-orange-700",
    "CSS": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-300 dark:border-blue-700",
    "Tailwind": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300 border-cyan-300 dark:border-cyan-700",
    "Git": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-300 dark:border-orange-700",
    "Docker": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-300 dark:border-blue-700",
    "AWS": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700",
    "Firebase": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700",
    "Redux": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-300 dark:border-purple-700",
    "GraphQL": "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 border-pink-300 dark:border-pink-700",
    "Figma": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-300 dark:border-purple-700",
  };

  // Find exact matches
  if (colorMap[skill]) {
    return colorMap[skill];
  }
  
  // Try to find partial matches (e.g. if "React Native" includes "React")
  for (const [tech, color] of Object.entries(colorMap)) {
    if (skill.includes(tech)) {
      return color;
    }
  }
  
  // Default colors - use a consistent pattern based on first character
  const charCode = skill.charCodeAt(0) % 5;
  const colors = [
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700",
    "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 border-violet-300 dark:border-violet-700",
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-300 dark:border-amber-700",
    "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300 border-rose-300 dark:border-rose-700",
    "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300 border-sky-300 dark:border-sky-700",
  ];
  
  return colors[charCode];
};

export function SkillsSection({ skills }: { skills: SkillGroup[] }) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<number | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
          Technical Proficiency
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          My toolkit encompasses a wide range of technologies that I've mastered to create efficient, scalable, and beautiful digital experiences.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-8 md:grid-cols-2"
      >
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
            onMouseEnter={() => setActiveGroup(idx)}
            onMouseLeave={() => setActiveGroup(null)}
            whileHover={{ 
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            className="relative"
          >
            <Card className={`overflow-hidden transition-all duration-300 border-opacity-50 ${activeGroup === idx ? 'border-emerald-500 dark:border-emerald-400' : ''}`}>
              <div className={`absolute inset-0 bg-gradient-to-br from-emerald-600/5 via-transparent to-transparent transition-opacity duration-300 ${activeGroup === idx ? 'opacity-100' : 'opacity-0'}`} />
              
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    {getIconForSkill(group.title)}
                    <span>{group.title}</span>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{group.caption}</p>
                </div>
                
                <div className="hidden md:flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <div 
                      key={i}
                      className={`w-1.5 h-${3 + i} rounded-full ${i < 4 ? 'bg-emerald-500' : 'bg-emerald-500/30'}`}
                    />
                  ))}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ 
                        duration: 0.2,
                        delay: (idx * 0.05) + (i * 0.05),
                      }}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <Badge 
                        variant="outline" 
                        className={`font-mono text-sm py-1 px-3 shadow-sm transition-all duration-200 border 
                        ${hoveredSkill === skill ? 'scale-105 shadow-md' : ''}
                        ${getSkillColor(skill)}`}
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
