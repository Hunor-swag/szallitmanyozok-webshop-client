import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import ShoppingCartTable from '@/components/shopping-cart/ShoppingCartTable';
import { getServerSession } from 'next-auth';

export default async function ShoppingCart() {
  return (
    <div>
      <ShoppingCartTable />
    </div>
  );
}
