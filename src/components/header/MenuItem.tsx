import Link from "next/link";
import React from "react";

type Props = {
  href: string;
  text: string;
};

export default function MenuItem({ href, text }: Props) {
  return (
    <Link
      href={href}
      className="text-white font-bold py-2 px-3 rounded-[4px] hover:bg-slate-500 transition-colors duration-300"
    >
      <li>{text}</li>
    </Link>
  );
}
