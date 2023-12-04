export function generatePriceString(price: number, currency: string) {
  let formattedPrice = "";

  switch (currency) {
    case "USD":
      formattedPrice = `$ ${price}`;
      break;
    case "EUR":
      formattedPrice = `€ ${price}`;
      break;
    case "HUF":
      formattedPrice = `${price} Ft`;
      break;
    // Add more cases for other currencies as needed
    default:
      formattedPrice = `${price} ${currency}`;
      break;
  }

  return formattedPrice;
}
