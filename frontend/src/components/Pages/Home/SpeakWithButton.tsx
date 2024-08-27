import { Button } from '@/components/Button';

interface SpeakWithButtonProps {
  onClick?: () => void;
}

export function SpeakWithButton({
  onClick,
}: SpeakWithButtonProps) {
  return (
    <div className="group flex flex-col items-center gap-4 mb-5" onClick={onClick}>
      <Button className="flex bg-gradient-dark px-15 py-8 text-neutral-light-1 text-[24px] leading-[24px]">
        Enter...
      </Button>
    </div>
  );
}
