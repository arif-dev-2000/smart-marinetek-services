import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProductPage } from "@/components/site/pages";
import { products, pageHead } from "@/data/company";
export const Route = createFileRoute("/products_/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) =>
    pageHead(
      loaderData ? `${loaderData.product.name} Sourcing & Trade` : "Product Unavailable",
      loaderData?.product.description ?? "The requested product is unavailable.",
      loaderData ? `/products/${loaderData.product.slug}` : "/products",
    ),
  component: ProductDetail,
});
function ProductDetail() {
  const { product } = Route.useLoaderData();
  return <ProductPage product={product} />;
}
