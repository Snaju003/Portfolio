import Image from "next/image";
import { ExternalLink, Rocket, Terminal, Code, Github, Globe, PanelRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Project = {
	title: string;
	subtitle: string;
	image?: string;
	imageAlt: string;
	visible?: boolean;
	points: string[];
	tech: string[];
	links?: { live?: string; github?: string };
};

export function ProjectsSection({ projects }: { projects: Project[] }) {
	// Filter projects to only show those that are visible (or where visible is undefined)
	const visibleProjects = projects.filter((p) => p.visible !== false);
	const [activeProject, setActiveProject] = useState<number | null>(null);

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
					className="absolute inset-x-0 top-8 md:top-10 flex justify-center -z-10 opacity-30"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 0.3 }}
					viewport={{ once: true }}
					transition={{ duration: 0.7, delay: 0.2 }}
				>
					<div className="w-32 h-32 rounded-full bg-gradient-radial from-emerald-500/20 via-transparent to-transparent blur-xl" />
				</motion.div>

				<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-emerald-600 to-emerald-400 dark:from-emerald-400 dark:to-emerald-200 bg-clip-text text-transparent">
					{"Recent Projects"}
				</h2>
				<p className="text-muted-foreground max-w-2xl mx-auto">
					A collection of applications I've built using modern technologies and best practices.
				</p>
			</motion.div>

			<div className="grid gap-8 md:grid-cols-2">
				{visibleProjects.map((p, idx) => {
					const isActive = activeProject === idx;
					
					return (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{
								duration: 0.6,
								delay: idx * 0.1,
								ease: [0.25, 0.1, 0.25, 1.0],
							}}
							onMouseEnter={() => setActiveProject(idx)}
							onMouseLeave={() => setActiveProject(null)}
							className="relative"
						>
							{/* Terminal-style glow effect behind card */}
							<div className={cn(
								"absolute -inset-0.5 rounded-xl opacity-0 transition-opacity duration-300 blur-sm",
								"bg-emerald-500/20",
								isActive ? "opacity-70" : "opacity-0"
							)}/>
							
							<Card className={cn(
								"overflow-hidden border-2 transition-all duration-300 relative h-full",
								isActive ? "border-emerald-500/60 dark:border-emerald-400/60 shadow-lg" : "border-emerald-600/20"
							)}>
								<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"/>
								
								<CardHeader className="pb-3 bg-neutral-950/5 dark:bg-neutral-900/20 border-b border-emerald-600/20">
									<div className="flex items-center gap-2 pb-1">
										<span className="h-3 w-3 rounded-full bg-red-500/70" />
										<span className="h-3 w-3 rounded-full bg-yellow-500/70" />
										<span className="h-3 w-3 rounded-full bg-green-500/70" />
										<span className="ml-2 text-xs text-muted-foreground font-mono">projects • terminal</span>
									</div>
									<div className="flex items-center justify-between pt-2">
										<CardTitle className="text-base md:text-lg font-mono">
											<motion.div 
												className="flex items-center gap-2" 
												initial={false}
												animate={isActive ? {x: [0, 5, 0]} : {}}
												transition={{duration: 0.5}}
											>
												<Terminal className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
												{p.title}
											</motion.div>
										</CardTitle>
										<motion.div 
											animate={isActive ? {rotate: [0, 15, 0, -15, 0]} : {}}
											transition={{duration: 0.5}}
										>
											<Code className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
										</motion.div>
									</div>
									<p className="text-sm text-muted-foreground font-mono">
										$ {p.subtitle}
									</p>
								</CardHeader>
								
								<CardContent className="space-y-4 relative">
									{/* Terminal-like cursor blinking effect */}
									{isActive && (
										<motion.div
											className="absolute top-5 left-4 w-2 h-5 bg-emerald-500/70"
											initial={{opacity: 0}}
											animate={{opacity: [0, 1, 0]}}
											transition={{duration: 1, repeat: Infinity}}
										/>
									)}
									
									<div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border border-emerald-600/30 mt-4">
										<motion.div
											className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 z-10 opacity-0 transition-opacity duration-300"
											animate={isActive ? {opacity: 0.6} : {opacity: 0}}
										/>
										<Image
											src={p.image || "/abstract-geometric-shapes.png"}
											alt={p.imageAlt}
											fill
											loading="lazy"
											placeholder="blur"
											blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGGHVsnwAAAAABJRU5ErkJggg=="
											className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
										/>
									</div>
									
									<ul className="list-none pl-4 text-sm space-y-2 font-mono">
										{p.points.map((pt, i) => (
											<motion.li 
												key={i} 
												className="flex items-start gap-2"
												initial={{opacity: 0.8}}
												animate={isActive ? {opacity: 1, x: [0, 2, 0]} : {opacity: 0.8}}
												transition={{duration: 0.3, delay: i * 0.1}}
											>
												<span className="text-emerald-500 dark:text-emerald-400 mt-1">{">"}</span>
												{pt}
											</motion.li>
										))}
									</ul>
									
									<div className="flex flex-wrap gap-2 pt-2">
										{p.tech.map((t, i) => (
											<motion.div
												key={i}
												whileHover={{scale: 1.05, y: -2}}
												initial={{opacity: 0.8}}
												animate={isActive ? {opacity: 1} : {opacity: 0.8}}
												transition={{delay: i * 0.05}}
											>
												<Badge
													variant="outline"
													className="font-mono border-emerald-600/30 bg-neutral-950/5 dark:bg-neutral-900/20 text-xs">
													{t}
												</Badge>
											</motion.div>
										))}
									</div>
									
									<div className="flex flex-wrap gap-3 pt-2">
										{p.links?.live ? (
											<motion.div
												whileHover={{scale: 1.05}}
												transition={{duration: 0.2}}
											>
												<Link
													href={p.links.live}
													target="_blank"
													rel="noreferrer"
													className="inline-flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors font-mono">
													<Globe className="h-4 w-4" />
													{"$ open live-demo"}
												</Link>
											</motion.div>
										) : null}
										{p.links?.github ? (
											<motion.div
												whileHover={{scale: 1.05}}
												transition={{duration: 0.2}}
											>
												<Link
													href={p.links.github}
													target="_blank"
													rel="noreferrer"
													className="inline-flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors font-mono">
													<Github className="h-4 w-4" />
													{"$ view source"}
												</Link>
											</motion.div>
										) : null}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
