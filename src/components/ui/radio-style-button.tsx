'use client';

type Props = {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
};

export default function RadioStyleButton({
  type = 'button',
  className,
  children,
  onClick,
  selected,
}: Props) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`rounded-md  transition duration-200 px-3 py-1 border ${
        selected
          ? 'bg-blue-100'
          : 'bg-gray-100 border-gray-200 hover:bg-gray-200 hover:border-gray-300'
      } ${className}`}
    >
      {children}
    </button>
  );
}
