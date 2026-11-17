import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Header, Footer } from "@/components/site/layout";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#15322B" },
      {
        title:
          "Smart Marinetek Services Private Limited | Quartz, Barytes & Global Commodity Exports",
      },
      {
        name: "description",
        content:
          "Established 03-03-2020 in Andhra Pradesh, India. Main source exporter of Quartz and Barytes alongside Red Chillies, Indian Rice, and allied commodities.",
      },
      { property: "og:site_name", content: "Smart Marinetek Services Private Limited" },
      {
        property: "og:title",
        content:
          "Smart Marinetek Services Private Limited | Quartz, Barytes & Global Commodity Exports",
      },
      {
        property: "og:description",
        content:
          "Established 03-03-2020 in Andhra Pradesh, India. Main source exporter of Quartz and Barytes alongside Red Chillies, Indian Rice, and allied commodities.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://smartmarinetek.com/og-image.png?v=2" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://smartmarinetek.com/og-image.png?v=2" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;450;500;550;600&family=Manrope:wght@400;500;600;650;700;750;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/sms-logo.svg?v=2", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon-32x32.png?v=2", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon.ico?v=2", sizes: "any" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png?v=2", sizes: "180x180" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
