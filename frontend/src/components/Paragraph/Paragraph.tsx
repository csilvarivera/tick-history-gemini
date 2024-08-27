import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ParagraphProps extends React.HTMLAttributes<HTMLHeadingElement> {
  lead?: boolean;
  bold?: boolean;
}

export function Paragraph({ lead, bold, children, ...props }: ParagraphProps) {
  const className = twMerge(
    'font-fe-lexend-maxi font-[300] max-w-full',
    clsx(
      lead
        ? 'text-[24px] leading-[38px] text-center'
        : 'text-[16px] leading-[24px]',
      {
        'font-[700]': bold,
      },
    ),
    props.className,
  );

  return (
    <p {...props} className={className}>
      {children}
    </p>
  );
}
