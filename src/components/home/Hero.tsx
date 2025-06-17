
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Star, Sparkles, Rocket, CheckCircle, X, BriefcaseBusiness, DollarSign, UserPlus, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { BackgroundBeams } from "@aceternity/ui/background-beams";
import { SparklesCore } from "@aceternity/ui/sparkles";
import { HeroHighlight, Highlight } from "@aceternity/ui/hero-highlight";
import { FloatingNav } from "@aceternity/ui/floating-navbar";
import { BentoGrid, BentoGridItem } from "@aceternity/ui/bento-grid";

const Hero = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const handleJoinWaitlist = () => {
    // TODO: Implement waitlist signup logic
    console.log('Joining waitlist');
  };

  const handleDashboardNavigation = () => {
    navigate('/dashboard');
  };

  const features = [
    {
      title: "Access Quality Resources",
      description: "Curated educational content from across the internet",
      icon: <BookOpen className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-2",
    },
    {
      title: "Personalized Learning",
      description: "Custom learning paths tailored to your goals",
      icon: <Users className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-1",
    },
    {
      title: "Skill Points & Progress",
      description: "Track progress and earn rewards as you learn",
      icon: <Star className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-1",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-black relative flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      
      <section className="relative pt-20 pb-12 md:pt-32 md:pb-20 lg:pt-40 lg:pb-32 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <HeroHighlight>
            <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16 lg:mb-20">
              <div className="inline-flex items-center px-3 py-1 mb-4 md:mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs sm:text-sm font-medium animate-fade-in">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                <span>Personalized Learning Platform</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6 font-display leading-tight text-white">
                <span className="relative inline-block animate-slide-in">Learn anything.</span> <br className="hidden sm:block" />
                <Highlight className="text-black dark:text-white">
                  Track your progress.
                </Highlight>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-6 md:mb-8 animate-fade-in px-4 sm:px-0" style={{ animationDelay: "0.2s" }}>
                Access high-quality best educational resources from whole internet, build personalized learning paths, and track your skills development all in one place.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in px-4 sm:px-0" style={{ animationDelay: "0.3s" }}>
                {isSignedIn ? (
                  <Button 
                    onClick={handleDashboardNavigation} 
                    size="lg" 
                    className="w-full sm:w-auto group transition-all bg-white text-black hover:bg-gray-100 text-base sm:text-lg px-6 py-3 font-semibold"
                  >
                    Your Learning Dashboard 
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleJoinWaitlist} 
                    size="lg" 
                    className="w-full sm:w-auto group transition-all bg-white text-black hover:bg-gray-100 text-base sm:text-lg px-6 py-3 font-semibold"
                  >
                    Join the Waitlist 
                    <UserPlus className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                  </Button>
                )}
              </div>
            </div>
          </HeroHighlight>
          
          <div className="max-w-5xl mx-auto relative px-4 sm:px-0 mb-16 sm:mb-20 md:mb-24">
            <BentoGrid className="max-w-4xl mx-auto">
              {features.map((item, i) => (
                <BentoGridItem
                  key={i}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  className={`${item.className} bg-white/10 backdrop-blur-md border border-white/20`}
                />
              ))}
            </BentoGrid>
          </div>
          
          {/* Why Learn From This Platform? section */}
          <div className="max-w-5xl mx-auto mt-16 sm:mt-20 md:mt-24 relative px-4 sm:px-0">
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <CardHeader className="text-center p-4 sm:p-6">
                <div className="inline-flex items-center px-3 py-1 mb-3 sm:mb-4 rounded-full bg-white/10 text-white text-xs sm:text-sm font-medium">
                  <Rocket className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  <span>Why Learn With Us?</span>
                </div>
                <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 font-display text-white">Why Learn From This Platform?</CardTitle>
                <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto px-2 sm:px-0">
                  Here's why Levelup Labs is the best choice for your learning journey
                </p>
              </CardHeader>
              
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  <div className="flex flex-col items-center text-center p-3 sm:p-4 rounded-lg transition-all duration-300 hover:bg-white/5">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-white/10 flex items-center justify-center mb-3 sm:mb-4">
                      <DollarSign className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">Completely Free</h3>
                    <p className="text-gray-300 text-sm sm:text-base">Access all learning resources, tools, and features without any subscription fees or hidden costs.</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-3 sm:p-4 rounded-lg transition-all duration-300 hover:bg-white/5">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-white/10 flex items-center justify-center mb-3 sm:mb-4">
                      <BriefcaseBusiness className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">Get Hired</h3>
                    <p className="text-gray-300 text-sm sm:text-base">Build a portfolio of real-world projects that showcase your skills to potential employers.</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-3 sm:p-4 rounded-lg transition-all duration-300 hover:bg-white/5">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-white/10 flex items-center justify-center mb-3 sm:mb-4">
                      <Rocket className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">Learning By Doing</h3>
                    <p className="text-gray-300 text-sm sm:text-base">Apply your knowledge immediately with practical, hands-on projects that reinforce your learning.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Comparison table section */}
          <div className="max-w-5xl mx-auto mt-16 sm:mt-20 md:mt-24 relative px-4 sm:px-0">
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <CardHeader className="text-center p-4 sm:p-6">
                <div className="inline-flex items-center px-3 py-1 mb-3 sm:mb-4 rounded-full bg-white/10 text-white text-xs sm:text-sm font-medium">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  <span>Feature Comparison</span>
                </div>
                <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 font-display text-white">Levelup Labs vs. Paid Course Platforms</CardTitle>
                <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto px-2 sm:px-0">
                  See how our platform compares to traditional paid course alternatives
                </p>
              </CardHeader>
              
              <CardContent className="p-4 sm:p-6">
                <div className="overflow-x-auto -mx-2 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <table className="w-full border-collapse min-w-[500px]">
                      <thead>
                        <tr className="border-b-2 border-white/30">
                          <th className="text-left p-2 sm:p-4 font-semibold text-sm sm:text-base md:text-lg text-white">Feature</th>
                          <th className="p-2 sm:p-4 font-semibold text-sm sm:text-base md:text-lg text-white">Levelup Labs</th>
                          <th className="p-2 sm:p-4 font-semibold text-sm sm:text-base md:text-lg text-white">Paid Course Platforms</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/10">
                          <td className="p-2 sm:p-4 font-medium text-sm sm:text-base text-white">Cost</td>
                          <td className="p-2 sm:p-4 text-center">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mx-auto" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Completely free!</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </td>
                          <td className="p-2 sm:p-4 text-center">
                            <span className="inline-flex items-center justify-center px-2 py-1 rounded bg-white/10 text-xs text-white">$15-200/month</span>
                          </td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="p-2 sm:p-4 font-medium text-sm sm:text-base text-white">Learning Resources</td>
                          <td className="p-2 sm:p-4 text-center">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mx-auto" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Best free resources from across the web</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </td>
                          <td className="p-2 sm:p-4 text-center">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mx-auto" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Platform-specific content only</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="p-2 sm:p-4 font-medium text-sm sm:text-base text-white">Content Diversity</td>
                          <td className="p-2 sm:p-4 text-center">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mx-auto" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Multiple teaching styles and approaches</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </td>
                          <td className="p-2 sm:p-4 text-center">
                            <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mx-auto" />
                          </td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="p-2 sm:p-4 font-medium text-sm sm:text-base text-white">Progress Tracking</td>
                          <td className="p-2 sm:p-4 text-center">
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mx-auto" />
                          </td>
                          <td className="p-2 sm:p-4 text-center">
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mx-auto" />
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 sm:p-4 font-medium text-sm sm:text-base text-white">Custom Learning Paths</td>
                          <td className="p-2 sm:p-4 text-center">
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mx-auto" />
                          </td>
                          <td className="p-2 sm:p-4 text-center">
                            <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mx-auto" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <BackgroundBeams />
    </div>
  );
};

export default Hero;
