import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

export const Button = ({
  ...props
}: ButtonProps) => {
  const className = twMerge(
    clsx(
      'font-fe-sans-maxi font-bold uppercase rounded-full px-6 py-4 text-[14px]',
      props.className,
    ),
  );

  const child = <button {...props} className={className}></button>;

  return (
    <div
      className={clsx('rounded-full border-3 border-transparent p-[3px]', {})}
    >
      {child}
    </div>
  );
};

Button.displayName = 'Button';
