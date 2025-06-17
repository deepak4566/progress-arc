
import React from 'react';
import { Book, Star, BarChart, Layout, BookOpen, Clock, Monitor, Users, Sparkles } from 'lucide-react';
import { HoverEffect } from "@aceternity/ui/card-hover-effect";
import { TextGenerateEffect } from "@aceternity/ui/text-generate-effect";

const Features = () => {
  const features = [
    {
      title: "Extensive Library",
      description: "Access thousands of free educational resources from various sources, all in one place.",
      link: "#",
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      title: "Personalized Learning",
      description: "Receive tailored recommendations based on your learning style, goals, and progress.",
      link: "#",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Progress Tracking",
      description: "Visualize your learning journey with intuitive progress charts and analytics.",
      link: "#",
      icon: <BarChart className="h-6 w-6" />,
    },
    {
      title: "Skill Points",
      description: "Earn points and badges as you complete courses and master new skills.",
      link: "#",
      icon: <Star className="h-6 w-6" />,
    },
    {
      title: "Custom Paths",
      description: "Create your own learning paths or follow curated paths from education experts.",
      link: "#",
      icon: <Layout className="h-6 w-6" />,
    },
    {
      title: "Interactive Learning",
      description: "Engage with interactive content, quizzes, and exercises to reinforce learning.",
      link: "#",
      icon: <Monitor className="h-6 w-6" />,
    },
    {
      title: "Topic Mastery",
      description: "Develop deep understanding through comprehensive topic coverage and practice.",
      link: "#",
      icon: <Book className="h-6 w-6" />,
    },
    {
      title: "Self-paced Learning",
      description: "Learn at your own pace with no deadlines or pressure, focusing on what matters to you.",
      link: "#",
      icon: <Clock className="h-6 w-6" />,
    }
  ];

  const headerText = "Everything you need to learn effectively";
  
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-3 py-1 mb-4 sm:mb-6 rounded-full bg-white/10 text-white text-xs sm:text-sm font-medium backdrop-blur-sm border border-white/20">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            <span>Powerful learning tools</span>
          </div>
          
          <TextGenerateEffect 
            words={headerText}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 font-display text-white"
          />
          
          <p className="text-base sm:text-lg text-gray-300 px-4 sm:px-0">
            Our platform combines powerful features to create the perfect learning environment
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <HoverEffect items={features} />
        </div>
      </div>
    </section>
  );
};

export default Features;
