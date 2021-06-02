export function getShopRoute(shop) {
  return `/${[shop.name,shop.city, shop.street]
    .filter(Boolean)
    .join("-").split(' ').join('-')}`;
}

export function getShopLogo(logo) {
  if (!logo) {
    return "/images/shop/default-logo.jpg";
  }

  if (logo.startsWith(process.env.NEXT_PUBLIC_BACK_END_URL)) {
    return logo;
  }

  return `${process.env.NEXT_PUBLIC_BACK_END_URL}/${logo}`;
}
