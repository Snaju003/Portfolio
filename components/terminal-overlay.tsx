"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Terminal } from "lucide-react";
import { CodeWindow } from "./code-window";
import { TerminalPrompt } from "./terminal-elements";
import Link from "next/link";

type Person = {
	name: string;
	phone: string;
	email: string;
	linkedin: string;
	github: string;
	location: string;
};

type CommitItem = { msg: string; repo: string; url: string; date: string };

export function TerminalOverlay({ person }: { person: Person }) {
	const [open, setOpen] = useState(false);
	const [commits, setCommits] = useState<CommitItem[]>([]);
	const username = useMemo(
		() =>
			person.github ? person.github.split("github.com/")[1] : "Snaju003",
		[person.github]
	);

	useEffect(() => {
		let aborted = false;
		const key = `gitlog:${username}`;
		const ttl = 10 * 60 * 1000; // 10 minutes
		(async () => {
			try {
				// Check if we're in a browser environment
				if (typeof window === "undefined") return;

				const cached = localStorage.getItem(key);
				if (cached) {
					const parsed = JSON.parse(cached) as {
						at: number;
						items: CommitItem[];
					};
					if (Date.now() - parsed.at < ttl) {
						if (!aborted) setCommits(parsed.items);
						return;
					}
				}
				const res = await fetch(
					`https://api.github.com/users/${username}/events/public`,
					{
						headers: { "User-Agent": "soumya-portfolio" },
					}
				);
				if (!res.ok) throw new Error("GitHub API error");
				const events = await res.json();
				const items: CommitItem[] = [];
				for (const ev of events) {
					if (ev.type !== "PushEvent") continue;
					const repo: string = ev.repo?.name || "";
					const date: string = ev.created_at;
					const commitsList = ev.payload?.commits || [];
					for (const c of commitsList) {
						if (items.length >= 5) break;
						const sha = c.sha;
						const msg = c.message;
						const url = `https://github.com/${repo}/commit/${sha}`;
						items.push({ msg, repo, url, date });
					}
					if (items.length >= 5) break;
				}
				if (!aborted) {
					setCommits(items);
					if (typeof window !== "undefined") {
						localStorage.setItem(
							key,
							JSON.stringify({ at: Date.now(), items })
						);
					}
				}
			} catch (_e) {
				if (!aborted) setCommits([]);
			}
		})();
		return () => {
			aborted = true;
		};
	}, [username]);

	return (
		<>
			<Button
				aria-label="Open Terminal"
				onClick={() => setOpen(true)}
				className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg bg-emerald-600 hover:bg-emerald-700 transition-colors">
				<Terminal className="h-5 w-5 mr-2" />
				{"Open Terminal"}
			</Button>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="max-w-[1000px] w-[95vw] p-0 bg-background border border-emerald-600/30">
					{/* Required DialogTitle for accessibility - visually hidden */}
					<DialogTitle className="sr-only">
						Interactive Terminal
					</DialogTitle>

					<CodeWindow title="interactive" subtitle="bash">
						<div className="space-y-3 text-sm">
							<TerminalPrompt command="help" />
							<div className="text-muted-foreground">
								{"Commands: "}
								<span className="text-emerald-600 dark:text-emerald-400">
									{"projects"}
								</span>
								,{" "}
								<span className="text-emerald-600 dark:text-emerald-400">
									{"contact"}
								</span>
								,{" "}
								<span className="text-emerald-600 dark:text-emerald-400">
									{"resume"}
								</span>
								,{" "}
								<span className="text-emerald-600 dark:text-emerald-400">
									{"gitlog"}
								</span>
							</div>

							<TerminalPrompt command="projects" />
							<div className="space-x-3">
								<Link
									className="underline underline-offset-4 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
									href="#projects"
									onClick={() => setOpen(false)}>
									{"View Projects"}
								</Link>
							</div>

							<TerminalPrompt command="contact" />
							<div className="space-x-3">
								<Link
									className="underline underline-offset-4 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
									href={`mailto:${person.email}`}>
									{person.email}
								</Link>
								<Link
									className="underline underline-offset-4 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
									href={`tel:${person.phone.replace(
										/\s+/g,
										""
									)}`}>
									{person.phone}
								</Link>
							</div>

							<TerminalPrompt command="resume" />
							<div>
								<a
									className="underline underline-offset-4 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
									href="/Soumya_Raj_Sarkar_Resume__Web_.pdf"
									download>
									{"Download Resume"}
								</a>
							</div>

							<TerminalPrompt command="gitlog" />
							{commits.length ? (
								<ul className="list-disc pl-5 space-y-1">
									{commits.map((c, i) => (
										<li
											key={i}
											className="text-muted-foreground">
											<a
												href={c.url}
												target="_blank"
												rel="noreferrer"
												className="underline underline-offset-4 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
												{c.repo.split("/")[1]}
											</a>
											{": "}
											<span className="text-foreground">
												{c.msg}
											</span>
										</li>
									))}
								</ul>
							) : (
								<div className="text-muted-foreground">
									{
										"No recent public commits found or rate-limited. Try again later."
									}
								</div>
							)}
						</div>
					</CodeWindow>
				</DialogContent>
			</Dialog>
		</>
	);
}
