"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  Heart,
  Coffee,
  Code2,
  Lightbulb,
  Target,
  type LucideIcon,
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import type {
  AboutHighlight,
  FunFact,
  JourneyItem,
  Profile,
} from "@/lib/supabase/types";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Lightbulb,
  Target,
  Coffee,
  Heart,
  User,
};

export function AboutSection({
  profile,
  highlights,
  journey,
  funFacts,
}: {
  profile: Profile;
  highlights: AboutHighlight[];
  journey: JourneyItem[];
  funFacts: FunFact[];
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const paragraphs = (profile.bio_long || "")
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

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
              I&apos;m a passionate full-stack developer with a love for creating
              beautiful, functional, and user-centered digital experiences.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                {paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className="text-muted-foreground leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                {funFacts.map((fact) => {
                  const Icon = iconMap[fact.icon_key] || Code2;
                  return (
                    <motion.div
                      key={fact.id}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border"
                    >
                      <Icon className="w-4 h-4 text-primary" />
                      <span className="text-sm">{fact.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              {highlights.map((highlight, index) => {
                const Icon = iconMap[highlight.icon_key] || Code2;
                return (
                  <motion.div
                    key={highlight.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={
                      inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                    }
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-6 h-6 text-primary" />
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
                );
              })}
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="relative">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
              My Journey
            </h3>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent" />

              <div className="space-y-8">
                {journey.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`flex items-center ${
                      index % 2 === 0 ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`w-5/12 ${
                        index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                      }`}
                    >
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
