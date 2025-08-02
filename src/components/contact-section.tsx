"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, Calendar, MessageCircle } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "bhosushanta922@gmail.com",
    href: "mailto:sushantabhowmick@gmail.com",
    description: "Drop me a line anytime"
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 8017068720",
    href: "tel:+918017068720",
    description: "Available during business hours"
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Kolkata, West Bengal, India",
    href: "https://maps.google.com",
    description: "Open to remote work"
  },
  {
    icon: Calendar,
    title: "Availability",
    value: "Available Now",
    href: "#",
    description: "Ready for new projects"
  }
];

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Import Supabase function dynamically to avoid SSR issues
      const { submitContactForm } = await import("@/lib/supabase");
      
      const result = await submitContactForm({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      if (result.success) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(result.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : "Failed to send message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <section id="contact" className="py-20 lg:py-32">
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
              <MessageCircle className="w-4 h-4 mr-2" />
              Get In Touch
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Let&apos;s Create Together
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or just want to chat? I&apos;d love to hear from you. 
              Let&apos;s discuss how we can bring your ideas to life.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6">
                  Let&apos;s start a conversation
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  I&apos;m always excited to work on new projects and collaborate with 
                  passionate people. Whether you have a specific project in mind or 
                  just want to explore possibilities, I&apos;m here to help.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <Card className="group cursor-pointer border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <info.icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                              {info.title}
                            </h4>
                            <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {info.value}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {info.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Response Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="font-medium text-foreground">Quick Response</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      I typically respond to messages within 24 hours during weekdays.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <Card className="border-2">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6">
                    Send me a message
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-foreground">
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="border-2 focus:border-primary/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="border-2 focus:border-primary/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-foreground">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="border-2 focus:border-primary/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell me about your project or ideas..."
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="border-2 focus:border-primary/50 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                            Send Message
                          </>
                        )}
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}