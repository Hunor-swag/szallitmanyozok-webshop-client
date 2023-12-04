import type { Metadata } from "next";
import Header from "@/components/header/Header";
import ship from "@/../public/freight-863449_1920.jpg";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Strapi Next.js Webshop",
  description: "This is a webshop built with Strapi and Next.js",
};

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <div
      style={{
        backgroundImage: `url(${ship.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Header lang={params.lang} />
      <div className="px-4 md:px-[5%] lg:px-[20%] pt-[200px] h-[2000px] overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
