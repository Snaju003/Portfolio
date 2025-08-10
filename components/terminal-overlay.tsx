"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

// Storage key for mobile state
const STORAGE_KEY = "terminal:open";

// Storage key for command history
const CMD_HISTORY_KEY = "terminal:command-history";

export function TerminalOverlay({ person }: { person: Person }) {
	const [open, setOpen] = useState(false);
	const [commits, setCommits] = useState<CommitItem[]>([]);
	const [input, setInput] = useState("");
	const [history, setHistory] = useState<string[]>([]);
	const [commandHistory, setCommandHistory] = useState<string[]>(["help"]);
	const [historyIndex, setHistoryIndex] = useState(-1);
	const inputRef = useRef<HTMLInputElement>(null);
	const terminalOutputRef = useRef<HTMLDivElement>(null);
	
	// Load command history from local storage
	useEffect(() => {
		try {
			const savedHistory = localStorage.getItem(CMD_HISTORY_KEY);
			if (savedHistory) {
				const parsedHistory = JSON.parse(savedHistory);
				if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
					// Always ensure "help" is the first command
					if (parsedHistory[0] !== "help") {
						parsedHistory.unshift("help");
					}
					setCommandHistory(parsedHistory);
				}
			}
		} catch (error) {
			console.error("Failed to load command history:", error);
		}
	}, []);
	
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

	useEffect(() => {
		// Focus the input when the terminal opens
		if (open && inputRef.current) {
			setTimeout(() => {
				inputRef.current?.focus();
			}, 100);
		}
	}, [open]);
	
	// No scroll progress tracking needed
	
	// Add global keyboard shortcut to open terminal (Ctrl+`)
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Ctrl+` or Ctrl+~ (backtick/tilde key)
			if ((e.ctrlKey || e.metaKey) && (e.key === '`' || e.key === '~')) {
				e.preventDefault();
				setOpen(prev => !prev);
			}
		};
		
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);	const handleCommand = (cmd: string) => {
		// Process command
		const normalizedCmd = cmd.trim().toLowerCase();
		let newHistory;
		
		// Handle commands
		if (normalizedCmd === "clear") {
			newHistory = ["help"];
		} else {
			// Add the command to history
			newHistory = [...commandHistory, cmd];
			
			// If not a known command, add error message
			if (!["help", "projects", "contact", "resume", "gitlog"].includes(normalizedCmd)) {
				newHistory.push(`Command not found: ${cmd}. Type 'help' for available commands.`);
			}
		}
		
		// Update command history
		setCommandHistory(newHistory);
		setHistoryIndex(-1);
		
		// Save command history to localStorage
		try {
			localStorage.setItem(CMD_HISTORY_KEY, JSON.stringify(newHistory));
		} catch (error) {
			console.error("Failed to save command history:", error);
		}
		
		// Clear input after command
		setInput("");
		
		// Scroll to bottom after command is processed
		setTimeout(() => {
			if (terminalOutputRef.current) {
				terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight;
			}
		}, 0);
	};
	
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};
	
	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && input.trim()) {
			e.preventDefault();
			handleCommand(input.trim());
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			// Navigate command history upward
			if (commandHistory.length > 0) {
				const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
				setHistoryIndex(newIndex);
				if (newIndex >= 0) {
					setInput(commandHistory[commandHistory.length - 1 - newIndex]);
				}
			}
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			// Navigate command history downward
			const newIndex = historyIndex > 0 ? historyIndex - 1 : -1;
			setHistoryIndex(newIndex);
			if (newIndex >= 0) {
				setInput(commandHistory[commandHistory.length - 1 - newIndex]);
			} else {
				setInput("");
			}
		}
	};

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
				<DialogContent 
					className="max-w-[1000px] w-[95vw] p-0 bg-background border border-emerald-600/30"
					onKeyDown={(e) => {
						// Close dialog on escape key
						if (e.key === "Escape") {
							setOpen(false);
						}
						// Focus input field on Tab
						if (e.key === "Tab") {
							e.preventDefault();
							inputRef.current?.focus();
						}
					}}
				>
					{/* Required DialogTitle for accessibility - visually hidden */}
					<DialogTitle className="sr-only">
						Interactive Terminal
					</DialogTitle>

					<CodeWindow title="interactive" subtitle="bash">
						<div ref={terminalOutputRef} className="space-y-3 text-sm max-h-[60vh] overflow-y-auto">
							{/* Command history display */}
							{commandHistory.map((cmd, index) => {
								// First command is always "help"
								if (index === 0 && cmd === "help") {
									return (
										<div key={`cmd-${index}`}>
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
												,{" "}
												<span className="text-emerald-600 dark:text-emerald-400">
													{"clear"}
												</span>
											</div>
										</div>
									);
								}

								// Handle error messages (starts with "Command not found")
								if (cmd.startsWith("Command not found:")) {
									return (
										<div key={`err-${index}`} className="text-red-500">
											{cmd}
										</div>
									);
								}

								// Handle normal commands
								return (
									<div key={`cmd-${index}`}>
										<TerminalPrompt command={cmd} />
										{cmd === "projects" && (
											<div className="space-x-3">
												<Link
													className="underline underline-offset-4 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
													href="#projects"
													onClick={() => setOpen(false)}>
													{"View Projects"}
												</Link>
											</div>
										)}
										{cmd === "contact" && (
											<div className="space-x-3">
												<Link
													className="underline underline-offset-4 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
													href={`mailto:${person.email}`}>
													{person.email}
												</Link>
												<Link
													className="underline underline-offset-4 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
													href={`tel:${person.phone.replace(/\s+/g, "")}`}>
													{person.phone}
												</Link>
											</div>
										)}
										{cmd === "resume" && (
											<div>
												<a
													className="underline underline-offset-4 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
													href="/Soumya_Raj_Sarkar_Resume__Web_.pdf"
													download>
													{"Download Resume"}
												</a>
											</div>
										)}
										{cmd === "gitlog" && (
											<>
												{commits.length ? (
													<ul className="list-disc pl-5 space-y-1">
														{commits.map((c, i) => (
															<li key={i} className="text-muted-foreground">
																<a
																	href={c.url}
																	target="_blank"
																	rel="noreferrer"
																	className="underline underline-offset-4 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
																	{c.repo.split("/")[1]}
																</a>
																{": "}
																<span className="text-foreground">{c.msg}</span>
															</li>
														))}
													</ul>
												) : (
													<div className="text-muted-foreground">
														{"No recent public commits found or rate-limited. Try again later."}
													</div>
												)}
											</>
										)}
										{cmd === "help" && index > 0 && (
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
												,{" "}
												<span className="text-emerald-600 dark:text-emerald-400">
													{"clear"}
												</span>
											</div>
										)}
									</div>
								);
							})}
							
							{/* Interactive input field */}
							<div className="flex items-center">
								<TerminalPrompt />
								<input
									ref={inputRef}
									type="text"
									value={input}
									onChange={handleInputChange}
									onKeyDown={handleInputKeyDown}
									className="bg-transparent border-none outline-none focus:ring-0 flex-grow ml-2 text-sm"
									autoComplete="off"
									spellCheck="false"
									aria-label="Terminal input"
								/>
							</div>
						</div>
					</CodeWindow>
				</DialogContent>
			</Dialog>
		</>
	);
}
