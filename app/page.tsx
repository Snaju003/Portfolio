"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { AchievementsSection } from "@/components/achievements-section";
import { ContactCard } from "@/components/contact-card";
import { Footer } from "@/components/footer";
import { Skeleton } from "@/components/ui/skeleton";
import { TerminalOverlay } from "@/components/terminal-overlay";
import { Loader } from "@/components/loader";
import { AnimatedContentWrapper } from "@/components/animated-content-wrapper";

type Data = {
	brand: string;
	person: {
		name: string;
		phone: string;
		email: string;
		linkedin: string;
		github: string;
		location: string;
	};
	hero: {
		openTo: string;
		headlinePrefix: string;
		headlineSuffix: string;
		summary: string;
	};
	education: {
		school: string;
		degree: string;
		range: string;
	};
	experiences: Array<{
		company: string;
		role: string;
		location: string;
		range: string;
		highlights: string[];
		stack?: string[];
	}>;
	projects: Array<{
		title: string;
		subtitle: string;
		image?: string;
		imageAlt: string;
		visible?: boolean;
		points: string[];
		tech: string[];
		links?: { live?: string; github?: string };
	}>;
	skills: Array<{ title: string; caption: string; items: string[] }>;
	achievements: Array<{ title: string; org: string; detail: string }>;
};

export default function Page() {
	const [data, setData] = useState<Data | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let active = true;
		(async () => {
			try {
				// Intentional small delay to ensure loader is shown for at least a moment
				await new Promise((resolve) => setTimeout(resolve, 800));
				const res = await fetch("/data.json", { cache: "no-store" });
				const json = await res.json();
				if (active) setData(json);
			} catch (error) {
				console.error("Failed to fetch data:", error);
			}
		})();
		return () => {
			active = false;
		};
	}, []);

	// Show loader while loading
	if (isLoading || !data) {
		return <Loader onComplete={() => setIsLoading(false)} />;
	}

	// Main content - only render when data is loaded and loader is complete
	return (
		<AnimatedContentWrapper>
			<main
				id="main"
				tabIndex={-1}
				className="min-h-screen flex flex-col">
				<SiteHeader brand={data.brand} person={data.person} />
				<div className="flex-1">
					<Hero person={data.person} hero={data.hero} />
					<section
						id="experience"
						className="scroll-mt-24 py-12 md:py-16">
						<div className="container max-w-6xl mx-auto px-4">
							<ExperienceTimeline
								experiences={data.experiences}
							/>
						</div>
					</section>
					<section
						id="projects"
						className="scroll-mt-24 py-12 md:py-16 bg-muted/40">
						<div className="container max-w-6xl mx-auto px-4">
							<ProjectsSection projects={data.projects} />
						</div>
					</section>
					<section
						id="skills"
						className="scroll-mt-24 py-12 md:py-16">
						<div className="container max-w-6xl mx-auto px-4">
							<SkillsSection skills={data.skills} />
						</div>
					</section>
					<section
						id="achievements"
						className="scroll-mt-24 py-12 md:py-16 bg-muted/40">
						<div className="container max-w-6xl mx-auto px-4">
							<AchievementsSection
								achievements={data.achievements}
							/>
						</div>
					</section>
					<section
						id="contact"
						className="scroll-mt-24 py-12 md:py-16">
						<div className="container max-w-6xl mx-auto px-4">
							<ContactCard person={data.person} />
						</div>
					</section>
				</div>
				<Footer />
				<TerminalOverlay person={data.person} />
			</main>
		</AnimatedContentWrapper>
	);
}
