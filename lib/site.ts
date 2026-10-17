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
export const productVersion = 'v0.1.0';

/** The date that release was tagged (YYYY-MM-DD), or null while it is unreleased. */
export const productReleaseDate: string | null = null;

/** Whether that release is still unreleased (the docs then describe current `main`). */
export const productUnreleased = true;

export const appName = 'Open MCP Portal docs';
export const docsRoute = '/docs';

export const docsRepoUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

export function editUrl(path: string): string {
  return `${docsRepoUrl}/blob/${gitConfig.branch}/${path}`;
}
