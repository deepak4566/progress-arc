
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RouterHeader from '@/components/layout/RouterHeader';
import Footer from '@/components/layout/Footer';
import CourseModule, { CourseModuleProps } from '@/components/course/CourseModule';
import SkillPoints from '@/components/course/SkillPoints';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  ChevronLeft, 
  PlayCircle, 
  BookOpen, 
  BarChart3, 
  BookMarked,
  Users,
  Calendar,
  ArrowRight,
  CheckCircle,
  Check 
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface DataScienceCourseProps {
  timeCommitment: string;
  experienceLevel: string;
}

const getDataScienceModules = (timeCommitment: string, experienceLevel: string) => {
  const baseModules = [
    {
      id: 'module-1',
      title: 'Module 1: Data Science Foundations',
      subtitle: '(4 subtopics)',
      tags: ['Data Science', 'Statistics'],
      subModules: [
        {
          id: 'sub-1',
          title: 'Statistical Fundamentals',
          videos: [
            {
              id: 'video-1',
              title: 'Descriptive Statistics',
              duration: '18:30',
              videoUrl: 'https://example.com/videos/descriptive-stats',
            },
            {
              id: 'video-2',
              title: 'Probability Distributions',
              duration: '22:15',
              videoUrl: 'https://example.com/videos/probability',
            },
          ],
        },
        {
          id: 'sub-2',
          title: 'Data Collection and Cleaning',
          videos: [
            {
              id: 'video-3',
              title: 'Data Sources and APIs',
              duration: '20:45',
              videoUrl: 'https://example.com/videos/data-collection',
            },
          ],
        },
      ],
    },
    {
      id: 'module-2',
      title: 'Module 2: Python for Data Science',
      subtitle: '(5 subtopics)',
      tags: ['Python', 'Programming'],
      subModules: [
        {
          id: 'sub-3',
          title: 'Pandas and NumPy',
          videos: [
            {
              id: 'video-4',
              title: 'Data Manipulation with Pandas',
              duration: '25:20',
              videoUrl: 'https://example.com/videos/pandas-basics',
            },
          ],
        },
      ],
    },
  ];

  if (experienceLevel !== 'beginner') {
    baseModules.push({
      id: 'module-3',
      title: 'Module 3: Machine Learning Basics',
      subtitle: '(6 subtopics)',
      tags: ['ML', 'Algorithms'],
      subModules: [
        {
          id: 'sub-4',
          title: 'Supervised Learning',
          videos: [
            {
              id: 'video-5',
              title: 'Linear Regression',
              duration: '28:40',
              videoUrl: 'https://example.com/videos/linear-regression',
            },
          ],
        },
      ],
    });
  }

  return baseModules;
};

const DataScienceCourse = ({ timeCommitment, experienceLevel }: DataScienceCourseProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [currentVideoTitle, setCurrentVideoTitle] = useState<string>('');
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);
  const [completedProjects, setCompletedProjects] = useState<string[]>([]);
  const [currentModuleIndex, setCurrentModuleIndex] = useState<number>(0);
  
  const modules = getDataScienceModules(timeCommitment, experienceLevel);
  
  // Calculate total videos for skill points
  const totalVideos = modules.reduce((total, module) => {
    return total + module.subModules.reduce((subTotal, subModule) => {
      return subTotal + subModule.videos.length;
    }, 0);
  }, 0);
  
  const calculateOverallProgress = () => {
    if (!modules || modules.length === 0) return 0;
    
    let totalVideos = 0;
    modules.forEach(module => {
      module.subModules.forEach(subModule => {
        totalVideos += subModule.videos.length;
      });
    });
    
    return totalVideos > 0 ? Math.round((completedVideos.length / totalVideos) * 100) : 0;
  };
  
  const [overallProgress, setOverallProgress] = useState<number>(0);
  
  useEffect(() => {
    setOverallProgress(calculateOverallProgress());
  }, [completedVideos]);
  
  const handleVideoSelect = (videoId: string) => {
    setSelectedVideoId(videoId);
    
    for (const module of modules) {
      for (const subModule of module.subModules) {
        const video = subModule.videos.find(v => v.id === videoId);
        if (video) {
          setCurrentVideoTitle(video.title);
          break;
        }
      }
    }
  };
  
  const handleToggleComplete = (videoId: string) => {
    setCompletedVideos(prev => {
      if (prev.includes(videoId)) {
        return prev.filter(id => id !== videoId);
      } else {
        return [...prev, videoId];
      }
    });
    
    toast({
      title: completedVideos.includes(videoId) ? "Lesson marked as incomplete" : "Lesson completed!",
      description: completedVideos.includes(videoId) 
        ? "You can revisit this lesson anytime." 
        : "Great job! Keep up the good work.",
    });
  };

  const getEstimatedTime = () => {
    switch (timeCommitment) {
      case 'minimal': return '10-12 weeks';
      case 'moderate': return '6-8 weeks';
      case 'significant': return '4-6 weeks';
      case 'intensive': return '3-4 weeks';
      default: return '6-8 weeks';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <RouterHeader />
      <main className="flex-1 pt-24 pb-16 bg-gradient-to-b from-background to-background/80">
        <div className="bg-gradient-to-r from-green-600/90 to-blue-500/80 text-white mb-8">
          <div className="container px-4 py-6 max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <button 
                    onClick={() => navigate('/dashboard')} 
                    className="p-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-medium">Back to Dashboard</span>
                </div>
                <h1 className="text-3xl font-bold">Data Science and Analysis</h1>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-xs font-semibold text-white">
                    {experienceLevel} level
                  </span>
                  <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-xs font-semibold text-white">
                    {timeCommitment} pace
                  </span>
                  <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-xs font-semibold text-white">
                    <Users className="mr-1 h-3 w-3" />
                    2,756 enrolled
                  </span>
                  <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-xs font-semibold text-white">
                    <Calendar className="mr-1 h-3 w-3" />
                    {getEstimatedTime()}
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">{overallProgress}%</div>
                  <div className="text-xs text-white/80">Completed</div>
                </div>
                <div className="flex-1 max-w-[120px]">
                  <Progress value={overallProgress} className="h-2 bg-white/20" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <SkillPoints 
                completedVideos={completedVideos}
                completedProjects={completedProjects}
                totalVideos={totalVideos}
                totalProjects={1}
              />
              
              <div className="bg-card rounded-lg border shadow-sm p-4 mb-4 sticky top-24">
                <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Course Modules
                </h2>
                
                <div className="space-y-2">
                  {modules.map((module, index) => (
                    <CourseModule 
                      key={module.id}
                      {...module}
                      expanded={index === currentModuleIndex}
                      onSelect={handleVideoSelect}
                      completedVideos={completedVideos}
                      onToggleComplete={handleToggleComplete}
                    />
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <Button 
                    className="w-full gap-2"
                    onClick={() => {
                      if (!completedProjects.includes('analysis-project')) {
                        setCompletedProjects(prev => [...prev, 'analysis-project']);
                        toast({
                          title: "Project completed!",
                          description: "You earned 5 skill points for completing the data analysis project!",
                        });
                      }
                    }}
                  >
                    Data Analysis Project
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
                {selectedVideoId ? (
                  <div>
                    <div className="aspect-video bg-black flex items-center justify-center relative group">
                      <div className="text-center p-8 z-10 relative">
                        <PlayCircle className="w-16 h-16 text-primary mx-auto mb-4 cursor-pointer transition-transform group-hover:scale-110" />
                        <div className="backdrop-blur-sm bg-black/30 p-2 rounded-lg inline-block">
                          <p className="text-white">{currentVideoTitle}</p>
                        </div>
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-medium">{currentVideoTitle}</h2>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant={completedVideos.includes(selectedVideoId) ? "default" : "outline"} 
                            size="sm" 
                            onClick={() => handleToggleComplete(selectedVideoId)}
                            className="gap-2"
                          >
                            <Check className="h-4 w-4" />
                            {completedVideos.includes(selectedVideoId) ? "Completed" : "Mark Complete"}
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mt-2 mb-4">
                        This data science lesson is designed for {experienceLevel} level learners with a {timeCommitment} commitment.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="bg-primary/10 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                      <PlayCircle className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">Select a video to start learning</h3>
                    <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                      Choose a module and video to begin your data science journey
                    </p>
                    <Button className="mt-6" onClick={() => handleVideoSelect(modules[0]?.subModules[0]?.videos[0]?.id || '')}>
                      Start First Lesson
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DataScienceCourse;
