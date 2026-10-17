# Open MCP Portal docs

The user, team, administrator, operator and server-author documentation for [Open MCP Portal](https://github.com/ncecere/open-mcp-portal), the self-hosted portal to a company's MCP servers: teams register servers, publish them to a catalog and curate gateways that people and agents connect to. It's published at <https://docs.omp.bitop.dev>; the product's website is <https://omp.bitop.dev>. Both addresses, the repositories and the release the docs describe are in `lib/site.ts`.

These pages are for the people who use gateways, the team owners and admins who register servers and build gateways, platform admins, operators, and MCP server authors. The Open MCP Portal repository's own `docs/` folder stays the engineering record (design, decisions and "As built" notes). The docs describe **Open MCP Portal v0.1.0**, which is not yet released: they follow the `main` branch until it is tagged.

A static site: [Fumadocs](https://fumadocs.dev) on Next.js with `output: "export"`, TypeScript and Tailwind CSS v4, served by nginx in a container. Search is Fumadocs' built-in static index, searched in the browser. No tracking, no cookies, no external fonts or CDNs: Inter is self-hosted.

The **API reference** under `/docs/api/reference` is generated at build time from `openapi/open-mcp-portal.yaml`, a copy of the product's `api/openapi.yaml`, as the Grounded docs do. The MCP endpoint and the OAuth endpoints aren't in that document; they're hand-written MDX in `content/docs/api/`.

## Local development

You need Node 22 and npm.

```sh
npm ci
npm run dev          # http://localhost:3000
```

| Command | Does |
|---|---|
| `npm run dev` | Development server with hot reload. |
| `npm run build` | The static export, in `out/`, followed by `check-names` (below). |
| `npm run check:links` | Checks every internal link and anchor in `out/` (run after a build; the generated API reference is skipped). |
| `npm run typecheck` | TypeScript. |
| `npm start` | Serves `out/` locally. |
| `npm run sync:openapi` | Refreshes `openapi/open-mcp-portal.yaml` from a product checkout (`../golang/open-mcp-portal`, or `$OMP_REPO`), or from GitHub at a tag: `npm run sync:openapi -- v0.1.0`. |
| `npm run brand` | Regenerates `app/brand.css` from the product's theme (below). |
| `npm run logo -- <chosen>` | Copies the logo from `../omp-assets/logo/<chosen>/` (below). |
| `npm run screenshots` | Imports screenshots (below). |
| `npm run screenshots:check` | Lists screenshot slots that are still placeholders. |

`npm run build` runs `scripts/check-names.mjs` afterwards (npm's `postbuild`). It fails the build if a page loads anything from another origin, names a competing MCP gateway or tool platform (or the product's old name), or uses "OMP" bare: in a page title, in a heading 1, or before "Open MCP Portal" has been written out on that page.

## Layout

```text
lib/site.ts                   the site and product addresses, repositories and the release described
lib/openapi.ts                the OpenAPI source, tag labels, and per-page pruning of the document
lib/source.tsx                the docs and the generated API reference as one Fumadocs source
lib/mark.json                 the logo's mark as inline SVG markup (written by scripts/sync-logo.mjs)
app/brand.css                 the brand tokens for Tailwind v4, generated; byte-identical with the website's copy
app/global.css                Tailwind, Fumadocs' and fumadocs-openapi's CSS, Fumadocs' variables mapped onto brand.css
app/(home)/page.tsx           the landing page
app/docs/[[...slug]]/page.tsx docs pages and generated API reference pages
app/api/search/route.ts       the static search index (exported as /api/search)
app/not-found.tsx             the 404 page
content/docs/                 the pages, in MDX, one folder per section (meta.json orders them)
openapi/open-mcp-portal.yaml  the product's OpenAPI document; the API reference is generated from it
components/logo.tsx           the logo: the mark (inline SVG from lib/mark.json) beside the name as live text
components/screenshot.tsx     named screenshot slots, with a marked placeholder until an image exists
components/api-page.tsx       the API reference page (no "try it" playground: the docs never call an install)
lib/screenshot-slots.json     the slots and their alt text
lib/screenshots.json          imported screenshots and their sizes (written by the import script)
public/                       favicons, apple-touch-icon, 192/512 icons and og.png, copied from omp-assets
scripts/                      sync-openapi, brand-css, sync-logo, import-screenshots, check-links, check-names
nginx/                        nginx.conf and the site's server block and security headers
Dockerfile                    builds the export, then serves it with nginx
SCREENSHOTS.md                the capture list for the screenshot session
```

## Writing

- Every claim must be true of the Open MCP Portal release the docs describe. Check it against the product repository (`README.md`, `CHANGELOG.md`, `SPEC.md`, `docs/*.md` and their "As built" sections, `.env.example`, `deploy/`, `api/openapi.yaml`) and, where those are vague or disagree, the code (`internal/`, `web/src`), before you write it. Use the web app's own words for pages and buttons.
- Lead with "Open MCP Portal" in titles and first mentions; "OMP" is fine afterwards. `check-names` enforces it. "Gateway" is the name of a feature (a curated tool set at `/mcp/{slug}`), not of the product; the `MCP-Gateway-*` headers keep their names.
- Plain, short sentences. Examples are generic: "Example Corp", `example.com`, the portal at `https://mcp.example.com`. MCP clients (Claude Code, VS Code, Cursor, pi) and the services the portal connects to (GitHub, Google, Microsoft, Atlassian, Slack, GitLab) are named because they're what it works with; competing products are not.
- Use Fumadocs' components where they help: `Callout`, `Steps`, `Tabs`, `Cards`, `Files`.
- Each page has an "Edit on GitHub" link to its file in this repository; API reference pages link to `openapi/open-mcp-portal.yaml`.

### API reference

`npm run sync:openapi` copies the product's `api/openapi.yaml` into `openapi/open-mcp-portal.yaml`. Review the diff and rebuild: there is one page per operation, grouped by the operation's first tag (sidebar labels in `lib/openapi.ts`). Sync from the release's tag once v0.1.0 is tagged.

### Brand

`app/brand.css` holds the colours, radii, shadows and fonts as `--omp-*` variables and Tailwind utilities (`bg-brand-surface`, `text-brand-link`, `rounded-card`, `shadow-brand-2`). It is **generated**, not written by hand: `scripts/brand-css.mjs` (the same script as the website's) derives it deterministically from the product's web app, which uses the Bitop UI theme: `web/src/components/ui/themes/neutral.css` (slate neutrals with an indigo accent, light and dark, following the system colour scheme) and `web/src/components/ui/styles/tokens.css`. Each `--omp-*` token takes one semantic token (`--omp-bg` from `--color-bg`, `--omp-focus-ring` from `--color-focus-ring`, …), keeping its contrast notes.

```sh
npm run brand              # write app/brand.css from ../golang/open-mcp-portal (or $PRODUCT_DIR)
npm run brand -- --check   # fail if app/brand.css isn't what the sources give
cmp app/brand.css ../omp-website/app/brand.css
```

The website (`../omp-website`) has the same file, and **the two copies must stay byte-identical**: change both together (regenerate in both, or copy one to the other), and check with `cmp`. The same goes for `scripts/brand-css.mjs`.

### Logo

The logo is "Keystone": a round arch of three stones on a dark tile, the teal keystone at the crown. Its source, exports and usage rules are in `../omp-assets/logo/` (`logo/keystone/`, `logo/README.md`). `components/logo.tsx` draws the mark inline from `lib/mark.json` (`mark-small.svg`, 28 px, `aria-hidden`) beside the name as live text, as the website does from its own `lib/mark.json`; change both together.

```sh
npm run logo -- keystone
```

rewrites `lib/mark.json` from `keystone/mark-small.svg` and `mark.svg`, and copies `favicon.ico`, `favicon.svg`, `png/apple-touch-icon.png`, `png/icon-192.png` and `png/icon-512.png` into `public/` unchanged, and `png/og-card.png` to `public/og.png`. Rerun it when the logo changes and commit the results. (`npm run logo -- --placeholder` draws neutral stand-in icons from `lib/mark.json`, for a logo that doesn't exist yet.)

### Screenshots

Screenshots come only from the fictional "Example Corp" demo instance, never from a real install. Each image has a named slot in `lib/screenshot-slots.json` (its alt text, the file names it may have, and optionally a `hold` reason that keeps a capture out) and is placed with `<Screenshot slot="…" />`. Until an image is imported, the slot shows a clearly marked placeholder. `SCREENSHOTS.md` lists, per slot, the file, size, page, persona and the state to set up. None has been captured yet. When you replace an image, check that its slot's alt text still describes it.

```sh
SCREENSHOTS_DIR=../omp-assets/screenshots npm run screenshots
```

converts each available PNG to WebP (at most 1600 px wide) in `public/images/`, and records its width and height in `lib/screenshots.json`.

## Container

```sh
docker build -t omp-docs .
docker run --rm -p 8080:8080 --read-only --tmpfs /tmp:uid=101,gid=101 omp-docs
```

nginx (Alpine, pinned by digest) runs as user 101 on port 8080, keeps its pid and temp files under `/tmp` (so the root filesystem can be read-only; mount an `emptyDir` at `/tmp` in Kubernetes), answers `/healthz`, sends security headers and a Content Security Policy, gzips text, and caches hashed assets for a year.

## Deploy

Pushes to `main` run `.github/workflows/publish.yaml`: it type-checks, builds (including `check-names`) and link-checks the site, then builds and pushes a multi-arch image (linux/amd64, linux/arm64):

- `ghcr.io/ncecere/omp-docs:<full commit sha>`
- `ghcr.io/ncecere/omp-docs:latest`

Pull requests run the checks only. Actions are pinned by commit SHA, and Dependabot opens grouped weekly updates for npm, Actions and the Docker base images.

## Licence

- **Code** (the site's source, scripts and configuration): [MIT](LICENSE).
- **Documentation text and images**: [Creative Commons Attribution 4.0 International](LICENSE-CONTENT) (CC BY 4.0).
- `openapi/open-mcp-portal.yaml` is a copy of Open MCP Portal's API description, MIT like the rest of Open MCP Portal.
- Inter is under the SIL Open Font License 1.1.
