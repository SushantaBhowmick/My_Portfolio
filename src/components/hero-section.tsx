"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Download, Code, Sparkles } from "lucide-react";
import { ThreeScene, AnimatedBackground } from "./three-scene";

const typingText = [
  "Full-Stack Developer",
  "React Specialist", 
  "Node.js Expert",
  "UI/UX Enthusiast",
  "Problem Solver"
];

export function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = typingText[currentTextIndex];
      
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % typingText.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <AnimatedBackground />
      
      {/* Three.js Scene */}
      <div className="absolute inset-0 opacity-30">
        <ThreeScene />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20">
              <Sparkles className="w-4 h-4 mr-2" />
              Available for new opportunities
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Sushanta Bhowmick
                </span>
              </span>
            </h1>
            
            {/* Animated Role */}
            <div className="mt-4 h-16 md:h-20 lg:h-24 flex items-center justify-center">
              <span className="text-2xl md:text-4xl lg:text-5xl font-semibold text-muted-foreground">
                {currentText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                  className="text-primary"
                >
                  |
                </motion.span>
              </span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            I craft exceptional digital experiences using MERN & MEAN stack with 3+ years of experience. 
            Specializing in React, Next.js, Node.js, TypeScript, and modern web technologies.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button 
              size="lg" 
              className="group relative overflow-hidden px-8 py-3 text-base font-medium"
              onClick={() => scrollToSection("projects")}
            >
              <span className="relative z-10 flex items-center">
                <Code className="w-5 h-5 mr-2" />
                View My Work
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </Button>

            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-3 text-base font-medium border-2 hover:bg-primary/5"
            >
              <Download className="w-5 h-5 mr-2" />
              Download CV
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12"
          >
            {[
              { number: "3+", label: "Years Experience" },
              { number: "25+", label: "Projects Completed" },
              { number: "100%", label: "Client Satisfaction" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -5 }}
                className="text-center p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center"
          >
            <motion.button
              onClick={() => scrollToSection("about")}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
              aria-label="Scroll to about section"
            >
              <span className="text-sm mb-2">Scroll to explore</span>
              <ArrowDown className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-primary/15 rounded-full blur-lg" />
    </section>
  );
}