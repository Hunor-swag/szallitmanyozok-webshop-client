export async function initPayment(payment_data: any) {
  // make a type for payment data
  // call payment api
  const res = await fetch('https://api.khpos.hu/api/v1.0/payment/init', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payment_data),
  });

  const data = await res.json();

  // return response
}
