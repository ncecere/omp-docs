# Screenshot capture list

Every image in these docs has a named slot in `lib/screenshot-slots.json` (its alt text and the file names it may have) and is placed with `<Screenshot slot="…" />`. Until an image is imported, the page shows a marked placeholder. This file is the capture list for the screenshot session. **None of the 43 slots has been captured yet**; captures go in `../omp-assets/screenshots/`.

## Rules

- **Only the fictional demo instance, never a real install.** Organisation: **Example Corp**, domain `example.com`, portal at `https://mcp.example.com` (in the capture environment any loopback address is fine, but the URLs the docs mention use `mcp.example.com`), `ORG_NAME=Example Corp`, `INSTANCE_NAME=Example Corp MCP Portal`. Never show a real person, organisation, key, token, client ID or provider account.
- **Personas** (all fictional):
  - **Morgan Lee**, `morgan.lee@example.com`, platform admin
  - **Taylor Brooks**, `taylor.brooks@example.com`, platform auditor
  - **Priya Shah**, `priya.shah@example.com`, owner of the team **Support Tools** (`support-tools`), member of **Data Platform**
  - **Sam Ortiz**, `sam.ortiz@example.com`, editor of Support Tools, in the SSO group `engineering`
  - **Jordan Kim**, `jordan.kim@example.com`, owner of the team **Data Platform** (`data-platform`)
  - **Casey Moore**, `casey.moore@example.com`, suspended
- **Configuration**:
  - MCP servers: **Status** (`status`, Support Tools; the repository's fake MCP server, `cmd/fakemcp`: tools `check_outage`, `search_tickets`, `create_ticket`, the resource `status://services`, the template `status://services/{service}`, the prompt `incident_summary`), **Mail** (`mail`, Support Tools; `examples/mail-mcp` with its fake Gmail, requiring the Google provider with `gmail.readonly`, `create_draft` overridden to `gmail.compose`), **Code search** (`code-search`, Data Platform; `cmd/fakemcp -protect` with `cmd/fakeoauth`, in Sign-in with OAuth mode), **Wiki search** (`wiki-search`, Data Platform; pending review).
  - Gateways: team gateway **Support** (`support`); platform gateways **Company tools** (`company`, granted to Support Tools, `jordan.kim@example.com` and the group `engineering`) and **Engineering tools** (`engineering-tools`, granted to `engineering`, recording call contents).
  - Service account **ci-release-bot** (Support Tools, member).
  - Auth providers **Google** (Google preset, slug `google`) and **GitHub** (GitHub preset, slug `github`); they may point at `cmd/fakeoauth`, but never show a real client ID or secret.
- **No real third parties.** Use the fakes in the repository (`make fake-mcp`, `make fake-oauth`, `make example-mail-fake`), not GitHub or Google accounts.
- **Size**: PNG, **1440×900** (device scale factor 1), light theme unless the state says otherwise.
- **Version**: Open MCP Portal **v0.1.0** (the release image once tagged; until then the `main` build). Pin the clock in the seed so timestamps don't churn.
- **Secrets**: any key or token shown must be a fake value (`omp_0000…`, `omp_sa_0000…`) before capture.
- **File name**: the slot name, `<slot>.png`, in the screenshots directory (`../omp-assets/screenshots` by default), then:

  ```sh
  SCREENSHOTS_DIR=../omp-assets/screenshots npm run screenshots
  npm run screenshots:check
  ```

- After capturing, check each slot's alt text in `lib/screenshot-slots.json` against its image: the alt texts were written from the product's code and docs, before any capture existed.
- A slot with `"hold"` in the slots file is skipped by the import; none is held now.

## Slots

| # | File | Size | URL path | Persona | Used on | State to set up |
|---|---|---|---|---|---|---|
| 1 | `sign-in.png` | 1440×900 | `/` | Signed out | `/docs/get-started/quick-tour` | Signed out, light theme, ORG_NAME=Example Corp, INSTANCE_NAME=Example Corp MCP Portal, OIDC on and development sign-in off (so no development accounts show). |
| 2 | `home.png` | 1440×900 | `/` | Priya Shah | `/docs/get-started/quick-tour` | Priya is owner of Support Tools and member of Data Platform. Sidebar expanded. |
| 3 | `my-gateways.png` | 1440×900 | `/gateways` | Priya Shah | `/docs/use/my-gateways` | Team gateway support (Support Tools), platform gateways company (granted to team Support Tools) and engineering-tools (granted to group engineering, with Record call contents on). |
| 4 | `my-gateway-connect.png` | 1440×900 | `/gateways/<support>` | Priya Shah | `/docs/get-started`, `/docs/get-started/connect-your-client`, `/docs/use/my-gateways` | Gateway support with status__check_outage, status__search_tickets, status__create_ticket, the prompt status__incident_summary and the resource omp://status/status://services. Claude Code tab selected, OAuth (Use an API key instead off). |
| 5 | `catalog.png` | 1440×900 | `/catalog` | Sam Ortiz | `/docs/teams/publishing` | Three published servers as described; all healthy. |
| 6 | `catalog-server.png` | 1440×900 | `/catalog/<status>` | Jordan Kim | `/docs/teams/publishing` | Status published with every capability approved. |
| 7 | `server-overview.png` | 1440×900 | `/teams/support-tools/servers/<status>` | Priya Shah | `/docs/teams/publishing` | Status published. Approval required is the platform default. |
| 8 | `server-capabilities.png` | 1440×900 | `/teams/support-tools/servers/<status>?tab=capabilities` | Priya Shah | `/docs/teams/capabilities` | Run the fake server with -describe 'check_outage=Now also reports planned work.' and refresh, so check_outage shows as changed. |
| 9 | `server-sign-in-card.png` | 1440×900 | `/teams/data-platform/servers/<code-search>` | Jordan Kim | `/docs/teams/register-a-server` | Code search registered in Sign-in with OAuth mode against the fake OAuth provider (cmd/fakemcp -protect), setup sign-in done by Jordan, 3 people signed in. |
| 10 | `add-server-detect.png` | 1440×900 | `/teams/data-platform/servers?form=new` | Jordan Kim | `/docs/teams/register-a-server` | Detect against the protected fake MCP server (fakeoauth with -dcr). Show the result and the registration choices. |
| 11 | `server-user-authorization.png` | 1440×900 | `/teams/support-tools/servers/<mail>?tab=settings` | Sam Ortiz | `/docs/teams/user-authorization` | Auth provider Google (Google preset, slug google) exists. Mail requires it with gmail.readonly; create_draft overridden to gmail.compose. |
| 12 | `server-health.png` | 1440×900 | `/teams/data-platform/servers/<code-search>?tab=health` | Jordan Kim | `/docs/teams/capabilities` | A few scheduled checks and one manual Test connection. |
| 13 | `publish-request.png` | 1440×900 | `/teams/support-tools/servers/<status>` | Priya Shah | `/docs/teams/publishing` | A private server Status with capabilities read; Approval required. |
| 14 | `gateway-capabilities-picker.png` | 1440×900 | `/teams/support-tools/gateways/<support>?tab=capabilities` | Priya Shah | `/docs/teams/gateways` | Gateway support with five capabilities selected; create_ticket has minimum role Editors and above. |
| 15 | `gateway-overview.png` | 1440×900 | `/teams/support-tools/gateways/<support>` | Priya Shah | `/docs/teams/gateways` | Gateway support enabled, none unavailable. |
| 16 | `gateway-settings.png` | 1440×900 | `/teams/support-tools/gateways/<support>?tab=settings` | Priya Shah | `/docs/teams/gateways`, `/docs/teams/payload-capture` | Platform default per gateway 2,000, ceiling 5,000; the gateway sets 1,500. Record call contents off. |
| 17 | `gateway-access.png` | 1440×900 | `/admin/gateways/<company>?tab=access` | Morgan Lee | `/docs/administer/platform-gateways` | Platform gateway company with the three grants. |
| 18 | `service-account-overview.png` | 1440×900 | `/teams/support-tools/service-accounts/<ci-release-bot>` | Priya Shah | `/docs/teams/service-accounts` | Service account ci-release-bot (member) with one active key, used yesterday. |
| 19 | `service-account-key-created.png` | 1440×900 | `/teams/support-tools/service-accounts/<ci-release-bot>?tab=keys` | Priya Shah | `/docs/teams/service-accounts` | Create a second key so the rotation note shows. Replace the secret with a fake value omp_sa_0000… before capture. |
| 20 | `api-key-create.png` | 1440×900 | `/settings/api-keys` | Sam Ortiz | `/docs/use/api-keys` | Sam has access to support and company. |
| 21 | `connected-apps.png` | 1440×900 | `/settings/connected-apps` | Sam Ortiz | `/docs/use/connected-apps` | Two OAuth connections as described. |
| 22 | `oauth-consent.png` | 1440×900 | `/oauth/consent?…` | Sam Ortiz | `/docs/get-started/connect-your-client` | Start an OAuth sign-in from a client that registers itself (pi without clientRegistration: cimd) to the support gateway. |
| 23 | `connect-confirm.png` | 1440×900 | `/connect/google?request=…` | Sam Ortiz | `/docs/use/connecting-accounts` | Call mail__search_messages without a connection and open the -32042 link. The provider may point at the fake OAuth provider; only the portal's page is captured. |
| 24 | `connect-done.png` | 1440×900 | `/connect/done?provider=google&result=connected` | Sam Ortiz | `/docs/use/connecting-accounts` | After approving at the (fake) provider. |
| 25 | `my-connections.png` | 1440×900 | `/settings/connections` | Sam Ortiz | `/docs/use/connecting-accounts` | Two connections as described. |
| 26 | `team-usage.png` | 1440×900 | `/teams/support-tools/usage` | Priya Shah | `/docs/teams/activity-and-usage` | Seed a few hundred calls through support and company over a week, with some tool errors, one rate limited and some needing a connection. |
| 27 | `call-detail-payload.png` | 1440×900 | `/teams/support-tools/calls/<id>` | Priya Shah | `/docs/teams/activity-and-usage`, `/docs/teams/payload-capture` | Turn on Record call contents on gateway support, call status__echo or search_tickets with a fake bearer token in the arguments, then View contents. |
| 28 | `team-settings-members.png` | 1440×900 | `/teams/support-tools/settings?tab=members` | Priya Shah | `/docs/teams/team-settings` | Five members and one open invite (new.hire@example.com). |
| 29 | `admin-users.png` | 1440×900 | `/admin/users` | Morgan Lee | `/docs/administer/users-and-teams` | About eight people; Casey suspended. |
| 30 | `admin-user-detail.png` | 1440×900 | `/admin/users/<sam>` | Morgan Lee | `/docs/administer/users-and-teams` | Sam with the connected apps and connections above. |
| 31 | `admin-servers-review.png` | 1440×900 | `/admin/servers` | Morgan Lee | `/docs/administer/catalog-review` | Two servers pending review (one with a team note), Status published with one changed capability. |
| 32 | `admin-server-review-dialog.png` | 1440×900 | `/admin/servers/<wiki-search>` | Morgan Lee | `/docs/administer/catalog-review` | A pending server Wiki search (Data Platform) with capabilities read. |
| 33 | `admin-publishing.png` | 1440×900 | `/admin/publishing` | Morgan Lee | `/docs/administer/publishing-policy` | Default Approval required; Data Platform has a Self-publish override. |
| 34 | `admin-internal-networks.png` | 1440×900 | `/admin/networks` | Morgan Lee | `/docs/administer/internal-networks` | UPSTREAM_ALLOWED_NETWORKS=http:*.svc.cluster.local; admin entries as described; check https://wiki.corp.example.com/mcp. |
| 35 | `admin-trusted-clients.png` | 1440×900 | `/admin/trusted-clients` | Taylor Brooks | `/docs/administer/trusted-clients` | The seeded list, viewed as auditor (read-only). |
| 36 | `admin-auth-providers.png` | 1440×900 | `/admin/auth-providers` | Morgan Lee | `/docs/administer/auth-providers` | Two providers. They may point at the fake OAuth provider; don't show real client IDs. |
| 37 | `admin-auth-provider-create.png` | 1440×900 | `/admin/auth-providers (Add auth provider)` | Morgan Lee | `/docs/administer/auth-providers` | The first step of the create form. |
| 38 | `admin-limits.png` | 1440×900 | `/admin/limits` | Morgan Lee | `/docs/administer/limits` | Per gateway default 2,000 with ceiling 5,000; others built-in. |
| 39 | `admin-retention.png` | 1440×900 | `/admin/retention` | Morgan Lee | `/docs/administer/retention` | Defaults; a last run that deleted a few call records. |
| 40 | `admin-capture.png` | 1440×900 | `/admin/capture` | Morgan Lee | `/docs/administer/payload-capture` | Add the pattern; paste a sample with an employee number and a bearer token. |
| 41 | `admin-usage.png` | 1440×900 | `/admin/usage` | Morgan Lee | `/docs/administer/usage-and-calls` | Seeded calls across three teams. |
| 42 | `admin-calls.png` | 1440×900 | `/admin/calls` | Taylor Brooks | `/docs/administer/usage-and-calls` | Mixed outcomes; one Recorded call. |
| 43 | `admin-audit.png` | 1440×900 | `/admin/audit` | Taylor Brooks | `/docs/administer/audit-log` | After the seed and the other captures. |
