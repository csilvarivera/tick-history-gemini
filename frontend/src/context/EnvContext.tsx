"use client"

import React, { createContext, useState, useEffect, useMemo } from 'react';
import EnvVariables from './EnvVariables';
import { axios } from '@/axios';

const EnvContext = createContext<EnvVariables | null>(null);

export function EnvProvider({ children }: { children: React.ReactNode }) {
  const [appBranded, setAppBranded] = useState<string | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnvVars = async () => {
      try {
        const response = await axios.get<EnvVariables>('/environment');
        setAppBranded(response.data.appBranded);
        setVideoSrc(response.data.appBranded === 'BT'
          ? '/images/bt.mp4'
          : '/images/gcp.mp4');
      } catch (error) {
        console.error('Error fetching env vars:', error);
      }
    };

    fetchEnvVars();
  }, []);

  const value = useMemo(() => ({ appBranded, videoSrc }), [appBranded, videoSrc]);

  return <EnvContext.Provider value={value}>{children}</EnvContext.Provider>;
}

export function useEnv() {
  const context = React.useContext(EnvContext);
  if (!context) {
    throw new Error('useEnv must be used within an EnvProvider');
  }
  return context;
}
