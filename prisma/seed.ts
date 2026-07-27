import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Profile (singleton-style: update first or create)
  const existingProfile = await prisma.profile.findFirst();
  if (existingProfile) {
    await prisma.profile.update({
      where: { id: existingProfile.id },
      data: {
        fullName: "Sushanta Bhowmick",
        displayName: "Sushanta",
        headline: "Full-Stack Developer",
        bioShort:
          "I craft exceptional digital experiences using MERN & MEAN stack with 3+ years of experience. Specializing in React, Next.js, Node.js, TypeScript, and modern web technologies.",
        bioLong:
          "My journey in web development started with a BTech in Computer Science & Technology and has evolved into 3+ years of hands-on experience building scalable web applications. I specialize in both MERN and MEAN stacks, creating everything from e-commerce platforms to learning management systems.\n\nCurrently working at Xpliv Technologies as a Full-Stack Developer, I've built enterprise solutions including Golf Course Management Systems and client in-house products using cutting-edge technologies like TypeScript, React, Node.js, and AWS.",
        availabilityText: "Available for new opportunities",
        isAvailable: true,
        email: "bhosushanta922@gmail.com",
        phone: "+91 8017068720",
        location: "Kolkata, West Bengal, India",
        githubUrl: "https://github.com/SushantaBhowmick",
        linkedinUrl: "https://www.linkedin.com/in/sushanta-bhowmick",
        yearsExperience: "3+",
        projectsCompleted: "25+",
        clientSatisfaction: "100%",
      },
    });
  } else {
    await prisma.profile.create({
      data: {
        fullName: "Sushanta Bhowmick",
        displayName: "Sushanta",
        headline: "Full-Stack Developer",
        bioShort:
          "I craft exceptional digital experiences using MERN & MEAN stack with 3+ years of experience. Specializing in React, Next.js, Node.js, TypeScript, and modern web technologies.",
        bioLong:
          "My journey in web development started with a BTech in Computer Science & Technology and has evolved into 3+ years of hands-on experience building scalable web applications. I specialize in both MERN and MEAN stacks, creating everything from e-commerce platforms to learning management systems.\n\nCurrently working at Xpliv Technologies as a Full-Stack Developer, I've built enterprise solutions including Golf Course Management Systems and client in-house products using cutting-edge technologies like TypeScript, React, Node.js, and AWS.",
        availabilityText: "Available for new opportunities",
        isAvailable: true,
        email: "bhosushanta922@gmail.com",
        phone: "+91 8017068720",
        location: "Kolkata, West Bengal, India",
        githubUrl: "https://github.com/SushantaBhowmick",
        linkedinUrl: "https://www.linkedin.com/in/sushanta-bhowmick",
        yearsExperience: "3+",
        projectsCompleted: "25+",
        clientSatisfaction: "100%",
      },
    });
  }

  // Hero roles — only seed if empty
  if ((await prisma.heroRole.count()) === 0) {
    await prisma.heroRole.createMany({
      data: [
        { label: "Full-Stack Developer", sortOrder: 1, isActive: true },
        { label: "React Specialist", sortOrder: 2, isActive: true },
        { label: "Node.js Expert", sortOrder: 3, isActive: true },
        { label: "UI/UX Enthusiast", sortOrder: 4, isActive: true },
        { label: "Problem Solver", sortOrder: 5, isActive: true },
      ],
    });
  }

  // Projects — only seed if empty
  if ((await prisma.project.count()) === 0) {
    await prisma.project.createMany({
      data: [
        {
          title: "Golf Course Management System",
          description:
            "Enterprise-level management system for golf courses with client in-house product features, built using modern TypeScript and React technologies.",
          category: "Full-Stack",
          technologies: [
            "TypeScript",
            "React.js",
            "Node.js",
            "TailwindCSS",
            "AWS",
            "Swagger",
          ],
          liveUrl: "https://example.com",
          githubUrl: "https://github.com/SushantaBhowmick",
          featured: true,
          isPublished: true,
          sortOrder: 1,
        },
        {
          title: "Ecommerce App - MERN Stack",
          description:
            "Complete e-commerce solution with product catalog, cart, payments, and user management built with MERN stack technologies.",
          category: "Full-Stack",
          technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
          liveUrl: "https://example.com",
          githubUrl: "https://github.com/SushantaBhowmick",
          featured: true,
          isPublished: true,
          sortOrder: 2,
        },
        {
          title: "Learning Management System",
          description:
            "Comprehensive LMS where students can attend live classes, access courses, get certificates, and age-based course recommendations.",
          category: "Full-Stack",
          technologies: ["React", "Node.js", "MongoDB", "Socket.io", "WebRTC"],
          liveUrl: "https://example.com",
          githubUrl: "https://github.com/SushantaBhowmick",
          featured: true,
          isPublished: true,
          sortOrder: 3,
        },
        {
          title: "Course Bundler",
          description:
            "Full-stack course management platform with payment integration using Stripe and modern authentication systems.",
          category: "Full-Stack",
          technologies: ["React", "Next.js", "Node.js", "Stripe", "Supabase"],
          liveUrl: "https://example.com",
          githubUrl: "https://github.com/SushantaBhowmick",
          featured: false,
          isPublished: true,
          sortOrder: 4,
        },
        {
          title: "Real-Time Workspace (SaaS)",
          description:
            "Scalable SaaS platform for real-time collaboration with workspace management and team features.",
          category: "Full-Stack",
          technologies: ["React", "Node.js", "Socket.io", "PostgreSQL", "AWS"],
          liveUrl: "https://example.com",
          githubUrl: "https://github.com/SushantaBhowmick",
          featured: false,
          isPublished: true,
          sortOrder: 5,
        },
        {
          title: "Social Media App",
          description:
            "Full-featured social media platform with user profiles, posts, comments, and real-time notifications.",
          category: "Full-Stack",
          technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Express"],
          liveUrl: "https://example.com",
          githubUrl: "https://github.com/SushantaBhowmick",
          featured: false,
          isPublished: true,
          sortOrder: 6,
        },
      ],
    });
  }

  // Skill categories + skills
  const categoryDefs = [
    {
      key: "frontend",
      title: "Frontend",
      color: "from-blue-500 to-cyan-500",
      iconKey: "Code",
      sortOrder: 1,
      skills: [
        {
          name: "React.js",
          level: 95,
          description: "Advanced React patterns, hooks, and optimization",
          sortOrder: 1,
        },
        {
          name: "Next.js",
          level: 90,
          description: "App Router, SSR, SSG, and modern Next.js features",
          sortOrder: 2,
        },
        {
          name: "TypeScript",
          level: 90,
          description: "Type-safe development with advanced TS patterns",
          sortOrder: 3,
        },
        {
          name: "Tailwind CSS",
          level: 92,
          description: "Modern utility-first CSS framework",
          sortOrder: 4,
        },
        {
          name: "Angular",
          level: 85,
          description: "MEAN stack development and enterprise applications",
          sortOrder: 5,
        },
        {
          name: "JavaScript",
          level: 95,
          description: "ES6+, modern JavaScript and advanced patterns",
          sortOrder: 6,
        },
      ],
    },
    {
      key: "backend",
      title: "Backend",
      color: "from-green-500 to-emerald-500",
      iconKey: "Server",
      sortOrder: 2,
      skills: [
        {
          name: "Node.js",
          level: 92,
          description: "Server-side JavaScript and API development",
          sortOrder: 1,
        },
        {
          name: "Express.js",
          level: 90,
          description: "RESTful APIs and middleware development",
          sortOrder: 2,
        },
        {
          name: "MongoDB",
          level: 88,
          description: "NoSQL database design and aggregation",
          sortOrder: 3,
        },
        {
          name: "PostgreSQL",
          level: 85,
          description: "Relational database design and optimization",
          sortOrder: 4,
        },
        {
          name: "Supabase",
          level: 85,
          description: "Modern backend-as-a-service platform",
          sortOrder: 5,
        },
        {
          name: "Stripe",
          level: 88,
          description: "Payment integration and processing systems",
          sortOrder: 6,
        },
      ],
    },
    {
      key: "tools",
      title: "Tools & Others",
      color: "from-purple-500 to-pink-500",
      iconKey: "Wrench",
      sortOrder: 3,
      skills: [
        {
          name: "Git & GitHub",
          level: 95,
          description: "Version control and collaborative development",
          sortOrder: 1,
        },
        {
          name: "AWS",
          level: 85,
          description: "Cloud services and deployment solutions",
          sortOrder: 2,
        },
        {
          name: "Swagger",
          level: 88,
          description: "API documentation and testing",
          sortOrder: 3,
        },
        {
          name: "Docker",
          level: 78,
          description: "Containerization and deployment",
          sortOrder: 4,
        },
        {
          name: "Vercel",
          level: 90,
          description: "Modern deployment and hosting platform",
          sortOrder: 5,
        },
        {
          name: "Prisma",
          level: 82,
          description: "Database ORM and query optimization",
          sortOrder: 6,
        },
      ],
    },
  ] as const;

  for (const cat of categoryDefs) {
    const category = await prisma.skillCategory.upsert({
      where: { key: cat.key },
      update: {
        title: cat.title,
        color: cat.color,
        iconKey: cat.iconKey,
        sortOrder: cat.sortOrder,
      },
      create: {
        key: cat.key,
        title: cat.title,
        color: cat.color,
        iconKey: cat.iconKey,
        sortOrder: cat.sortOrder,
      },
    });

    if (
      (await prisma.skill.count({ where: { categoryId: category.id } })) === 0
    ) {
      await prisma.skill.createMany({
        data: cat.skills.map((s) => ({
          categoryId: category.id,
          name: s.name,
          level: s.level,
          description: s.description,
          sortOrder: s.sortOrder,
          isPublished: true,
        })),
      });
    }
  }

  if ((await prisma.learningTag.count()) === 0) {
    await prisma.learningTag.createMany({
      data: [
        { label: "AI/ML", sortOrder: 1 },
        { label: "Web3", sortOrder: 2 },
        { label: "Rust", sortOrder: 3 },
        { label: "Go", sortOrder: 4 },
        { label: "Kubernetes", sortOrder: 5 },
        { label: "Microservices", sortOrder: 6 },
      ],
    });
  }

  if ((await prisma.aboutHighlight.count()) === 0) {
    await prisma.aboutHighlight.createMany({
      data: [
        {
          iconKey: "Code2",
          title: "Clean Code",
          description:
            "Writing maintainable, scalable, and efficient code is my passion.",
          sortOrder: 1,
        },
        {
          iconKey: "Lightbulb",
          title: "Innovation",
          description:
            "Always exploring new technologies and creative solutions.",
          sortOrder: 2,
        },
        {
          iconKey: "Target",
          title: "Results-Driven",
          description:
            "Focused on delivering exceptional results that exceed expectations.",
          sortOrder: 3,
        },
      ],
    });
  }

  if ((await prisma.journeyItem.count()) === 0) {
    await prisma.journeyItem.createMany({
      data: [
        {
          year: "2020-22",
          title: "Foundation Building",
          description:
            "Completed Diploma in Computer Science & Technology from Elite Institute",
          sortOrder: 1,
        },
        {
          year: "2022",
          title: "Professional Start",
          description:
            "Started at Dhisar Infotech & Kalyani, building LMS and payment systems",
          sortOrder: 2,
        },
        {
          year: "2022-25",
          title: "Academic Excellence",
          description:
            "Pursuing BTech in Computer Science from Guru Nanak Institution Of Technology",
          sortOrder: 3,
        },
        {
          year: "2024-Present",
          title: "Senior Developer",
          description:
            "Full-Stack Developer at Xpliv Technologies, building enterprise solutions",
          sortOrder: 4,
        },
      ],
    });
  }

  if ((await prisma.funFact.count()) === 0) {
    await prisma.funFact.createMany({
      data: [
        { label: "Coffee Enthusiast", iconKey: "Coffee", sortOrder: 1 },
        { label: "Open Source", iconKey: "Heart", sortOrder: 2 },
        { label: "Clean Code", iconKey: "Code2", sortOrder: 3 },
      ],
    });
  }

  await prisma.automation.upsert({
    where: { key: "contact_notify" },
    update: {
      name: "New contact notification",
      description:
        "Send a webhook or email alert when someone submits the contact form.",
    },
    create: {
      key: "contact_notify",
      name: "New contact notification",
      description:
        "Send a webhook or email alert when someone submits the contact form.",
      enabled: false,
      config: { webhook_url: "", email: "" },
    },
  });

  if ((await prisma.siteSettings.count()) === 0) {
    await prisma.siteSettings.create({
      data: {
        seoTitle: "Sushanta Bhowmick | Full-Stack Developer",
        seoDescription:
          "Full-Stack Developer specializing in MERN & MEAN stack with 3+ years of experience. Expert in React, Next.js, Node.js, and modern web technologies.",
        showAbout: true,
        showSkills: true,
        showProjects: true,
        showContact: true,
      },
    });
  }

  console.log("Prisma seed completed (safe upsert / fill-empty only).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
