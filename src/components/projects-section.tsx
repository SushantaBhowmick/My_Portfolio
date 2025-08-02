"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github, Folder, Filter } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Golf Course Management System",
    description: "Enterprise-level management system for golf courses with client in-house product features, built using modern TypeScript and React technologies.",
    image: "/api/placeholder/600/400",
    category: "Full-Stack",
    technologies: ["TypeScript", "React.js", "Node.js", "TailwindCSS", "AWS", "Swagger"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/SushantaBhowmick",
    featured: true
  },
  {
    id: 2,
    title: "Ecommerce App - MERN Stack",
    description: "Complete e-commerce solution with product catalog, cart, payments, and user management built with MERN stack technologies.",
    image: "/api/placeholder/600/400",
    category: "Full-Stack",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/SushantaBhowmick",
    featured: true
  },
  {
    id: 3,
    title: "Learning Management System",
    description: "Comprehensive LMS where students can attend live classes, access courses, get certificates, and age-based course recommendations.",
    image: "/api/placeholder/600/400",
    category: "Full-Stack",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "WebRTC"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/SushantaBhowmick",
    featured: true
  },
  {
    id: 4,
    title: "Course Bundler",
    description: "Full-stack course management platform with payment integration using Stripe and modern authentication systems.",
    image: "/api/placeholder/600/400",
    category: "Full-Stack",
    technologies: ["React", "Next.js", "Node.js", "Stripe", "Supabase"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/SushantaBhowmick",
    featured: false
  },
  {
    id: 5,
    title: "Real-Time Workspace (SaaS)",
    description: "Scalable SaaS platform for real-time collaboration with workspace management and team features.",
    image: "/api/placeholder/600/400",
    category: "Full-Stack",
    technologies: ["React", "Node.js", "Socket.io", "PostgreSQL", "AWS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/SushantaBhowmick",
    featured: false
  },
  {
    id: 6,
    title: "Social Media App",
    description: "Full-featured social media platform with user profiles, posts, comments, and real-time notifications.",
    image: "/api/placeholder/600/400",
    category: "Full-Stack",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Express"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/SushantaBhowmick",
    featured: false
  }
];

const categories = ["All", "Featured", "Full-Stack", "Frontend", "Backend"];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="h-full overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300">
        {/* Project Image */}
        <div className="relative overflow-hidden bg-muted">
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Folder className="w-16 h-16 text-primary/50" />
          </div>
          
          {/* Overlay with links */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            <Button size="sm" variant="secondary" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
            <Button size="sm" variant="secondary" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>
          </div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary/90 text-primary-foreground">
                Featured
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-6">
          <div className="mb-3">
            <Badge variant="secondary" className="text-xs">
              {project.category}
            </Badge>
          </div>

          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech: string) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" className="flex-1" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live
              </a>
            </Button>
            <Button size="sm" variant="outline" className="flex-1" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const filteredProjects = projectsData.filter(project => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Featured") return project.featured;
    return project.category === activeCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="projects" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Folder className="w-4 h-4 mr-2" />
              My Work
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work spanning full-stack applications, 
              frontend experiences, and backend systems.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={`transition-all duration-300 ${
                  activeCategory === category 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-primary/10"
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {category}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {category === "All" 
                    ? projectsData.length 
                    : category === "Featured" 
                    ? projectsData.filter(p => p.featured).length
                    : projectsData.filter(p => p.category === category).length
                  }
                </Badge>
              </Button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Projects Message */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground text-lg">
                No projects found in this category.
              </p>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-16"
          >
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">
                  Interested in working together?
                </h3>
                <p className="text-muted-foreground mb-6">
                  I&apos;m always open to discussing new opportunities and exciting projects. 
                  Let&apos;s create something amazing together.
                </p>
                <Button size="lg" className="group" onClick={() => {
                  const element = document.getElementById("contact");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}>
                  Get In Touch
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}