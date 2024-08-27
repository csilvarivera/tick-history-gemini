import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

function State0(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
      <mask
        id="mask0_1077_489"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="32"
        height="32"
      >
        <circle cx="16" cy="16" r="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1077_489)">
        <g filter="url(#filter0_f_1077_489)">
          <circle
            cx="13.9427"
            cy="17.0431"
            r="14.7009"
            transform="rotate(135.553 13.9427 17.0431)"
            fill="url(#paint0_linear_1077_489)"
          />
        </g>
        <g opacity="0.7" filter="url(#filter1_f_1077_489)">
          <path
            d="M20.6282 13.4016C23.0719 22.887 14.3311 31.4608 4.8946 28.8345C-4.54187 26.2082 -7.59659 14.3515 -0.6039 7.4924C6.38879 0.633335 18.1844 3.91623 20.6282 13.4016Z"
            fill="url(#paint1_linear_1077_489)"
          />
        </g>
        <rect
          x="11"
          y="14.75"
          width="2.5"
          height="2.5"
          rx="1.25"
          fill="white"
        />
        <rect
          x="7.25"
          y="14.75"
          width="2.5"
          height="2.5"
          rx="1.25"
          fill="white"
        />
        <rect
          x="14.75"
          y="14.75"
          width="2.5"
          height="2.5"
          rx="1.25"
          fill="white"
        />
        <rect
          x="18.5"
          y="14.75"
          width="2.5"
          height="2.5"
          rx="1.25"
          fill="white"
        />
        <rect
          x="22.25"
          y="14.75"
          width="2.5"
          height="2.5"
          rx="1.25"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_1077_489"
          x="-9.27987"
          y="-6.17929"
          width="46.445"
          height="46.4448"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="4.26079"
            result="effect1_foregroundBlur_1077_489"
          />
        </filter>
        <filter
          id="filter1_f_1077_489"
          x="-10.8165"
          y="-2.54767"
          width="38.2511"
          height="38.2533"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="3.19559"
            result="effect1_foregroundBlur_1077_489"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1077_489"
          x1="2.2809"
          y1="4.36828"
          x2="22.8009"
          y2="31.744"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EA59F1" />
          <stop offset="1" stopColor="#FFB79A" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1077_489"
          x1="26.1266"
          y1="34.7437"
          x2="-9.51408"
          y2="-1.59138"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FEC0C2" />
          <stop offset="1" stopColor="#FF7CAA" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function State1(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
      <mask
        id="mask0_1077_436"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="32"
        height="32"
      >
        <circle cx="16" cy="16" r="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1077_436)">
        <g filter="url(#filter0_f_1077_436)">
          <circle
            cx="13.8097"
            cy="17.6758"
            r="17.9678"
            transform="rotate(135.553 13.8097 17.6758)"
            fill="url(#paint0_linear_1077_436)"
          />
        </g>
        <g opacity="0.7" filter="url(#filter1_f_1077_436)">
          <path
            d="M18.6331 14.4345C21.3441 24.5256 11.9864 33.7045 1.94947 30.7993C-7.91024 27.9454 -11.0417 15.5265 -3.71397 8.33876C3.61376 1.15106 15.97 4.52152 18.6331 14.4345Z"
            fill="url(#paint1_linear_1077_436)"
          />
        </g>
        <rect
          x="11"
          y="12.25"
          width="2.5"
          height="7.5"
          rx="1.25"
          fill="white"
        />
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
      </g>
      <defs>
        <filter
          id="filter0_f_1077_436"
          x="-12.6798"
          y="-8.81356"
          width="52.9787"
          height="52.9787"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="4.26079"
            result="effect1_foregroundBlur_1077_436"
          />
        </filter>
        <filter
          id="filter1_f_1077_436"
          x="-14.1331"
          y="-1.8985"
          width="39.6317"
          height="39.6342"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="3.19559"
            result="effect1_foregroundBlur_1077_436"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1077_436"
          x1="-0.443628"
          y1="2.18433"
          x2="24.6364"
          y2="35.6436"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C65DAC" />
          <stop offset="1" stopColor="#FF7CAA" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1077_436"
          x1="24.807"
          y1="37.4153"
          x2="-13.2209"
          y2="-1.35344"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EA59F1" stopOpacity="0.52" />
          <stop offset="1" stopColor="#FFB79A" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function State2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
      <mask
        id="mask0_1077_446"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="32"
        height="32"
      >
        <circle cx="16" cy="16" r="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1077_446)">
        <g filter="url(#filter0_f_1077_446)">
          <circle
            cx="12.739"
            cy="20.4784"
            r="17.3144"
            transform="rotate(135.553 12.739 20.4784)"
            fill="url(#paint0_linear_1077_446)"
          />
        </g>
        <g opacity="0.8" filter="url(#filter1_f_1077_446)">
          <path
            d="M32.4367 9.18027C35.6411 21.6178 24.1797 32.8602 11.8063 29.4164C-0.567135 25.9727 -4.57259 10.4257 4.59648 1.43189C13.7655 -7.56196 29.2324 -3.25731 32.4367 9.18027Z"
            fill="url(#paint1_linear_1077_446)"
          />
        </g>
        <rect
          x="11"
          y="12.875"
          width="2.5"
          height="5.625"
          rx="1.25"
          fill="white"
        />
        <rect
          x="7.25"
          y="14.75"
          width="2.5"
          height="2.5"
          rx="1.25"
          fill="white"
        />
        <rect
          x="14.75"
          y="11.625"
          width="2.5"
          height="8.75"
          rx="1.25"
          fill="white"
        />
        <rect
          x="18.5"
          y="13.5"
          width="2.5"
          height="5.625"
          rx="1.25"
          fill="white"
        />
        <rect
          x="22.25"
          y="14.75"
          width="2.5"
          height="2.5"
          rx="1.25"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_1077_446"
          x="-13.097"
          y="-5.35751"
          width="51.672"
          height="51.6718"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="4.26079"
            result="effect1_foregroundBlur_1077_446"
          />
        </filter>
        <filter
          id="filter1_f_1077_446"
          x="-6.80549"
          y="-9.74372"
          width="46.1779"
          height="46.1808"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="3.19559"
            result="effect1_foregroundBlur_1077_446"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1077_446"
          x1="-0.995988"
          y1="5.55027"
          x2="23.172"
          y2="37.7928"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E088E0" />
          <stop offset="1" stopColor="#FF78A9" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1077_446"
          x1="39.6466"
          y1="37.1648"
          x2="-7.08689"
          y2="-10.4791"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF6F34" />
          <stop offset="1" stopColor="#FD77AF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function State3(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
      <mask
        id="mask0_1077_456"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="32"
        height="32"
      >
        <circle cx="16" cy="16" r="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1077_456)">
        <g filter="url(#filter0_f_1077_456)">
          <circle
            cx="12.7212"
            cy="16.2279"
            r="17.1511"
            transform="rotate(135.553 12.7212 16.2279)"
            fill="url(#paint0_linear_1077_456)"
          />
        </g>
        <g opacity="0.7" filter="url(#filter1_f_1077_456)">
          <path
            d="M27.6574 15.9974C30.6379 26.8724 20.5217 36.7952 9.70622 33.6055L5.05764 32.2345C-5.47479 29.1283 -8.78841 15.8456 -0.949176 8.15616L2.41835 4.85298C10.2576 -2.83646 23.4739 0.732796 26.3764 11.3232L27.6574 15.9974Z"
            fill="url(#paint1_linear_1077_456)"
          />
        </g>
        <rect
          x="11"
          y="14.75"
          width="2.5"
          height="3.75"
          rx="1.25"
          fill="white"
        />
        <rect
          x="7.25"
          y="14.75"
          width="2.5"
          height="2.5"
          rx="1.25"
          fill="white"
        />
        <rect
          x="14.75"
          y="12.875"
          width="2.5"
          height="6.25"
          rx="1.25"
          fill="white"
        />
        <rect
          x="18.5"
          y="13.5"
          width="2.5"
          height="3.75"
          rx="1.25"
          fill="white"
        />
        <rect
          x="22.25"
          y="14.75"
          width="2.5"
          height="2.5"
          rx="1.25"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_1077_456"
          x="-12.9515"
          y="-9.44467"
          width="51.3454"
          height="51.3451"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="4.26079"
            result="effect1_foregroundBlur_1077_456"
          />
        </filter>
        <filter
          id="filter1_f_1077_456"
          x="-11.6619"
          y="-5.66437"
          width="46.2391"
          height="46.267"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="3.19559"
            result="effect1_foregroundBlur_1077_456"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1077_456"
          x1="-0.884201"
          y1="1.44064"
          x2="23.0558"
          y2="33.379"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DD8CE0" />
          <stop offset="1" stopColor="#FF71A4" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1077_456"
          x1="38.9648"
          y1="34.2461"
          x2="-10.717"
          y2="-4.70867"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFB494" />
          <stop offset="1" stopColor="#FF78A9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function State4(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
      <mask
        id="mask0_1077_466"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="32"
        height="32"
      >
        <circle cx="16" cy="16" r="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1077_466)">
        <g filter="url(#filter0_f_1077_466)">
          <circle
            cx="11.6859"
            cy="17.2439"
            r="16.8244"
            transform="rotate(135.553 11.6859 17.2439)"
            fill="url(#paint0_linear_1077_466)"
          />
        </g>
        <g opacity="0.5" filter="url(#filter1_f_1077_466)">
          <path
            d="M24.1244 13.3357C26.5312 22.6776 17.9225 31.1217 8.62882 28.5352C-0.664884 25.9486 -3.67339 14.2712 3.21351 7.51593C10.1004 0.760631 21.7176 3.99386 24.1244 13.3357Z"
            fill="url(#paint1_linear_1077_466)"
          />
        </g>
        <rect x="11" y="13.5" width="2.5" height="5" rx="1.25" fill="white" />
        <rect
          x="7.25"
          y="14.75"
          width="2.5"
          height="2.5"
          rx="1.25"
          fill="white"
        />
        <rect
          x="14.75"
          y="12.875"
          width="2.5"
          height="5.625"
          rx="1.25"
          fill="white"
        />
        <rect x="18.5" y="13.5" width="2.5" height="5" rx="1.25" fill="white" />
        <rect
          x="22.25"
          y="14.75"
          width="2.5"
          height="2.5"
          rx="1.25"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_1077_466"
          x="-13.66"
          y="-8.10214"
          width="50.6918"
          height="50.6921"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="4.26079"
            result="effect1_foregroundBlur_1077_466"
          />
        </filter>
        <filter
          id="filter1_f_1077_466"
          x="-6.94123"
          y="-2.46882"
          width="37.8659"
          height="37.8678"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="3.19559"
            result="effect1_foregroundBlur_1077_466"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1077_466"
          x1="-1.66038"
          y1="2.73824"
          x2="21.8236"
          y2="34.0682"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF78AA" />
          <stop offset="1" stopColor="#E680E0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1077_466"
          x1="53.4134"
          y1="50.5706"
          x2="-5.56188"
          y2="-1.43042"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D794E0" />
          <stop offset="1" stopColor="#FFB494" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function State5(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
      <mask
        id="mask0_1077_476"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="32"
        height="32"
      >
        <circle cx="16" cy="16" r="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1077_476)">
        <g filter="url(#filter0_f_1077_476)">
          <circle
            cx="12.4563"
            cy="16.703"
            r="14.7009"
            transform="rotate(135.553 12.4563 16.703)"
            fill="url(#paint0_linear_1077_476)"
          />
        </g>
        <g opacity="0.6" filter="url(#filter1_f_1077_476)">
          <path
            d="M21.5103 26.901L-13.561 17.1401L12.4278 -8.35201L21.5103 26.901Z"
            fill="url(#paint1_linear_1077_476)"
          />
        </g>
        <rect
          x="11"
          y="14.75"
          width="2.5"
          height="2.5"
          rx="1.25"
          fill="white"
        />
        <rect
          x="7.25"
          y="14.75"
          width="2.5"
          height="2.5"
          rx="1.25"
          fill="white"
        />
        <rect
          x="14.75"
          y="14.75"
          width="2.5"
          height="2.5"
          rx="1.25"
          fill="white"
        />
        <rect
          x="18.5"
          y="14.75"
          width="2.5"
          height="2.5"
          rx="1.25"
          fill="white"
        />
        <rect
          x="22.25"
          y="14.75"
          width="2.5"
          height="2.5"
          rx="1.25"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_1077_476"
          x="-10.7662"
          y="-6.51937"
          width="46.445"
          height="46.4448"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="4.26079"
            result="effect1_foregroundBlur_1077_476"
          />
        </filter>
        <filter
          id="filter1_f_1077_476"
          x="-19.9522"
          y="-14.7432"
          width="47.8536"
          height="48.0353"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="3.19559"
            result="effect1_foregroundBlur_1077_476"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1077_476"
          x1="0.794569"
          y1="4.02819"
          x2="21.3146"
          y2="31.4039"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F576C7" />
          <stop offset="1" stopColor="#FFB494" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1077_476"
          x1="21.5103"
          y1="26.901"
          x2="-7.92552"
          y2="-3.10825"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EA59F1" />
          <stop offset="1" stopColor="#E81E77" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function AudioAnimatedIcon(props: React.SVGProps<SVGSVGElement>) {
  const states = [
    <State0 {...props} key={0} />,
    <State1 {...props} key={1} />,
    <State2 {...props} key={2} />,
    <State3 {...props} key={3} />,
    <State4 {...props} key={4} />,
    <State5 {...props} key={5} />,
  ] as const;
  const [currentState, setCurrentState] = useState<keyof typeof states>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentState((state) => ((state as number) + 1) % states.length);
    }, 100);

    return () => clearInterval(interval);
  });

  return (
    <AnimatePresence mode="popLayout">
      <div>
        {states.map((state, index) => {
          return (
            index === currentState && (
              <motion.div
                key={index}
                initial={{
                  opacity: 0.8,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0.8,
                }}
              >
                {state}
              </motion.div>
            )
          );
        })}
      </div>
    </AnimatePresence>
  );
}
