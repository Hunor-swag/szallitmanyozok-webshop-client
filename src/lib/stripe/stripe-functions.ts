import { stripe } from './stripe';

export async function getStripeProducts() {
  return await stripe.products.list();
}

export async function addProductToStripe() {
  //   stripe.products.create({
  //     name: 'T-shirt',
  //     description: 'Comfortable cotton t-shirt',
  //     images: ['https://example.com/t-shirt.png'],
  //   });
}
