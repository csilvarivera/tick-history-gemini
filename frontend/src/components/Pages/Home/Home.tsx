"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/Container';
import { SpeakWithButton } from './SpeakWithButton';
import { FaLongArrowAltDown } from 'react-icons/fa';
import { useEnv } from '@/context/EnvContext';

export function Home({ userEmail }: { userEmail: string }) {
  const router = useRouter();
  const [opacity, setOpacity] = useState(1);
  const videoRef = useRef<HTMLVideoElement | null>(null); 

  const {appBranded, videoSrc} = useEnv();

  console.log(`appBranded=${appBranded}`)
  console.log(`videoSrc=${videoSrc}`)

  if (typeof localStorage !== 'undefined' && userEmail) {
    localStorage.setItem('user_email', userEmail); 
    console.log(`stored user_email ${userEmail} to localStorage`)
  }
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const newOpacity = 1 - (scrollPosition * 2 / maxScroll);
      setOpacity(Math.max(newOpacity, 0.02));
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        {videoSrc && (
          <video
            autoPlay
            loop
            muted
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              opacity: opacity,
            }}
            ref={videoRef}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
      </div>
      <div style={{ height: '100vh' }}></div>
      <div style={{ height: '100vh' }}>
        <Container className="flex flex-col h-full justify-start items-center py-10 px-10">
          <h1 className="text text-black text-6xl text-center font-fe-lexend-maxi my-20">Welcome to AMAnda</h1>
          <h1 className="text text-black text-3xl text-center font-fe-lexend-maxi">A demonstration prototype from</h1>
          <div className="flex items-center space-x-10 my-20">
            <img style={{ width: '40vw' }} src={'/images/google-cloud-logo-transparent.png'} />
          </div>
          <h1 className="text text-black text-4xl text-center font-fe-lexend-maxi my-20">An Ask Me Anything Chatbot for internal data</h1>
          <div className="flex items-center space-x-20 my-8">
            <SpeakWithButton onClick={() => router.push(`/ask-me-anything-chat`)} />
          </div>
          <h1 className="text text-black text-4xl text-center font-fe-lexend-maxi my-20">How It Works</h1>
          <div className="flex justify-center">
            <FaLongArrowAltDown style={{ fill: '#1003a1' }} size={100} />
          </div>
          <div className="flex items-center space-x-10 my-20">
            <img style={{ height: '100vh' }} src={'/images/architecture-diagram.png'} />
          </div>
        </Container>
      </div>
    </div>
  );
}