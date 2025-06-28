
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles, BookOpen, Users, BarChart, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface LoadingScreenProps {
  coursePath: string;
}

const LoadingScreen = ({ coursePath }: LoadingScreenProps) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  const steps = [
    { icon: Brain, text: "Analyzing your learning profile...", delay: 0 },
    { icon: BookOpen, text: "Designing personalized modules...", delay: 15 },
    { icon: Users, text: "Customizing difficulty levels...", delay: 30 },
    { icon: BarChart, text: "Optimizing learning path...", delay: 45 },
    { icon: Sparkles, text: "Finalizing your course...", delay: 55 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / 60);
        return newProgress >= 100 ? 100 : newProgress;
      });

      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          clearInterval(interval);
          navigate(coursePath);
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate, coursePath]);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      const elapsed = 60 - timeLeft;
      const newStep = steps.findIndex(step => elapsed >= step.delay && elapsed < (steps[steps.indexOf(step) + 1]?.delay || 60));
      if (newStep !== -1 && newStep !== currentStep) {
        setCurrentStep(newStep);
      }
    }, 100);

    return () => clearInterval(stepTimer);
  }, [timeLeft, currentStep, steps]);

  const CurrentIcon = steps[currentStep]?.icon || Brain;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 animate-pulse">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              AI is Crafting Your Course
            </h1>
            <p className="text-lg text-gray-300">
              Our AI is personalizing your learning experience...
            </p>
          </div>

          {/* Progress Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-white font-medium">Progress</span>
              <span className="text-white font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3 bg-white/20" />
            <div className="text-center mt-4">
              <span className="text-gray-300 text-sm">
                Estimated time: {timeLeft} seconds
              </span>
            </div>
          </div>

          {/* Current Step */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
              <CurrentIcon className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div className="flex-1">
              <p className="text-white text-lg font-medium">
                {steps[currentStep]?.text || "Processing..."}
              </p>
            </div>
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          </div>

          {/* Steps Timeline */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div 
                  key={index}
                  className={`flex items-center space-x-4 transition-all duration-300 ${
                    isActive ? 'opacity-100 scale-105' : isCompleted ? 'opacity-75' : 'opacity-50'
                  }`}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                    isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500 animate-pulse' : 'bg-white/20'
                  }`}>
                    <StepIcon className={`w-4 h-4 ${
                      isCompleted || isActive ? 'text-white' : 'text-gray-400'
                    }`} />
                  </div>
                  <span className={`text-sm transition-colors ${
                    isActive ? 'text-white font-medium' : isCompleted ? 'text-gray-300' : 'text-gray-400'
                  }`}>
                    {step.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-white/20">
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="text-sm">Creating a personalized learning experience just for you</span>
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
