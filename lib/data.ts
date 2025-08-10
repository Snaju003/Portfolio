export const person = {
  name: "Soumya Raj Sarkar",
  phone: "+91-6290275911",
  email: "soumyaraj2003@gmail.com",
  linkedin: "https://linkedin.com/in/soumyaraj-sarkar",
  github: "https://github.com/Snaju003",
  location: "Kolkata, West Bengal, India",
  education: {
    school: "RCC Institute of Information Technology",
    degree: "B.Tech in Computer Science and Engineering",
    range: "Oct 2022 – Jun 2026",
  },
}

export const experiences = [
  {
    company: "Infomaticae Technology Pvt. Ltd.",
    role: "Software Engineer Intern",
    location: "Remote",
    range: "Feb 2025 – May 2025",
    highlights: [
      "Developed backend APIs using NestJS with Docker and TypeORM to boost scalability & maintainability.",
      "Implemented comprehensive CRUD operations, improving data processing efficiency and automation.",
      "Collaborated across teams to integrate backend services with frontend apps and third-party APIs.",
    ],
    stack: ["NestJS", "Docker", "TypeORM", "Node.js"],
  },
  {
    company: "BuyBox",
    role: "Frontend Developer (Freelance)",
    location: "Remote",
    range: "Feb 2025 – Present",
    highlights: [
      "Shipped responsive, dynamic frontend with Next.js and Tailwind for modern UX and performance.",
      "Implemented interactive patterns and components to increase engagement metrics.",
      "Deployed and maintain live site serving active users: buybox1.co.za (uptime & smooth functionality).",
    ],
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
  },
]

export const projects = [
  {
    title: "Innovision 2024 - Department Fest Website",
    subtitle: "Official CSE fest site: events, team registration, live updates",
    imageAlt: "Innovision festival web app screenshot",
    points: [
      "Built with Next.js and Supabase; responsive UI and dynamic data fetching.",
      "Implemented events and teams sections for a smooth registration experience.",
      "Focused on reliability and real-time content updates.",
    ],
    tech: ["Next.js", "Supabase", "Tailwind", "TypeScript"],
    links: [
      { label: "Live", href: "https://innovision.example.com" },
      { label: "GitHub", href: "https://github.com/Snaju003/innovision-2024" },
    ],
  },
  {
    title: "RapidRevise - Last Minute Revision Web App",
    subtitle: "Smart revision platform with content curation and PDF summarization",
    imageAlt: "RapidRevise dashboard screenshot",
    points: [
      "Backend infrastructure in Python with intelligent video curation by syllabus & time constraints.",
      "PDF summarization extracts key concepts from study materials and textbooks.",
      "Designed for speed and clarity during exam prep.",
    ],
    tech: ["Python", "FastAPI (planned)", "NLP (summarization)", "PDF"],
    links: [
      { label: "Live", href: "https://rapidrevise.example.com" },
      { label: "GitHub", href: "https://github.com/Snaju003/rapidrevise" },
    ],
  },
]

export const skills = [
  {
    title: "Programming Languages",
    caption: "Strong typed & scripting foundations",
    items: ["Java", "JavaScript", "TypeScript"],
  },
  {
    title: "Frontend",
    caption: "Interactive UIs & DX",
    items: ["React", "Next.js", "Tailwind CSS", "shadcn/ui"],
  },
  {
    title: "Backend",
    caption: "APIs, servers, orchestration",
    items: ["Node.js", "Express.js", "NestJS", "TypeORM", "Docker"],
  },
  {
    title: "Databases & Tools",
    caption: "Storage, versioning, IDE",
    items: ["MySQL", "MongoDB", "Git", "GitHub", "VS Code"],
  },
]

export const achievements = [
  {
    title: "Smart Bengal Hackathon Finalist",
    org: "RCCIIT, Kolkata",
    detail: "Finalist as part of team Grouplance; contributed backend development using modern web technologies.",
  },
  {
    title: "Status Code 1 Hackathon Finalist",
    org: "IISER, Kolkata",
    detail: "Finalist for project NeuraMed; built backend infrastructure with Python and contributed to frontend.",
  },
]
