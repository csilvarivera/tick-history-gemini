import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ContainerProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export const Container = (props: ContainerProps) => {
  return (
    <div
      {...props}
      className={twMerge(clsx('container mx-auto', props.className))}
    />
  );
};
