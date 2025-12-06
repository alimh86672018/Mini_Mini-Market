import CartBar from "./Components/CartBar";
import ProductsPage from "./Components/ProductsPage";
import { headers } from "next/headers";

export default async function Home() {
  // const data = await fetch("http://localhost:3000/api/products", {
  //   cache: "no-store",
  // });
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();

  return (
    <div className="min-h-screen p-6">
      <ProductsPage initialProducts={products} />
      <CartBar />
    </div>
  );
}
