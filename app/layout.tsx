import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from '@vercel/analytics/next';

// We'll use a direct link tag in the HTML head instead

export const metadata: Metadata = {
	title: "Soumya Raj Sarkar | Web Developer Portfolio",
	description:
		"Frontend-forward full‑stack developer focused on clean architecture, type‑safe APIs, and delightful UIs. Building with Next.js, NestJS, and modern tooling.",
	keywords: [
		"web developer",
		"portfolio",
		"frontend",
		"fullstack",
		"nextjs",
		"react",
		"typescript",
	],
	authors: [{ name: "Soumya Raj Sarkar" }],
	creator: "Soumya Raj Sarkar",
	icons: {
		icon: [
			{ url: '/favicon.svg', type: 'image/svg+xml' },
		],
		apple: [
			{ url: '/logo.svg' },
		],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			style={{ fontFamily: "'Open Sans', sans-serif" }}
			suppressHydrationWarning>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body
				style={{ fontFamily: "'Open Sans', sans-serif" }}
				className="font-sans">
				<a
					href="#main"
					className="sr-only focus:not-sr-only fixed top-2 left-2 z-[100] px-3 py-2 rounded-md bg-emerald-600 text-white shadow outline-none focus-visible:ring-2 focus-visible:ring-white"
					aria-label="Skip to main content">
					Skip to content
				</a>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					{children}
					<Toaster />
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}
