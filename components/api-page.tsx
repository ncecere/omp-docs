'use client';
import { createOpenAPIPage } from 'fumadocs-openapi/ui';

// Static reference pages: no "try it" playground, so the docs never send
// requests to an Open MCP Portal install.
export const OpenAPIPage = createOpenAPIPage({
  playground: { enabled: false },
});
