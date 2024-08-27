import React from 'react';

interface CrossIconProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'onClick'> {
  onClick?: () => void;
}

export function CrossIcon({ onClick, ...props }: CrossIconProps) {
  return (
    <div
      className="group hover:bg-black rounded-full p-1 cursor-pointer"
      onClick={onClick}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-white group-hover:fill-neutral-light-5"
        {...props}
      >
        <path d="M19.7 4.3C19.3 3.9 18.7 3.9 18.3 4.3L12 10.6L5.7 4.3C5.3 3.9 4.7 3.9 4.3 4.3C3.9 4.7 3.9 5.3 4.3 5.7L10.6 12L4.3 18.3C3.9 18.7 3.9 19.3 4.3 19.7C4.5 19.9 4.7 20 5 20C5.3 20 5.5 19.9 5.7 19.7L12 13.4L18.3 19.7C18.5 19.9 18.8 20 19 20C19.2 20 19.5 19.9 19.7 19.7C20.1 19.3 20.1 18.7 19.7 18.3L13.4 12L19.7 5.7C20.1 5.3 20.1 4.7 19.7 4.3Z" />
      </svg>
    </div>
  );
}
