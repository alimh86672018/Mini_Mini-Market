import CartBar from "./Components/CartBar";
import ProductsPage from "./Components/ProductsPage";
import { headers } from "next/headers";

export default async function Home() {
  // const res = await fetch("http://localhost:3000/api/products", {
  //   cache: "no-store",
  // });
  const host = (await headers()).get("host");
  if (!host) throw new Error("Host header not found");

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const url = `${protocol}://${host}/api/products`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) throw new Error("Failed to fetch products");

  const products = await res.json();

  return (
    <div className="min-h-screen p-6">
      <ProductsPage initialProducts={products} />
      <CartBar />
    </div>
  );
}
