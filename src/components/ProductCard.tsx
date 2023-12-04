import { Product } from "@/types/typings";
import Image, { StaticImageData } from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";

type Props = {
  product: Product;
};

export default async function ProductCard({ product }: Props) {
  // const image = await import("@/../public/iphone.webp");

  return (
    <Link href={`/product/${product.id}`} className=" w-44">
      <div className="flex flex-col space-y-2 h-full bg-slate-100 border border-gray-100 shadow-md rounded-xl p-4 items-center hover:bg-blue-100 transition-colors duration-200 cursor-pointer hover:shadow-xl hover:border-blue-200">
        {/* <Image
          alt={product.attributes.name}
          src="/../../public/iphone.webp"
          width={100}
          height={60}
          className="rounded-md"
        /> */}
        <div className="flex flex-col space-y-1">
          <h3 className="font-semibold">{product.attributes.name}</h3>
          <h4 className="font-semibold">
            {product.attributes.price} {product.attributes.currency}
          </h4>
          <p className="text-sm">
            {product.attributes.description[0].children[0].text}
          </p>
        </div>
      </div>
    </Link>
  );
}
