"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Palette, Server, Database, Wrench, Zap } from "lucide-react";
import { useInView } from "react-intersection-observer";

const skillCategories = {
  frontend: {
    icon: Code,
    title: "Frontend",
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React.js", level: 95, description: "Advanced React patterns, hooks, and optimization" },
      { name: "Next.js", level: 90, description: "App Router, SSR, SSG, and modern Next.js features" },
      { name: "TypeScript", level: 90, description: "Type-safe development with advanced TS patterns" },
      { name: "Tailwind CSS", level: 92, description: "Modern utility-first CSS framework" },
      { name: "Angular", level: 85, description: "MEAN stack development and enterprise applications" },
      { name: "JavaScript", level: 95, description: "ES6+, modern JavaScript and advanced patterns" }
    ]
  },
  backend: {
    icon: Server,
    title: "Backend",
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", level: 92, description: "Server-side JavaScript and API development" },
      { name: "Express.js", level: 90, description: "RESTful APIs and middleware development" },
      { name: "MongoDB", level: 88, description: "NoSQL database design and aggregation" },
      { name: "PostgreSQL", level: 85, description: "Relational database design and optimization" },
      { name: "Supabase", level: 85, description: "Modern backend-as-a-service platform" },
      { name: "Stripe", level: 88, description: "Payment integration and processing systems" }
    ]
  },
  tools: {
    icon: Wrench,
    title: "Tools & Others",
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Git & GitHub", level: 95, description: "Version control and collaborative development" },
      { name: "AWS", level: 85, description: "Cloud services and deployment solutions" },
      { name: "Swagger", level: 88, description: "API documentation and testing" },
      { name: "Docker", level: 78, description: "Containerization and deployment" },
      { name: "Vercel", level: 90, description: "Modern deployment and hosting platform" },
      { name: "Prisma", level: 82, description: "Database ORM and query optimization" }
    ]
  }
};

function SkillBar({ skill, index, inView }: { skill: any; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
          {skill.name}
        </span>
        <span className="text-sm text-muted-foreground">
          {skill.level}%
        </span>
      </div>
      
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
        />
      </div>
      
      <p className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {skill.description}
      </p>
    </motion.div>
  );
}

function SkillCategory({ category, skills, inView }: { category: any; skills: any[]; inView: boolean }) {
  const IconComponent = category.icon;

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} p-3 flex items-center justify-center`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold">{category.title}</h3>
        </div>
        
        <div className="space-y-6">
          {skills.map((skill, index) => (
            <SkillBar key={skill.name} skill={skill} index={index} inView={inView} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function SkillsSection() {
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
    <section id="skills" className="py-20 lg:py-32">
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
              <Zap className="w-4 h-4 mr-2" />
              Skills & Expertise
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Technical Arsenal
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit of modern technologies and frameworks that I use to 
              bring ideas to life.
            </p>
          </motion.div>

          {/* Skills Tabs */}
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="frontend" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="frontend" className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Frontend
                </TabsTrigger>
                <TabsTrigger value="backend" className="flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  Backend
                </TabsTrigger>
                <TabsTrigger value="tools" className="flex items-center gap-2">
                  <Wrench className="w-4 h-4" />
                  Tools
                </TabsTrigger>
              </TabsList>

              <TabsContent value="frontend">
                <SkillCategory 
                  category={skillCategories.frontend} 
                  skills={skillCategories.frontend.skills}
                  inView={inView}
                />
              </TabsContent>

              <TabsContent value="backend">
                <SkillCategory 
                  category={skillCategories.backend} 
                  skills={skillCategories.backend.skills}
                  inView={inView}
                />
              </TabsContent>

              <TabsContent value="tools">
                <SkillCategory 
                  category={skillCategories.tools} 
                  skills={skillCategories.tools.skills}
                  inView={inView}
                />
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Quick Stats */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {[
              { label: "Technologies", value: "20+", icon: Code },
              { label: "Frameworks", value: "10+", icon: Palette },
              { label: "Databases", value: "5+", icon: Database },
              { label: "Tools", value: "15+", icon: Wrench }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -5 }}
                className="text-center p-6 rounded-lg bg-muted/50 border border-border/50"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Learning Section */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">
                  Continuous Learning
                </h3>
                <p className="text-muted-foreground mb-6">
                  The tech world evolves rapidly, and so do I. Currently exploring AI integration, 
                  Web3 technologies, and advanced system design patterns.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["AI/ML", "Web3", "Rust", "Go", "Kubernetes", "Microservices"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}