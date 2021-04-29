export function getShopRoute(shop) {
  return `/${shop.city ? shop.city : "_"}/${[shop.name, shop.street]
    .filter(Boolean)
    .join("--")}`;
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
