# Smart Marinetek Services Private Limited (`SMS Pvt. Ltd.`)

Corporate mineral sourcing and global commodity export portal for **Smart Marinetek Services Private Limited**, established `03-03-2020` in Andhra Pradesh, India.

## Business Profile & Contacts

| Field                                       | Details                                                                                 |
| ------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Company**                                 | Smart Marinetek Services Private Limited (`SMS Pvt. Ltd.`)                              |
| **Established**                             | `03-03-2020` (`03 March 2020`)                                                          |
| **Main Sources**                            | **Quartz** (`SiO₂` lumps, grits & silica powder) · **Barytes** (`BaSO₄` lumps & powder) |
| **Additional Commodities**                  | **Red Chillies**, **Indian Rice** & allied export commodities                           |
| **Director — Sourcing & Export Operations** | **Shaik Nazeer Basha** · Phone/WhatsApp: `+91 81217 88778`                              |
| **Director — Global Trade & Commercials**   | **Sanjay Narotra** · Phone/WhatsApp: `+91 98771 53120`                                  |
| **Official Support & Trade Emails**         | `info@smartmarinetek.com` · `smartmarinetek@gmail.com`                                  |

## Tech Stack

- **Framework:** TanStack Start + TanStack Router + TanStack Query + React 19
- **Styling:** Tailwind CSS v4 + Mineral Emerald / Limestone Ivory / Brass Gold design tokens (`Manrope` & `Inter`)
- **Validation & Testing:** Zod, React Hook Form, Vitest, TypeScript strict mode, ESLint + Prettier
- **Production Server:** Nitro (`node-server` preset) with `/healthz`, `/robots.txt`, `/sitemap.xml`, and security headers

## Local Development

```bash
npm install
npm run dev
```

## Verification & Production SSR Build

```bash
npm run format
npm run lint
npm run typecheck
npm test

# Production Node SSR build
NITRO_PRESET=node-server npm run build
npm start
```

## Docker Deployment

Copy [`.env.example`](.env.example) if configuring `VITE_SITE_URL` or `VITE_ENQUIRY_ENDPOINT`, then start via Docker Compose:

```bash
docker compose up -d --build
```

- App listens on port `8080` inside the container (mapped to `5175` in Compose) with a Docker `HEALTHCHECK` against `/healthz`.
