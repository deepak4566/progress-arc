
import React, { createContext, useContext, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import RouterHeader from '@/components/layout/RouterHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Define the onboarding steps in order
const ONBOARDING_STEPS = [
  { path: '/onboarding', label: 'Learning Goals' },
  { path: '/onboarding/time', label: 'Time Commitment' },
  { path: '/onboarding/experience', label: 'Experience Level' },
];

// Create a context to store and share onboarding data
type OnboardingContextType = {
  onboardingData: Record<string, any>;
  updateOnboardingData: (key: string, value: any) => void;
  currentStepIndex: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

const OnboardingLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [onboardingData, setOnboardingData] = useState<Record<string, any>>({});
  
  // Determine current step index
  const currentStepIndex = ONBOARDING_STEPS.findIndex(step => step.path === location.pathname);
  const isLastStep = currentStepIndex === ONBOARDING_STEPS.length - 1;
  const isFirstStep = currentStepIndex === 0;
  
  const updateOnboardingData = (key: string, value: any) => {
    setOnboardingData(prev => ({ ...prev, [key]: value }));
  };
  
  const goToNextStep = () => {
    if (isLastStep) {
      // If this is the last step, finish onboarding and navigate to course dashboard
      console.log('Onboarding complete with data:', onboardingData);
      navigate('/course-dashboard', { 
        state: { 
          learningGoal: onboardingData.learningGoal,
          timeCommitment: onboardingData.timeCommitment,
          experienceLevel: onboardingData.experienceLevel
        } 
      });
      return;
    }
    
    // Otherwise, move to the next step
    navigate(ONBOARDING_STEPS[currentStepIndex + 1].path);
  };
  
  const goToPreviousStep = () => {
    if (isFirstStep) {
      return; // We're at the first step
    }
    navigate(ONBOARDING_STEPS[currentStepIndex - 1].path);
  };
  
  return (
    <OnboardingContext.Provider 
      value={{ 
        onboardingData, 
        updateOnboardingData, 
        currentStepIndex,
        goToNextStep,
        goToPreviousStep,
        isLastStep,
        isFirstStep 
      }}
    >
      <div className="min-h-screen flex flex-col bg-background">
        <RouterHeader />
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-1 bg-primary/10">
              <div className="flex">
                {ONBOARDING_STEPS.map((step, index) => (
                  <div 
                    key={step.path}
                    className="flex-1 h-2 rounded-full overflow-hidden"
                  >
                    <div 
                      className={`h-full ${index <= currentStepIndex ? 'bg-primary' : 'bg-gray-200'}`} 
                      style={{ width: index === currentStepIndex ? '50%' : '100%' }}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-8">
              <h1 className="text-2xl font-bold mb-1">
                {ONBOARDING_STEPS[currentStepIndex]?.label || 'Onboarding'}
              </h1>
              <p className="text-muted-foreground mb-6">
                Step {currentStepIndex + 1} of {ONBOARDING_STEPS.length}
              </p>
              
              <div className="min-h-[300px]">
                <Outlet />
              </div>
              
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={goToPreviousStep}
                  disabled={isFirstStep}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                
                <Button onClick={goToNextStep}>
                  {isLastStep ? 'Finish' : 'Continue'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </OnboardingContext.Provider>
  );
};

export default OnboardingLayout;
