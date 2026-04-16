import { productCatalog } from '@/data/productCatalog'

/** Lowercase fragment ids for physical sensor models on `/products#…`. */
export const LINKABLE_PRODUCT_IDS = new Set(
  productCatalog.map((e) => e.id).filter((id) => /^im\d{3}$/.test(id))
)
