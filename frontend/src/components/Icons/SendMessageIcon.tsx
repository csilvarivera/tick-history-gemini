import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

function SendMessageIconOutline(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.0865 0.277758C15.4543 0.150947 15.8077 0.471365 15.7427 0.835003L15.7222 0.91344L10.7222 15.4134C10.5858 15.8089 10.0665 15.8628 9.84186 15.5409L9.79555 15.46L6.79555 8.95997C6.72031 8.79695 6.73901 8.60853 6.83917 8.46474L6.89598 8.39689L9.89598 5.39689C10.0912 5.20163 10.4078 5.20163 10.6031 5.39689C10.7767 5.57046 10.7959 5.83988 10.6609 6.03475L10.6031 6.104L7.84853 8.85744L10.1815 13.9124L14.4425 1.55644L2.08853 5.81644L5.44101 7.36444C5.66389 7.46728 5.77516 7.71341 5.71588 7.94294L5.68554 8.02792C5.5827 8.2508 5.33657 8.36207 5.10704 8.30279L5.02206 8.27245L0.540056 6.20445C0.160181 6.02917 0.15861 5.50702 0.501349 5.31572L0.586539 5.27776L15.0865 0.277758Z"
        fill="#0F2332"
      />
    </svg>
  );
}

function SendMessageIconGradient(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.6178 22.0004C13.2208 22.0003 12.8579 21.7762 12.6798 21.4214L9.57081 15.2004C9.40004 14.8579 9.42876 14.4497 9.64581 14.1344L14.6658 7.33445L7.86581 12.3524C7.55096 12.5695 7.14298 12.5983 6.80081 12.4274L0.57781 9.31845C0.205726 9.13092 -0.0199227 8.74079 0.00306971 8.32476C0.0260621 7.90872 0.293328 7.54583 0.68381 7.40045L20.5888 0.0644479C20.9722 -0.0772314 21.403 0.0171703 21.6921 0.306201C21.9811 0.595231 22.0755 1.02604 21.9338 1.40945L14.5988 21.3154C14.4545 21.7074 14.0908 21.9759 13.6738 21.9984L13.6178 22.0004Z"
        fill="url(#paint0_linear_922_314)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_922_314"
          x1="0.00146486"
          y1="10.978"
          x2="21.9987"
          y2="10.978"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D498E0" />
          <stop offset="0.191842" stopColor="#ED75DF" />
          <stop offset="0.482997" stopColor="#FF77A8" />
          <stop offset="0.710051" stopColor="#FF978A" />
          <stop offset="0.768341" stopColor="#FFAEBC" />
          <stop offset="0.798566" stopColor="#FDC6C3" />
          <stop offset="0.875207" stopColor="#FFB494" />
        </linearGradient>
      </defs>
    </svg>
  );
}

interface SendMessageIconProps extends React.SVGProps<SVGSVGElement> {
  outline?: boolean;
  disabled?: boolean;
  gradient?: boolean;
}

export function SendMessageIcon({
  outline,
  disabled,
  gradient,
  ...props
}: SendMessageIconProps) {
  if (outline) return <SendMessageIconOutline {...props} />;

  if (gradient) return <SendMessageIconGradient {...props} />;

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      {...props}
      className={twMerge(
        clsx(props.className, {
          'fill-neutral-light-4': disabled,
        }),
      )}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.7066 0.292881C15.4336 0.0208806 15.0266 -0.0721194 14.6636 0.0588806L0.663568 5.05888C0.286568 5.19288 0.0255682 5.53988 0.00156817 5.93888C-0.0224318 6.33888 0.193568 6.71388 0.552568 6.89388L5.13857 9.18588L10.9996 4.99988L6.81257 10.8619L9.10457 15.4479C9.27557 15.7869 9.62257 15.9999 9.99957 15.9999C10.0206 15.9999 10.0406 15.9989 10.0606 15.9979C10.4606 15.9739 10.8076 15.7139 10.9426 15.3359L15.9426 1.33588C16.0716 0.972881 15.9796 0.565881 15.7066 0.292881Z"
      />
    </svg>
  );
}
