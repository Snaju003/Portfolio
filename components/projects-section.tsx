import Image from "next/image";
import { ExternalLink, Rocket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";

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

	return (
		<div className="space-y-6">
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
				className="text-2xl md:text-3xl font-bold tracking-tight">
				{"Projects"}
			</motion.h2>
			<div className="grid gap-6 md:grid-cols-2">
				{visibleProjects.map((p, idx) => (
					<motion.div
						key={idx}
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{
							duration: 0.6,
							delay: idx * 0.1,
							ease: [0.25, 0.1, 0.25, 1.0],
						}}>
						<Card className="overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
							<CardHeader className="pb-3">
								<div className="flex items-center justify-between">
									<CardTitle className="text-base md:text-lg">
										{p.title}
									</CardTitle>
									<Rocket className="h-4 w-4 text-muted-foreground" />
								</div>
								<p className="text-sm text-muted-foreground">
									{p.subtitle}
								</p>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border bg-muted">
									<Image
										src={
											p.image ||
											"/abstract-geometric-shapes.png"
										}
										alt={p.imageAlt}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
									/>
								</div>
								<ul className="list-disc pl-5 text-sm space-y-2">
									{p.points.map((pt, i) => (
										<li key={i}>{pt}</li>
									))}
								</ul>
								<div className="flex flex-wrap gap-2">
									{p.tech.map((t, i) => (
										<Badge
											key={i}
											variant="secondary"
											className="font-mono">
											{t}
										</Badge>
									))}
								</div>
								<div className="flex flex-wrap gap-3 pt-1">
									{p.links?.live ? (
										<Link
											href={p.links.live}
											target="_blank"
											rel="noreferrer"
											className="inline-flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400 hover:underline underline-offset-4">
											<ExternalLink className="h-4 w-4" />
											{"Live"}
										</Link>
									) : null}
									{p.links?.github ? (
										<Link
											href={p.links.github}
											target="_blank"
											rel="noreferrer"
											className="inline-flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400 hover:underline underline-offset-4">
											<ExternalLink className="h-4 w-4" />
											{"GitHub"}
										</Link>
									) : null}
								</div>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</div>
		</div>
	);
}
