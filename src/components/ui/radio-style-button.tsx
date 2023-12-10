'use client';

type Props = {
  text: string;
  onClick: () => void;
  selected: boolean;
};

export default function RadioStyleButton({ text, onClick, selected }: Props) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`px-3 py-2 flex justify-center items-center border border-slate-400 bg-slate-300 rounded-xl hover:bg-gray-400 transition-colors duration-300 ${
        selected && 'bg-blue-200 border-blue-300'
      }`}
    >
      {text}
    </button>
  );
}
