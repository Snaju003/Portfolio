"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { sendMessage } from "@/app/actions/send-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, X, Minus, Terminal } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

type Person = {
	name: string;
	phone: string;
	email: string;
	linkedin: string;
	github: string;
	location: string;
};

type FormState = { ok: boolean; message: string };

export function ContactCard({ person }: { person: Person }) {
	const { toast } = useToast();
	const formRef = useRef<HTMLFormElement>(null);
	const [activeField, setActiveField] = useState<string | null>(null);
	const [state, formAction, pending] = useActionState<FormState, FormData>(
		sendMessage as any,
		{
			ok: false,
			message: "",
		}
	);

	// Use useEffect to show toasts only when state changes
	useEffect(() => {
		if (state?.message) {
			if (state.ok) {
				toast({
					title: "Message sent successfully",
					description: state.message,
					variant: "default",
				});

				// Reset form on successful submission
				if (formRef.current) {
					formRef.current.reset();
				}
			} else {
				toast({
					title: "Message not sent",
					description: state.message,
					variant: "destructive",
				});
			}
		}
	}, [state, toast]);

	const formFieldVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
				delay: 0.3 + i * 0.1,
			},
		}),
	};

	const blinkingCursor = (
		<motion.span
			className="inline-block w-2 h-4 bg-emerald-600 dark:bg-emerald-400 ml-1"
			animate={{ opacity: [1, 0, 1] }}
			transition={{ duration: 1, repeat: Infinity }}
		/>
	);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5 }}
			className="grid md:grid-cols-2 gap-6 mt-6">
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, delay: 0.1 }}>
				<Card className="border-2 border-emerald-600/30 overflow-hidden">
					<CardHeader className="pb-3 bg-neutral-950/5 dark:bg-neutral-900/20 border-b border-emerald-600/20">
						<div className="flex items-center gap-2 pb-1">
							<span className="h-3 w-3 rounded-full bg-red-500/70" />
							<span className="h-3 w-3 rounded-full bg-yellow-500/70" />
							<span className="h-3 w-3 rounded-full bg-green-500/70" />
							<span className="ml-2 text-xs text-muted-foreground font-mono">contact • terminal</span>
						</div>
						<CardTitle className="text-lg font-mono mt-2">{"$ contact --new-message"}</CardTitle>
						<p className="text-sm text-emerald-600 dark:text-emerald-400 font-mono">
							{"// Have a project or an idea? Send a message and I'll get back to you."}
						</p>
					</CardHeader>
					<CardContent className="p-4 relative">
						<form
							ref={formRef}
							action={(formData) => {
								formAction(formData);
							}}
							className="space-y-4 font-mono">
							<motion.div
								className="grid gap-2"
								custom={0}
								variants={formFieldVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}>
								<label htmlFor="name" className="text-sm flex items-center gap-2">
									<span className="text-emerald-600 dark:text-emerald-400">$</span>
									{"NAME:"}
									{activeField === 'name' && blinkingCursor}
								</label>
								<Input
									id="name"
									name="name"
									placeholder="John Doe"
									required
									className="bg-neutral-950/5 dark:bg-neutral-900/20 border-emerald-600/30 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
									onFocus={() => setActiveField('name')}
									onBlur={() => setActiveField(null)}
								/>
							</motion.div>
							<motion.div
								className="grid gap-2"
								custom={1}
								variants={formFieldVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}>
								<label htmlFor="email" className="text-sm flex items-center gap-2">
									<span className="text-emerald-600 dark:text-emerald-400">$</span>
									{"EMAIL:"}
									{activeField === 'email' && blinkingCursor}
								</label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="johndoe123@example.com"
									required
									title="Please enter a valid email address"
									className="bg-neutral-950/5 dark:bg-neutral-900/20 border-emerald-600/30 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
									onFocus={() => setActiveField('email')}
									onBlur={() => setActiveField(null)}
								/>
							</motion.div>
							<motion.div
								className="grid gap-2"
								custom={2}
								variants={formFieldVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}>
								<label htmlFor="message" className="text-sm flex items-center gap-2">
									<span className="text-emerald-600 dark:text-emerald-400">$</span>
									{"MESSAGE:"}
									{activeField === 'message' && blinkingCursor}
								</label>
								<Textarea
									id="message"
									name="message"
									placeholder="Tell me about your idea or project requirements..."
									rows={5}
									required
									minLength={10}
									maxLength={1000}
									className="bg-neutral-950/5 dark:bg-neutral-900/20 border-emerald-600/30 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
									onFocus={() => setActiveField('message')}
									onBlur={() => setActiveField(null)}
								/>
								<div className="text-xs text-muted-foreground text-right font-mono">
									// Max 1000 characters
								</div>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: 0.6 }}>
								<div className="flex gap-2">
									<Button
										type="submit"
										className="bg-emerald-600 hover:bg-emerald-700 border border-emerald-700/30 transition-all font-mono"
										disabled={pending}>
										{pending ? (
											<span className="flex items-center gap-2">
												<svg
													className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24">
													<circle
														className="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"></circle>
													<path
														className="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
												</svg>
												EXECUTING...
											</span>
										) : (
											"$ SUBMIT"
										)}
									</Button>
								</div>
							</motion.div>
							{state?.message && !state.ok ? (
								<p className="text-sm text-red-600 mt-2 font-mono">
									{"// Error: "}{state.message}
								</p>
							) : null}
						</form>
					</CardContent>
				</Card>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, delay: 0.3 }}>
				<Card className="border-2 border-emerald-600/30 overflow-hidden">
					<CardHeader className="pb-3 bg-neutral-950/5 dark:bg-neutral-900/20 border-b border-emerald-600/20">
						<div className="flex items-center gap-2 pb-1">
							<span className="h-3 w-3 rounded-full bg-red-500/70" />
							<span className="h-3 w-3 rounded-full bg-yellow-500/70" />
							<span className="h-3 w-3 rounded-full bg-green-500/70" />
							<span className="ml-2 text-xs text-muted-foreground font-mono">contact_info • terminal</span>
						</div>
						<CardTitle className="text-lg font-mono mt-2">{"$ contact --info"}</CardTitle>
						<p className="text-sm text-emerald-600 dark:text-emerald-400 font-mono">
							{"// Prefer direct contact? Reach me through these channels"}
						</p>
					</CardHeader>
					<CardContent className="space-y-3 p-4 font-mono">
						<motion.div
							initial={{ opacity: 0, x: -10 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: 0.5 }}>
							<Link
								href={`mailto:${person.email}`}
								className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400 hover:text-emerald-600 hover:dark:text-emerald-300 transition-colors">
								<span className="text-emerald-600 dark:text-emerald-400 mr-1">$</span>
								<Mail className="h-4 w-4" />
								{person.email}
							</Link>
						</motion.div>
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: 0.6 }}
							className="text-sm text-muted-foreground ml-6">
							{"// Response within 24 hours"}
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: -10 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: 0.7 }}>
							<Link
								href={`tel:${person.phone.replace(/\s+/g, "")}`}
								className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400 hover:text-emerald-600 hover:dark:text-emerald-300 transition-colors">
								<span className="text-emerald-600 dark:text-emerald-400 mr-1">$</span>
								<Phone className="h-4 w-4" />
								{person.phone}
							</Link>
						</motion.div>
					</CardContent>
				</Card>
			</motion.div>
		</motion.div>
	);
}
