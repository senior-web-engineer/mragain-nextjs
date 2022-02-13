export function getShopRoute(item) {
  return `${item.city_slug || "_"}/${item.slug}/${item.street_slug || "_"}`
    .split(" ")
    .join("-");
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
