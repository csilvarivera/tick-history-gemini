import React from 'react';

export function AudioIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
      <defs>
        <linearGradient
          id="paint0_linear_886_3907"
          x1="-29"
          y1="1.5519e-06"
          x2="56"
          y2="26.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F38C20" />
          <stop offset="0.191842" stopColor="#EDAD75" />
          <stop offset="0.482997" stopColor="#FFD477" />
          <stop offset="0.654082" stopColor="#FFBD8A" />
          <stop offset="0.768341" stopColor="#FFAEBC" />
          <stop offset="0.798566" stopColor="#FDC6C3" />
          <stop offset="0.875207" stopColor="#FFB494" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="16" fill="url(#paint0_linear_886_3907)" />
      <rect x="11" y="12.25" width="2.5" height="7.5" rx="1.25" fill="white" />
      <rect
        x="7.25"
        y="14.125"
        width="2.5"
        height="3.75"
        rx="1.25"
        fill="white"
      />
      <rect
        x="14.75"
        y="9.75"
        width="2.5"
        height="12.5"
        rx="1.25"
        fill="white"
      />
      <rect
        x="18.5"
        y="12.25"
        width="2.5"
        height="7.5"
        rx="1.25"
        fill="white"
      />
      <rect
        x="22.25"
        y="14.125"
        width="2.5"
        height="3.75"
        rx="1.25"
        fill="white"
      />
    </svg>
  );
}
