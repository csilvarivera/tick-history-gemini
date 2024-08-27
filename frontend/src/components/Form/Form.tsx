import clsx from 'clsx';
import { FormEvent, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Button } from '@/components/Button';
import { DotsAnimatedIcon } from '@/components/Icons';
import { Input } from '@/components/Input';

export interface FormProps {
  sendRequest: (question: string) => Promise<void> | void;
  canSendRequest: boolean;
  loading: boolean;
  placeholder?: string;
}

export function Form({
  sendRequest,
  canSendRequest,
  loading,
  placeholder,
}: FormProps) {
  const [value, setValue] = useState('');

  const imageSrc = process.env.APP_BRANDED === 'BT'
  ? '/images/bt-logo.png'
  : '/images/gcp-logo.png'; 
    
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.trim() === '') return;

    setValue('');

    await sendRequest(value);
  };

  const child = (
    <form
      onSubmit={onSubmit}
      style={{ borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0}}
      className={twMerge(
        clsx(
          'flex flex-1 flex-grow items-center px-3 py-2 border border-neutral-dark-4',
        ),
      )}
    >
      <Input
        className={twMerge(
          clsx(
            'flex font-fe-lexend-maxi flex-grow font-[300] focus:outline-none bg-transparent disabled:bg-transparent',
          ),
        )}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={loading}
        maxLength={1024}
      />
      <Button
        type="submit"
        className="flex items-center p-0 hover:none"
        disabled={!canSendRequest}
      >
        {canSendRequest ? (
          <img
            src={imageSrc}
            width={24}
            height={24}
          />
        ) : (
          <DotsAnimatedIcon />
        )}
      </Button>
    </form>
  );

  return child;
}
