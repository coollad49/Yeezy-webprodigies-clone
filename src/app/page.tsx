import ProductGrid from "@/components/ui/productGrid";
import { getProducts } from "@/actions/product";

export default async function Home () {
  const products = await getProducts()
  return (
    <ProductGrid products={products}/>
  );
}
