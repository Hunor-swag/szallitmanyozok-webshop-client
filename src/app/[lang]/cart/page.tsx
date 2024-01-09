import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import ShoppingCartTable from '@/components/shopping-cart/ShoppingCartTable';
import { getServerSession } from 'next-auth';

export default async function ShoppingCart({
  params,
}: {
  params: { lang: string };
}) {
  return (
    <div>
      <ShoppingCartTable lang={params.lang} />
    </div>
  );
}
