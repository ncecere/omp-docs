#!/usr/bin/env node
// Refreshes openapi/open-mcp-portal.yaml from the Open MCP Portal repository.
//
//   npm run sync:openapi                     # from a checkout: $OMP_REPO, or ../golang/open-mcp-portal
//   npm run sync:openapi -- v0.2.2           # from GitHub, at a tag or commit
//
// The docs describe one Open MCP Portal release: sync the spec from that
// release's tag (v0.2.2). The API reference
// under /docs/api/reference is generated from this file at build time.
import { execFileSync } from 'node:child_process';
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
    console.error(`api/openapi.yaml not found in ${candidates.join(' or ')}. Set OMP_REPO, or pass a tag: npm run sync:openapi -- v0.2.2`);
    process.exit(1);
  }
  const source = join(repo, 'api/openapi.yaml');
  // The checkout is only ever read. Say which commit the copy comes from, and
  // warn when it is not a clean release tag: the docs describe a release.
  const git = (...args) => execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8' }).trim();
  try {
    const describe = git('describe', '--tags', '--always', '--dirty');
    console.log(`product checkout: ${repo} (${describe})`);
    if (!/^v\d+\.\d+\.\d+$/.test(describe)) {
      console.warn('warning: the checkout is not exactly at a release tag (or has local changes); the copy may not match a release.');
    }
  } catch {
    console.warn(`warning: could not run git in ${repo}`);
  }
  copyFileSync(source, target);
  console.log(`openapi/open-mcp-portal.yaml <- ${source}`);
}
console.log('Review the diff, then rebuild: the API reference is generated from it at build time.');
