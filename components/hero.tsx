"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Sparkles,
	Terminal,
	Github,
	Linkedin,
	ChevronDown,
} from "lucide-react";
import { CodeWindow } from "@/components/code-window";
import { motion, useReducedMotion } from "framer-motion";
import { TypedText } from "@/components/typed-text";
import {
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent,
} from "@/components/ui/collapsible";
import { useEffect, useRef, useState } from "react";

type Person = {
	name: string;
	phone: string;
	email: string;
	linkedin: string;
	github: string;
	location: string;
};
type HeroData = {
	openTo: string;
	headlinePrefix: string;
	headlineSuffix: string;
	summary: string;
};

// Storage key for code visibility preference (mobile only)
const STORAGE_KEY = "hero:code-open";

export function Hero({ person, hero }: { person: Person; hero: HeroData }) {
	// Only control collapsible state on mobile; always open on md+
	const [open, setOpen] = useState(false);
	const reduce = useReducedMotion();
	const [isMobile, setIsMobile] = useState(false);
	const hasStored = useRef(false);

	// State to track if name typing is complete to coordinate timing
	const [nameComplete, setNameComplete] = useState(false);

	// Check if mobile on mount and setup listener
	useEffect(() => {
		const checkMobile = () => {
			const mobileView = window.innerWidth < 768;
			setIsMobile(mobileView);
			return mobileView;
		};

		// Initial check
		const initialMobile = checkMobile();

		// Set open state based on mobile status and stored preference
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored !== null) {
			setOpen(stored === "1");
			hasStored.current = true;
		} else {
			// Default open on desktop, closed on mobile
			setOpen(!initialMobile);
		}

		// Listen for resize
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Only persist mobile preference
	useEffect(() => {
		if (isMobile && hasStored.current) {
			try {
				localStorage.setItem(STORAGE_KEY, open ? "1" : "0");
			} catch {}
		}
	}, [open, isMobile]);

	return (
		<section
			className="relative overflow-hidden border-b"
			aria-labelledby="intro-heading">
			<div
				className="pointer-events-none absolute inset-0 -z-10 opacity-40 dark:opacity-30"
				aria-hidden="true"
				style={{
					backgroundImage:
						"radial-gradient(#22c55e33 1px, transparent 1px), radial-gradient(#22c55e33 1px, transparent 1px)",
					backgroundSize: "16px 16px",
					backgroundPosition: "0 0, 8px 8px",
				}}
			/>
			<div className="container max-w-6xl mx-auto px-4 py-10 sm:py-14 md:py-20">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
					<motion.div
						className="space-y-6 text-center md:text-left"
						initial={reduce ? undefined : { opacity: 0, y: 16 }}
						whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={
							reduce
								? undefined
								: { duration: 0.6, ease: "easeOut" }
						}>
						<div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-emerald-600 dark:text-emerald-400 mx-auto md:mx-0">
							<Sparkles className="h-3.5 w-3.5" />
							{hero.openTo}
						</div>
						<h1
							id="intro-heading"
							className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">
							<div className="inline-flex flex-wrap items-baseline">
								<TypedText
									text={`${hero.headlinePrefix} `}
									className="mr-1"
									speed={80}
									startDelay={100}
									showCursor={false} // No cursor for prefix
								/>
								<TypedText
									text={person.name}
									className="font-mono text-emerald-600 dark:text-emerald-400"
									speed={70}
									startDelay={1200}
									onComplete={() => setNameComplete(true)}
								/>
							</div>
							<br className="block sm:hidden" />
							{/* Only show suffix after name is complete for synchronized animation */}
							{nameComplete && (
								<TypedText
									className="block mt-2 text-xl sm:text-2xl md:text-3xl"
									text={hero.headlineSuffix}
									loop
									speed={90}
									loopDelay={2000}
								/>
							)}
						</h1>
						<p className="text-muted-foreground max-w-prose mx-auto md:mx-0">
							{hero.summary}
						</p>

						{/* Mobile CTA grid (2 columns) with animation */}
						<motion.div
							className="grid grid-cols-2 gap-3 w-full md:hidden"
							initial={reduce ? {} : { opacity: 0 }}
							animate={reduce ? {} : { opacity: 1 }}
							transition={{ duration: 0.3 }}
							viewport={{ once: true, amount: 0.4 }}>
							<motion.div
								initial={reduce ? {} : { opacity: 0, y: 8 }}
								animate={reduce ? {} : { opacity: 1, y: 0 }}
								transition={{ duration: 0.35, delay: 0.12 }}>
								<Button
									asChild
									className="w-full bg-emerald-600 hover:bg-emerald-700">
									<Link href="#projects">
										{"View Projects"}
									</Link>
								</Button>
							</motion.div>
							<motion.div
								initial={reduce ? {} : { opacity: 0, y: 8 }}
								animate={reduce ? {} : { opacity: 1, y: 0 }}
								transition={{ duration: 0.35, delay: 0.2 }}>
								<Button
									variant="outline"
									asChild
									className="w-full bg-transparent">
									<Link
										href={person.github}
										target="_blank"
										rel="noreferrer"
										className="flex items-center justify-center gap-2">
										<Github className="h-4 w-4" />
										{"GitHub"}
									</Link>
								</Button>
							</motion.div>
							<motion.div
								initial={reduce ? {} : { opacity: 0, y: 8 }}
								animate={reduce ? {} : { opacity: 1, y: 0 }}
								transition={{ duration: 0.35, delay: 0.28 }}>
								<Button
									variant="outline"
									asChild
									className="w-full bg-transparent">
									<Link
										href={person.linkedin}
										target="_blank"
										rel="noreferrer"
										className="flex items-center justify-center gap-2">
										<Linkedin className="h-4 w-4" />
										{"LinkedIn"}
									</Link>
								</Button>
							</motion.div>
							<motion.div
								initial={reduce ? {} : { opacity: 0, y: 8 }}
								animate={reduce ? {} : { opacity: 1, y: 0 }}
								transition={{ duration: 0.35, delay: 0.36 }}>
								<Button
									variant="secondary"
									asChild
									className="w-full">
									<a
										href="/Soumya_Raj_Sarkar_Resume__Web_.pdf"
										download
										className="font-medium">
										{"Resume"}
									</a>
								</Button>
							</motion.div>
						</motion.div>

						{/* Desktop CTA row with animation */}
						<motion.div
							className="hidden md:flex md:flex-wrap gap-3"
							initial={reduce ? {} : { opacity: 0 }}
							animate={reduce ? {} : { opacity: 1 }}
							transition={{ duration: 0.3 }}
							viewport={{ once: true, amount: 0.4 }}>
							<motion.div
								initial={reduce ? {} : { opacity: 0, y: 8 }}
								animate={reduce ? {} : { opacity: 1, y: 0 }}
								transition={{ duration: 0.35, delay: 0.12 }}>
								<Button
									asChild
									className="bg-emerald-600 hover:bg-emerald-700">
									<Link href="#projects">
										{"View Projects"}
									</Link>
								</Button>
							</motion.div>
							<motion.div
								initial={reduce ? {} : { opacity: 0, y: 8 }}
								animate={reduce ? {} : { opacity: 1, y: 0 }}
								transition={{ duration: 0.35, delay: 0.2 }}>
								<Button
									variant="outline"
									asChild
									className="bg-transparent">
									<Link
										href={person.github}
										target="_blank"
										rel="noreferrer"
										className="flex items-center gap-2">
										<Github className="h-4 w-4" />
										{"GitHub"}
									</Link>
								</Button>
							</motion.div>
							<motion.div
								initial={reduce ? {} : { opacity: 0, y: 8 }}
								animate={reduce ? {} : { opacity: 1, y: 0 }}
								transition={{ duration: 0.35, delay: 0.28 }}>
								<Button
									variant="outline"
									asChild
									className="bg-transparent">
									<Link
										href={person.linkedin}
										target="_blank"
										rel="noreferrer"
										className="flex items-center gap-2">
										<Linkedin className="h-4 w-4" />
										{"LinkedIn"}
									</Link>
								</Button>
							</motion.div>
							<motion.div
								initial={reduce ? {} : { opacity: 0, y: 8 }}
								animate={reduce ? {} : { opacity: 1, y: 0 }}
								transition={{ duration: 0.35, delay: 0.36 }}>
								<Button variant="secondary" asChild>
									<a
										href="/Soumya_Raj_Sarkar_Resume__Web_.pdf"
										download
										className="font-medium">
										{"Download Resume"}
									</a>
								</Button>
							</motion.div>
						</motion.div>

						<div className="text-sm text-muted-foreground font-mono">
							{"// "}
							{person.location}
							{" • "}
							<Link
								href={`mailto:${person.email}`}
								className="underline underline-offset-4">
								{person.email}
							</Link>
							{" • "}
							{person.phone}
						</div>
					</motion.div>

					<motion.div
						initial={reduce ? undefined : { opacity: 0, y: 16 }}
						whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={
							reduce
								? undefined
								: { duration: 0.6, ease: "easeOut", delay: 0.1 }
						}
						className="relative">
						{/* Desktop view - always visible code window with new styling */}
						<div className="hidden md:block">
							<div className="flex items-center justify-between mb-2">
								<h3 className="font-mono text-sm text-muted-foreground flex items-center gap-2">
									<Terminal className="h-3.5 w-3.5" />
									{"Code Portfolio"}
								</h3>
							</div>
							<motion.div
								initial={
									reduce
										? {}
										: { opacity: 0, y: 10, scale: 0.98 }
								}
								animate={
									reduce ? {} : { opacity: 1, y: 0, scale: 1 }
								}
								transition={{
									duration: 0.5,
									ease: [0.22, 1, 0.36, 1],
								}}
								className="shadow-lg dark:shadow-emerald-900/20">
								{/* Terminal-style code window */}
								<CodeWindow title="portfolio" subtitle="developer.js" className="font-mono text-sm">
										<pre className="text-slate-300 leading-relaxed">
											<code>
												<span className="text-purple-400">
													const
												</span>{" "}
												<span className="text-blue-300">
													developer
												</span>{" "}
												<span className="text-white">
													=
												</span>{" "}
												<span className="text-yellow-300">
													{"{"}
												</span>
												<br />
												{"  "}
												<span className="text-emerald-400">
													name
												</span>
												<span className="text-white">
													:
												</span>{" "}
												<span className="text-orange-300">
													"{person.name}"
												</span>
												<span className="text-white">
													,
												</span>
												<br />
												{"  "}
												<span className="text-emerald-400">
													role
												</span>
												<span className="text-white">
													:
												</span>{" "}
												<span className="text-orange-300">
													"Full Stack Developer"
												</span>
												<span className="text-white">
													,
												</span>
												<br />
												{"  "}
												<span className="text-emerald-400">
													location
												</span>
												<span className="text-white">
													:
												</span>{" "}
												<span className="text-orange-300">
													"{person.location}"
												</span>
												<span className="text-white">
													,
												</span>
												<br />
												{"  "}
												<span className="text-emerald-400">
													contact
												</span>
												<span className="text-white">
													:
												</span>{" "}
												<span className="text-orange-300">
													"{person.email}"
												</span>
												<span className="text-white">
													,
												</span>
												<br />
												<br />
												{"  "}
												<span className="text-emerald-400">
													avatar
												</span>
												<span className="text-white">
													:
												</span>{" "}
												<span className="pl-2 inline-flex items-center align-middle">
													<img
														src="/me.jpeg"
														alt={person.name}
														className="w-16 h-16 rounded-full border border-emerald-400 shadow-sm object-cover"
													/>
												</span>
												<br />
												<span className="text-yellow-300">
													{"}"}
												</span>
											</code>
										</pre>
								</CodeWindow>
							</motion.div>
						</div>

						{/* Mobile view - collapsible code window with new styling */}
						<div className="md:hidden">
							<Collapsible open={open} onOpenChange={setOpen}>
								<div className="flex items-center justify-between mb-2">
									<h3 className="font-mono text-sm text-muted-foreground flex items-center gap-2">
										<Terminal className="h-3.5 w-3.5" />
										{"Code Portfolio"}
									</h3>
									<CollapsibleTrigger asChild>
										<Button
											variant="outline"
											size="sm"
											className="gap-1 bg-transparent">
											<ChevronDown
												className={[
													"h-4 w-4 transition-transform",
													open
														? "rotate-180"
														: "rotate-0",
												].join(" ")}
											/>
											{open ? "Hide code" : "Show code"}
										</Button>
									</CollapsibleTrigger>
								</div>
								<CollapsibleContent
									className={
										!reduce
											? "transition-all duration-300 data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden"
											: ""
									}>
									<div className="shadow-lg dark:shadow-emerald-900/20">
										{/* Terminal-style code window for mobile */}
										<CodeWindow title="portfolio" subtitle="developer.js" className="font-mono text-xs">
												<pre className="text-slate-300 leading-relaxed">
													<code>
														<span className="text-purple-400">
															const
														</span>{" "}
														<span className="text-blue-300">
															developer
														</span>{" "}
														<span className="text-white">
															=
														</span>{" "}
														<span className="text-yellow-300">
															{"{"}
														</span>
														<br />
														{"  "}
														<span className="text-emerald-400">
															name
														</span>
														<span className="text-white">
															:
														</span>{" "}
														<span className="text-orange-300">
															"{person.name}"
														</span>
														<span className="text-white">
															,
														</span>
														<br />
														{"  "}
														<span className="text-emerald-400">
															role
														</span>
														<span className="text-white">
															:
														</span>{" "}
														<span className="text-orange-300">
															"Full Stack
															Developer"
														</span>
														<span className="text-white">
															,
														</span>
														<br />
														{"  "}
														<span className="text-emerald-400">
															location
														</span>
														<span className="text-white">
															:
														</span>{" "}
														<span className="text-orange-300">
															"{person.location}"
														</span>
														<span className="text-white">
															,
														</span>
														<br />
														{"  "}
														<span className="text-emerald-400">
															contact
														</span>
														<span className="text-white">
															:
														</span>{" "}
														<span className="text-orange-300">
															"{person.email}"
														</span>
														<span className="text-white">
															,
														</span>
														<br />
														<br />
														{"  "}
														<span className="text-emerald-400">
															avatar
														</span>
														<span className="text-white">
															:
														</span>{" "}
														<span className="pl-2 inline-flex items-center align-middle">
															<img
																src="/me.jpeg"
																alt={
																	person.name
																}
																className="w-14 h-14 rounded-full border border-emerald-400 shadow-sm object-cover"
															/>
														</span>
														<br />
														<span className="text-yellow-300">
															{"}"}
														</span>
													</code>
												</pre>
										</CodeWindow>
									</div>
								</CollapsibleContent>
							</Collapsible>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
