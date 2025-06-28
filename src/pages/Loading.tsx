
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import LoadingScreen from '@/components/loading/LoadingScreen';

const Loading = () => {
  const location = useLocation();
  const coursePath = location.state?.coursePath;

  // If no course path is provided, redirect to onboarding
  if (!coursePath) {
    return <Navigate to="/onboarding" replace />;
  }

  return <LoadingScreen coursePath={coursePath} />;
};

export default Loading;
