#!/usr/bin/env node
// Refreshes openapi/open-mcp-portal.yaml from the Open MCP Portal repository.
//
//   npm run sync:openapi                     # from a checkout: $OMP_REPO, or ../golang/open-mcp-portal
//   npm run sync:openapi -- v0.1.0           # from GitHub, at a tag or commit
//
// The docs describe one Open MCP Portal release: sync the spec from that
// release's tag once it exists (until then, from main). The API reference
// under /docs/api/reference is generated from this file at build time.
import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const target = new URL('../openapi/open-mcp-portal.yaml', import.meta.url).pathname;
const ref = process.argv[2];

if (ref) {
  const url = `https://raw.githubusercontent.com/ncecere/open-mcp-portal/${encodeURIComponent(ref)}/api/openapi.yaml`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`GET ${url}: ${res.status} ${res.statusText}`);
    process.exit(1);
  }
  writeFileSync(target, await res.text());
  console.log(`openapi/open-mcp-portal.yaml <- ${url}`);
} else {
  // The repository was called open-mcp-gateway before it was renamed; an old
  // checkout under that name is still found.
  const candidates = process.env.OMP_REPO
    ? [resolve(process.env.OMP_REPO)]
    : ['open-mcp-portal', 'open-mcp-gateway'].map((name) => resolve(join(import.meta.dirname, '../../golang', name)));
  const repo = candidates.find((dir) => existsSync(join(dir, 'api/openapi.yaml')));
  if (!repo) {
    console.error(`api/openapi.yaml not found in ${candidates.join(' or ')}. Set OMP_REPO, or pass a tag: npm run sync:openapi -- v0.1.0`);
    process.exit(1);
  }
  const source = join(repo, 'api/openapi.yaml');
  copyFileSync(source, target);
  console.log(`openapi/open-mcp-portal.yaml <- ${source}`);
}
console.log('Review the diff, then rebuild: the API reference is generated from it at build time.');
