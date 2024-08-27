// import Lottie from 'lottie-react';
import React from 'react';
import googleDotsGif from '../googledots.gif'; 
import Image from 'next/image';

// import animationData from './animation-data.json';

export function DotsAnimatedIcon() {
  return (
    <div className="w-[24px] h-[24px]">
      {/* <Lottie animationData={animationData} loop /> */}
      <Image src={googleDotsGif} alt="Loading" width={24} height={24} />
    </div>
  );
}
