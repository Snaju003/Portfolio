"use client";

import Link from "next/link";
import {
	Github,
	Linkedin,
	Mail,
	Phone,
	Menu,
	Briefcase,
	Rocket,
	Star,
	UsersRound,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";

type Person = {
	name: string;
	phone: string;
	email: string;
	linkedin: string;
	github: string;
	location: string;
} | null;

const navLinks = [
	{ href: "#experience", label: "Experience", icon: Briefcase },
	{ href: "#projects", label: "Projects", icon: Rocket },
	{ href: "#skills", label: "Skills", icon: Star },
	{ href: "#achievements", label: "Achievements", icon: UsersRound },
	{ href: "#contact", label: "Contact", icon: Mail },
];

function colorForProgress(p: number) {
	if (p > 0.9) return "rgb(132, 204, 22)"; // lime-500
	if (p > 0.7) return "rgb(52, 211, 153)"; // emerald-400
	return "rgb(16, 185, 129)"; // emerald-600
}

export function SiteHeader({
	brand,
	person,
}: {
	brand: string;
	person: Person;
}) {
	const [active, setActive] = useState<string>("#experience");
	const [progress, setProgress] = useState(0);
	const [menuOpen, setMenuOpen] = useState(false);
	const [sectionProg, setSectionProg] = useState<Record<string, number>>({});
	const [reduced, setReduced] = useState(false);
	const lastAnnouncedRef = useRef<string>("");
	const hashDebounceRef = useRef<number | null>(null);
	const [ariaMessage, setAriaMessage] = useState("");

	const barColor = useMemo(() => colorForProgress(progress), [progress]);

	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduced(mq.matches);
		const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
		if (mq.addEventListener) mq.addEventListener("change", onChange);
		else mq.addListener(onChange as any);
		return () => {
			if (mq.removeEventListener)
				mq.removeEventListener("change", onChange);
			else mq.removeListener(onChange as any);
		};
	}, []);

	// Active link highlighting via IntersectionObserver
	useEffect(() => {
		const ids = navLinks.map((l) => l.href.replace("#", ""));
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const newHash = `#${entry.target.id}`;
						setActive(newHash);
					}
				});
			},
			{ rootMargin: "0px 0px -50% 0px", threshold: 0.1 }
		);
		ids.forEach((id) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});
		return () => observer.disconnect();
	}, []);

	// Persist last viewed section to URL hash without scrolling (debounced)
	useEffect(() => {
		if (!active) return;
		if (location.hash === active) return;
		if (hashDebounceRef.current)
			window.clearTimeout(hashDebounceRef.current);
		hashDebounceRef.current = window.setTimeout(() => {
			history.replaceState(null, "", active);
		}, 250);
		return () => {
			if (hashDebounceRef.current)
				window.clearTimeout(hashDebounceRef.current);
		};
	}, [active]);

	// Fixed progress calculation
	useEffect(() => {
		const ids = navLinks.map((l) => l.href.replace("#", ""));

		const onScroll = () => {
			const scrollTop = window.scrollY;
			const docHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const p = Math.min(1, Math.max(0, scrollTop / (docHeight || 1)));
			setProgress(p);

			const newProg: Record<string, number> = {};
			const viewportHeight = window.innerHeight;

			// Check if we've reached the bottom of the page
			const distanceFromBottom =
				document.documentElement.scrollHeight -
				scrollTop -
				viewportHeight;
			const isNearBottom = distanceFromBottom <= 10;

			ids.forEach((id, index) => {
				const el = document.getElementById(id);
				if (!el) return;

				const rect = el.getBoundingClientRect();
				const elementTop = scrollTop + rect.top;
				const elementHeight = el.offsetHeight;
				const elementBottom = elementTop + elementHeight;

				// Calculate how much of the section has been scrolled through
				let sectionProgress = 0;

				// If we're at the bottom of the page, mark all sections as 100%
				if (isNearBottom) {
					sectionProgress = 1;
				} else if (scrollTop >= elementTop) {
					// We've scrolled past the start of the section
					const scrolledIntoSection = scrollTop - elementTop;
					sectionProgress = Math.min(
						1,
						scrolledIntoSection / elementHeight
					);
				}

				// Special handling for the contact section (last section)
				if (index === ids.length - 1 && isNearBottom) {
					sectionProgress = 1; // Force 100% when near bottom
				}

				// Ensure progress is between 0 and 1
				sectionProgress = Math.min(1, Math.max(0, sectionProgress));
				newProg[`#${id}`] = sectionProgress;
			});

			setSectionProg(newProg);
		};

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);

	const activeLabel = useMemo(() => {
		const item = navLinks.find((n) => n.href === active);
		return item?.label ?? "";
	}, [active]);

	// Update live region message AFTER mount
	useEffect(() => {
		if (!activeLabel) return;
		if (lastAnnouncedRef.current === activeLabel) return;
		lastAnnouncedRef.current = activeLabel;
		setAriaMessage(`Section: ${activeLabel}`);
	}, [activeLabel]);

	function goto(href: string) {
		const link = document.querySelector(
			`a[href="${href}"]`
		) as HTMLAnchorElement | null;
		if (link) {
			link.click();
			return;
		}
		window.location.hash = href;
	}

	function ProgressDot({ href, label }: { href: string; label: string }) {
		const p = sectionProg[href] ?? 0;
		const angle = Math.floor(p * 360);
		const dotColor = colorForProgress(p);
		const pct = Math.round(p * 100);

		return (
			<Tooltip delayDuration={150}>
				<TooltipTrigger asChild>
					<span
						className="relative inline-block h-2.5 w-2.5 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full shrink-0"
						tabIndex={0}
						role="link"
						aria-label={`${label} progress ${pct} percent. Press Enter to navigate.`}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								goto(href);
							}
						}}>
						<span
							aria-hidden
							className="absolute inset-0 rounded-full"
							style={{
								background: `conic-gradient(${dotColor} ${angle}deg, transparent 0deg)`,
								transition: reduced
									? "none"
									: "background 300ms ease",
							}}
						/>
						<span
							className="absolute inset-[2px] rounded-full bg-background"
							aria-hidden
						/>
						<span
							className="absolute inset-0 rounded-full ring-1 ring-border"
							aria-hidden
						/>
					</span>
				</TooltipTrigger>
				<TooltipContent
					side="top"
					sideOffset={6}
					className="font-mono text-xs">
					<span>{label}</span>
					<span>{": "}</span>
					<span className="text-emerald-600 dark:text-emerald-400">
						{pct}%
					</span>
				</TooltipContent>
			</Tooltip>
		);
	}

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			{/* Live region for screen readers */}
			<span className="sr-only" role="status" aria-live="polite">
				{ariaMessage}
			</span>

			<div className="container max-w-7xl mx-auto h-16 px-3 sm:px-4 lg:px-6">
				{/* Mobile Layout */}
				<div className="flex md:hidden items-center justify-between h-full">
					{/* Mobile Menu Button */}
					<div className="flex items-center">
						<Sheet open={menuOpen} onOpenChange={setMenuOpen}>
							<SheetTrigger asChild>
								<Button
									variant="outline"
									size="icon"
									className="h-9 w-9"
									aria-label="Open menu">
									<Menu className="h-4 w-4" />
								</Button>
							</SheetTrigger>
							<SheetContent
								side="right"
								className={cn(
									"p-0 overflow-hidden w-80 max-w-[85vw]",
									reduced
										? ""
										: "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-right-1/2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-right-1/2 duration-300"
								)}>
								<div className="border-b bg-neutral-900/70 text-emerald-200">
									<div className="flex items-center gap-2 px-4 py-3 border-b border-emerald-700/30">
										<span className="h-3 w-3 rounded-full bg-red-500/80" />
										<span className="h-3 w-3 rounded-full bg-yellow-500/80" />
										<span className="h-3 w-3 rounded-full bg-green-500/80" />
										<span className="ml-2 text-xs">
											menu • terminal
										</span>
									</div>
									<SheetHeader className="px-4 py-3">
										<SheetTitle className="font-mono text-emerald-300 text-left">
											{`<${brand} />`}
										</SheetTitle>
									</SheetHeader>
								</div>
								<div className="px-4 py-4 font-mono">
									<Button
										variant="ghost"
										className="mb-3 justify-start h-auto p-2"
										onClick={() => {
											setMenuOpen(false);
											setTimeout(() => {
												document
													.getElementById("main")
													?.focus();
											}, 0);
										}}>
										Skip navigation
									</Button>

									<TooltipProvider>
										<nav className="grid gap-2">
											{navLinks.map((item) => {
												const Icon = item.icon;
												const isActive =
													active === item.href;
												const ariaCurrent = isActive
													? "page"
													: undefined;
												const pct = Math.round(
													(sectionProg[item.href] ??
														0) * 100
												);
												return (
													<Link
														key={item.href}
														href={item.href}
														onClick={() =>
															setMenuOpen(false)
														}
														aria-current={
															ariaCurrent as any
														}
														className={cn(
															"group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors",
															isActive
																? "bg-emerald-600/10 text-emerald-700 dark:text-emerald-300"
																: "text-muted-foreground hover:text-foreground hover:bg-accent/50"
														)}>
														<ProgressDot
															href={item.href}
															label={item.label}
														/>
														<Icon className="h-4 w-4 shrink-0" />
														<span className="flex-1">
															{item.label}
														</span>
														{isActive && (
															<span className="text-[10px] font-mono text-muted-foreground shrink-0">
																{pct}%
															</span>
														)}
													</Link>
												);
											})}
										</nav>
									</TooltipProvider>

									<div className="my-4 h-px bg-border" />

									{/* Social Links Grid */}
									<div className="grid grid-cols-4 gap-3 mb-4">
										{person?.email && (
											<Link
												href={`mailto:${person.email}`}
												aria-label="Email"
												className="flex items-center justify-center h-10 text-muted-foreground hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md hover:bg-accent/50 transition-colors"
												onClick={() =>
													setMenuOpen(false)
												}>
												<Mail className="h-5 w-5" />
											</Link>
										)}
										{person?.phone && (
											<Link
												href={`tel:${person.phone.replace(
													/\s+/g,
													""
												)}`}
												aria-label="Call"
												className="flex items-center justify-center h-10 text-muted-foreground hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md hover:bg-accent/50 transition-colors"
												onClick={() =>
													setMenuOpen(false)
												}>
												<Phone className="h-5 w-5" />
											</Link>
										)}
										{person?.github && (
											<Link
												href={person.github}
												target="_blank"
												rel="noreferrer"
												aria-label="GitHub"
												className="flex items-center justify-center h-10 text-muted-foreground hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md hover:bg-accent/50 transition-colors"
												onClick={() =>
													setMenuOpen(false)
												}>
												<Github className="h-5 w-5" />
											</Link>
										)}
										{person?.linkedin && (
											<Link
												href={person.linkedin}
												target="_blank"
												rel="noreferrer"
												aria-label="LinkedIn"
												className="flex items-center justify-center h-10 text-muted-foreground hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md hover:bg-accent/50 transition-colors"
												onClick={() =>
													setMenuOpen(false)
												}>
												<Linkedin className="h-5 w-5" />
											</Link>
										)}
									</div>

									<Button asChild className="w-full mb-3">
										<a
											href="/Soumya_Raj_Sarkar_Resume__Web_.pdf"
											download>
											Download Resume
										</a>
									</Button>

								</div>
							</SheetContent>
						</Sheet>
					</div>

					{/* Mobile Brand - Centered */}
					<div className="absolute left-1/2 transform -translate-x-1/2">
						<Link
							href="#"
							className="font-mono font-semibold text-base sm:text-lg tracking-tight whitespace-nowrap">
							{`<${brand} />`}
						</Link>
					</div>

					{/* Mobile Theme Toggle */}
					<div className="flex items-center">
						<ThemeToggle />
					</div>
				</div>

				{/* Desktop Layout */}
				<div className="hidden md:grid md:grid-cols-3 items-center h-full gap-4">
					{/* Desktop Brand */}
					<div className="flex items-center">
						<Link
							href="#"
							className="font-mono font-semibold text-lg lg:text-xl tracking-tight">
							{`<${brand} />`}
						</Link>
					</div>

					{/* Desktop Navigation - Centered */}
					<div className="justify-self-center">
						<TooltipProvider>
							<NavigationMenu>
								<NavigationMenuList className="flex justify-center gap-1">
									{navLinks.map((item) => {
										const isActive = active === item.href;
										const pct = Math.round(
											(sectionProg[item.href] ?? 0) * 100
										);
										return (
											<NavigationMenuItem key={item.href}>
												<Link
													href={item.href}
													legacyBehavior
													passHref>
													<NavigationMenuLink
														aria-current={
															isActive
																? "page"
																: undefined
														}
														className={cn(
															navigationMenuTriggerStyle(),
															"font-mono transition-all duration-200 flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background text-sm lg:text-base px-3 py-2",
															isActive &&
																"bg-emerald-600/10 text-emerald-700 dark:text-emerald-300"
														)}>
														<ProgressDot
															href={item.href}
															label={item.label}
														/>
														<span className="hidden lg:inline">
															{item.label}
														</span>
														<span className="lg:hidden">
															{item.label.slice(
																0,
																3
															)}
														</span>
														{isActive && (
															<span
																className="text-[10px] font-mono text-muted-foreground"
																aria-hidden>
																{pct}%
															</span>
														)}
													</NavigationMenuLink>
												</Link>
											</NavigationMenuItem>
										);
									})}
								</NavigationMenuList>
							</NavigationMenu>
						</TooltipProvider>
					</div>

					{/* Desktop Right Section */}
					<div className="justify-self-end flex items-center gap-2">
						{/* Resume Download Button */}
						<Button
							asChild
							variant="outline"
							size="sm"
							className="hidden xl:inline-flex bg-transparent">
							<a
								href="/Soumya_Raj_Sarkar_Resume__Web_.pdf"
								download>
								Download Resume
							</a>
						</Button>

						{/* Theme Toggle */}
						<ThemeToggle />
					</div>
				</div>
			</div>

			{/* Progress Bar */}
			<div
				className="h-0.5 bg-emerald-600/20"
				role="progressbar"
				aria-label="Page scroll progress"
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={Math.round(progress * 100)}>
				<span
					className="block h-0.5 origin-left"
					style={{
						transform: `scaleX(${progress})`,
						backgroundColor: barColor,
						transition: reduced
							? "none"
							: "transform 220ms cubic-bezier(0.22,1,0.36,1), background-color 300ms ease",
					}}
				/>
			</div>
		</header>
	);
}
