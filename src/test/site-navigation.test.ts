import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { describe, it, expect } from "vitest";
import { routeTree } from "@/routeTree.gen";
describe("All website destinations", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
  for (const path of [
    "/about",
    "/products",
    "/products/quartz",
    "/products/barytes",
    "/products/rice",
    "/products/chillies",
    "/services",
    "/industries",
    "/quality-supply",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
  ]) {
    it(`matches ${path}`, () => {
      expect(router.matchRoutes(path).at(-1)?.routeId).not.toBe("__root__");
    });
  }
});
