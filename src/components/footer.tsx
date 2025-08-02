"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Github, Linkedin, Mail, ArrowUp, Code } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/SushantaBhowmick", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/sushanta-bhowmick", label: "LinkedIn" },
  { icon: Mail, href: "mailto:sushantabhowmick@gmail.com", label: "Email" },
];

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-muted/50 border-t border-border/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/60 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                  Sushanta
                </span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md leading-relaxed">
                Crafting digital experiences with modern technologies. 
                Passionate about clean code, innovative solutions, and exceptional user experiences.
              </p>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Heart className="w-3 h-3 mr-1" />
                Available for new projects
              </Badge>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex gap-3"
            >
              {socialLinks.map((link) => (
                <Button
                  key={link.label}
                  variant="outline"
                  size="sm"
                  className="w-10 h-10 p-0 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                  asChild
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    <link.icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="font-semibold text-foreground mb-4">Get In Touch</h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  <a 
                    href="mailto:sushantabhowmick@gmail.com" 
                    className="hover:text-primary transition-colors"
                  >
                    sushantabhowmick@gmail.com
                  </a>
                </p>
                <p className="text-muted-foreground">
                  Kolkata, West Bengal, India
                </p>
                <p className="text-muted-foreground">
                  Available for remote work
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50"
        >
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Sushanta Bhowmick. Built with{" "}
              <span className="text-primary">Next.js</span>, <span className="text-primary">Tailwind CSS</span>, 
              and <span className="text-primary">Supabase</span>.
            </p>
          </div>

          {/* Back to Top Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="group hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
          >
            <ArrowUp className="w-4 h-4 mr-2 group-hover:-translate-y-1 transition-transform" />
            Back to Top
          </Button>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mt-8 pt-6 border-t border-border/50"
        >
          {["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "Supabase"].map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-xs bg-background/50 text-muted-foreground border-border/50 hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
            >
              {tech}
            </Badge>
          ))}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-l from-primary/5 to-transparent rounded-full blur-2xl" />
    </footer>
  );
}