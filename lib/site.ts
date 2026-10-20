/*
 * The site's addresses, repositories and the release it describes, in one
 * place so they are easy to change. Everything else imports from here.
 */

/** The published docs. Used for absolute URLs (Open Graph, metadata). */
export const siteUrl = 'https://docs.omp.bitop.dev';

/** The product's own website. */
export const productSite = 'https://omp.bitop.dev';

/** The docs' own repository: "Edit on GitHub" links point here. */
export const gitConfig = {
  user: 'ncecere',
  repo: 'omp-docs',
  branch: 'main',
};

/** The product's repository. */
export const productRepo = 'https://github.com/ncecere/open-mcp-portal';

/** The Open MCP Portal release these docs describe. */
export const productVersion = 'v0.3.2';

/** The date that release was tagged (YYYY-MM-DD). */
export const productReleaseDate = '2026-10-20';

/** The release's page on GitHub. */
export const productReleaseUrl = `${productRepo}/releases/tag/${productVersion}`;

/** The release's container image, signed with cosign keyless signing. */
export const productImage = `ghcr.io/ncecere/open-mcp-portal:${productVersion}`;

/** The digest of the release's image (verify the signature, then pin this). */
export const productImageDigest = 'sha256:80ee9a1c7203ac8813597a1a218902503d08378982e08b62ba48c4084add5bd6';

export const appName = 'Open MCP Portal docs';
export const docsRoute = '/docs';

export const docsRepoUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

export function editUrl(path: string): string {
  return `${docsRepoUrl}/blob/${gitConfig.branch}/${path}`;
}
