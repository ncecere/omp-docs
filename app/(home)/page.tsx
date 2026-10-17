import Link from 'next/link';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { BookOpen, Braces, Code2, Network, Server, ShieldCheck, Tag, Users } from 'lucide-react';
import { OmpWordmark } from '@/components/logo';
import { productRepo, productSite, productUnreleased, productVersion } from '@/lib/site';

const sections = [
  {
    title: 'Get started',
    href: '/docs/get-started',
    icon: <BookOpen />,
    description:
      'What Open MCP Portal is, its concepts, a quick tour, connecting Claude Code, VS Code, Cursor or pi, and calling gateways from your own agents.',
  },
  {
    title: 'Use',
    href: '/docs/use',
    icon: <Network />,
    description: 'My gateways, connecting your accounts on other services, API keys, connected apps and troubleshooting.',
  },
  {
    title: 'Teams',
    href: '/docs/teams',
    icon: <Users />,
    description:
      'Registering MCP servers, detecting sign-in, capabilities and change detection, publishing, building gateways, service accounts, usage and recording call contents.',
  },
  {
    title: 'Administer',
    href: '/docs/administer',
    icon: <ShieldCheck />,
    description:
      'Users and teams, catalog review and publishing policy, internal networks, platform gateways, trusted clients, auth providers, limits, retention, capture and the audit log.',
  },
  {
    title: 'For MCP server authors',
    href: '/docs/server-authors',
    icon: <Code2 />,
    description:
      'What your server receives: the signed identity token and its JWKS, provider tokens, OAuth-protected servers, parameter headers and a worked example.',
  },
  {
    title: 'Operate',
    href: '/docs/operate',
    icon: <Server />,
    description:
      'Install with Docker Compose or Kubernetes, every setting, secrets and key rotation, migrations, scaling, health, metrics, backups and the security model.',
  },
  {
    title: 'API reference',
    href: '/docs/api',
    icon: <Braces />,
    description: 'The MCP endpoint, the OAuth endpoints, and the management API reference generated from its OpenAPI document.',
  },
  {
    title: 'Releases',
    href: '/docs/releases',
    icon: <Tag />,
    description: `What changed in each release. These docs describe ${productVersion}${productUnreleased ? ' (not yet released)' : ''}.`,
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 md:py-16">
      <div className="flex flex-col gap-4">
        <p className="inline-flex items-center gap-2 text-sm font-medium text-fd-muted-foreground">
          <OmpWordmark /> {productVersion} documentation
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          One governed portal to your company&apos;s MCP tools.
        </h1>
        <p className="max-w-2xl text-lg text-fd-muted-foreground">
          Open MCP Portal is a self-hosted portal where teams register the MCP servers they run, publish
          them to a company catalog and curate gateways. People connect Claude Code, VS Code, Cursor or
          their own agents to a gateway and see only the tools they may use; every call is checked,
          limited, recorded and signed with who is calling. These docs are for the people who use
          gateways, the teams that build them, platform admins, operators and MCP server authors.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/docs/get-started"
            className="rounded-control bg-brand-primary px-4 py-2 text-sm font-medium text-brand-primary-contrast shadow-brand-1 hover:bg-brand-primary-hover"
          >
            Get started
          </Link>
          <Link
            href="/docs/get-started/connect-your-client"
            className="rounded-control border border-fd-border bg-fd-card px-4 py-2 text-sm font-medium hover:bg-fd-accent"
          >
            Connect your AI client
          </Link>
          <a
            href={productRepo}
            className="rounded-control border border-fd-border bg-fd-card px-4 py-2 text-sm font-medium hover:bg-fd-accent"
          >
            Source on GitHub
          </a>
        </div>
      </div>

      <h2 className="sr-only">Sections</h2>
      <Cards className="mt-12">
        {sections.map((s) => (
          <Card key={s.href} title={s.title} href={s.href} icon={s.icon}>
            {s.description}
          </Card>
        ))}
      </Cards>

      <p className="mt-12 text-sm text-fd-muted-foreground">
        Open MCP Portal is pre-1.0 development software. These docs describe {productVersion}
        {productUnreleased ? ', the first release, as it stands on the main branch' : ''}. More about
        the project is on{' '}
        <a className="text-brand-link underline" href={productSite}>
          its website
        </a>
        ; the engineering notes stay in the{' '}
        <a className="text-brand-link underline" href={productRepo}>
          repository
        </a>
        .
      </p>
    </div>
  );
}
