"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User, Heart, Coffee, Code2, Lightbulb, Target } from "lucide-react";
import { useInView } from "react-intersection-observer";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and efficient code is my passion."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Always exploring new technologies and creative solutions."
  },
  {
    icon: Target,
    title: "Results-Driven",
    description: "Focused on delivering exceptional results that exceed expectations."
  }
];

const journey = [
  {
    year: "2020-22",
    title: "Foundation Building",
    description: "Completed Diploma in Computer Science & Technology from Elite Institute"
  },
  {
    year: "2022",
    title: "Professional Start",
    description: "Started at Dhisar Infotech & Kalyani, building LMS and payment systems"
  },
  {
    year: "2022-25",
    title: "Academic Excellence",
    description: "Pursuing BTech in Computer Science from Guru Nanak Institution Of Technology"
  },
  {
    year: "2024-Present",
    title: "Senior Developer",
    description: "Full-Stack Developer at Xpliv Technologies, building enterprise solutions"
  }
];

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section id="about" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <User className="w-4 h-4 mr-2" />
              About Me
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Crafting Digital Experiences
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I&apos;m a passionate full-stack developer with a love for creating beautiful, 
              functional, and user-centered digital experiences.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Personal Story */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p className="text-muted-foreground leading-relaxed">
                  My journey in web development started with a BTech in Computer Science & Technology 
                  and has evolved into 3+ years of hands-on experience building scalable web applications. 
                  I specialize in both <span className="text-primary font-semibold">MERN</span> and{" "}
                  <span className="text-primary font-semibold">MEAN</span> stacks, creating everything 
                  from e-commerce platforms to learning management systems.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Currently working at Xpliv Technologies as a Full-Stack Developer, I&apos;ve built 
                  enterprise solutions including Golf Course Management Systems and client in-house 
                  products using cutting-edge technologies like TypeScript, React, Node.js, and AWS.
                </p>
              </div>

              {/* Fun Facts */}
              <div className="flex flex-wrap gap-4 pt-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border"
                >
                  <Coffee className="w-4 h-4 text-primary" />
                  <span className="text-sm">Coffee Enthusiast</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border"
                >
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-sm">Open Source</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border"
                >
                  <Code2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Clean Code</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Highlights Grid */}
            <motion.div variants={itemVariants} className="space-y-6">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <highlight.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                            {highlight.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {highlight.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Journey Timeline */}
          <motion.div variants={itemVariants} className="relative">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
              My Journey
            </h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent" />
              
              <div className="space-y-8">
                {journey.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <Card className="group hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="text-primary font-bold text-lg mb-2">
                            {item.year}
                          </div>
                          <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-muted-foreground">
                            {item.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Timeline Dot */}
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg absolute left-1/2 transform -translate-x-1/2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}