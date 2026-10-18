# Screenshot capture list

Every image in these docs has a named slot in `lib/screenshot-slots.json` (its alt text and the file names it may have) and is placed with `<Screenshot slot="…" />`. Until an image is imported, the page shows a marked placeholder. This file is the capture list for the screenshot session. **Slots 1 to 43 are captured** (2026-10-17, Open MCP Portal at commit `d039647`, from the Example Corp capture stack in `../omp-assets/capture/`); the files and what each shows are in `../omp-assets/screenshots/MANIFEST.md`. A retake follows `../omp-assets/capture/README.md`. **Slots 44 to 54 were added for v0.2.0 and are not captured yet**: their pages show the marked placeholder until `npm run screenshots` imports them. See "For v0.2.0" below.

## Rules

- **Only the fictional demo instance, never a real install.** Organisation: **Example Corp**, domain `example.com`, portal at `https://mcp.example.com` (in the capture environment any loopback address is fine, but the URLs the docs mention use `mcp.example.com`), `ORG_NAME=Example Corp`, `INSTANCE_NAME=Example Corp MCP Portal`. Never show a real person, organisation, key, token, client ID or provider account.
- **Personas** (all fictional):
  - **Morgan Lee**, `morgan.lee@example.com`, platform admin
  - **Taylor Brooks**, `taylor.brooks@example.com`, platform auditor
  - **Priya Shah**, `priya.shah@example.com`, owner of the team **Support Tools** (`support-tools`), member of **Data Platform**
  - **Sam Ortiz**, `sam.ortiz@example.com`, editor of Support Tools, in the SSO group `engineering`
  - **Jordan Kim**, `jordan.kim@example.com`, owner of the team **Data Platform** (`data-platform`)
  - **Casey Moore**, `casey.moore@example.com`, suspended
  - As captured, also Alex Rivera (Support Tools admin), Quinn Foster and Riley Chen (Support Tools members; Riley owns IT Operations), and Drew Park (Data Platform editor, in `engineering`).
- **Configuration**:
  - MCP servers: **Status** (`status`, Support Tools; the repository's fake MCP server, `cmd/fakemcp`: tools `check_outage`, `search_tickets`, `create_ticket`, the resource `status://services`, the template `status://services/{service}`, the prompt `incident_summary`), **Mail** (`mail`, Support Tools; `examples/mail-mcp` with its fake Gmail, requiring the Google provider with `gmail.readonly`, `create_draft` overridden to `gmail.compose`), **Code search** (`code-search`, Data Platform; `cmd/fakemcp -protect` with `cmd/fakeoauth`, in Sign-in with OAuth mode), **Wiki search** (`wiki-search`, Data Platform; pending review).
  - Gateways: team gateway **Support** (`support`); platform gateways **Company tools** (`company`, granted to Support Tools, `jordan.kim@example.com` and the group `engineering`) and **Engineering tools** (`engineering-tools`, granted to `engineering`, recording call contents).
  - Service account **ci-release-bot** (Support Tools, member).
  - Auth providers **Google** (Google preset, slug `google`) and **GitHub** (GitHub preset, slug `github`); they may point at `cmd/fakeoauth`, but never show a real client ID or secret.
- **No real third parties.** Use the fakes in the repository (`make fake-mcp`, `make fake-oauth`, `make example-mail-fake`), not GitHub or Google accounts. As captured: `cmd/fakeoauth` stands in for Google and for SourceHub's authorization server, `examples/mail-mcp -fake-gmail` is Mail, and Status, Wiki search, On-call and Code search (SourceHub's hosted server, OAuth-protected like `cmd/fakemcp -protect`) are small capture servers with the same capabilities as `cmd/fakemcp` for Status and believable data (`../omp-assets/capture/stack/`).
- **Size**: PNG, **1440×900** (device scale factor 1), light theme unless the state says otherwise.
- **Version**: slots 1 to 43 were captured from Open MCP Portal's build at commit `d039647` (v0.1.0, before its tag); slots 44 to 54 are for **v0.2.0**, to be captured from the v0.2.0 image (`ghcr.io/ncecere/open-mcp-portal:v0.2.0`). Pin the clock in the seed so timestamps don't churn.
- **Secrets**: any key or token shown must be a fake value (`omp_0000…`, `omp_sa_0000…`, `ompadm_0000…`, `omppub_0000…`, `ompwhs_0000…`) before capture.
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
| 3 | `my-gateways.png` | 1440×900 | `/gateways` | Sam Ortiz (captured as Sam: he has exactly these three gateways) | `/docs/use/my-gateways` | Team gateway support (Support Tools), platform gateways company (granted to team Support Tools) and engineering-tools (granted to group engineering, with Record call contents on). |
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
| 44 | `admin-overview.png` | 1440×900 | `/admin` | Morgan Lee | `/docs/administer/overview` | Seeded calls over a day, with some errors and one rate-limited call. One failing published server (Status, failing since the previous day), one published server with a changed capability held back, two servers waiting for review (one for more than 3 days), a personal key and a service account key expiring within 14 days, and one failing webhook destination, so that every severity shows. |
| 45 | `admin-notifications.png` | 1440×900 | `/admin/notifications` | Morgan Lee | `/docs/administer/notifications` | SMTP set to a local sink (`SMTP_HOST`, `SMTP_FROM=Open MCP Portal <portal@example.com>`), one platform JSON destination and one Slack destination with a few delivered and one failed delivery. No real webhook URL: use a reserved example address and show only the host. |
| 46 | `admin-automation-tokens.png` | 1440×900 | `/admin/automation-tokens` | Morgan Lee | `/docs/administer/automation-tokens` | Two platform tokens (`monitoring` with `platform:read`, `provisioning` with `platform:write`), one revoked, and one blocked because its creator is no longer a platform admin. |
| 47 | `admin-automation-token-created.png` | 1440×900 | `/admin/automation-tokens` (the dialog after Create) | Morgan Lee | `/docs/administer/automation-tokens` | The show-once panel. Replace the secret with a fake value `ompadm_0000…` before capture. |
| 48 | `team-attention.png` | 1440×900 | `/teams/support-tools` | Priya Shah | `/docs/teams/attention-and-notifications` | The Attention card with a failing server, a server with changes held back from the catalog and a publisher token expiring. |
| 49 | `team-notifications.png` | 1440×900 | `/teams/support-tools/settings?tab=notifications` | Priya Shah | `/docs/teams/attention-and-notifications` | Two destinations (a JSON one and a Slack one) with health badges, one with a failed delivery. Fake hosts only. |
| 50 | `team-automation-tokens.png` | 1440×900 | `/teams/support-tools/settings?tab=automation-tokens` | Priya Shah | `/docs/teams/publisher-tokens` | A `github-actions` token with `servers:write` and one expired token. |
| 51 | `notifications-inbox.png` | 1440×900 | `/notifications` | Sam Ortiz | `/docs/use/notification-preferences` | A few notifications, some unread (server unhealthy, capability changed, a decided review). |
| 52 | `notification-preferences.png` | 1440×900 | `/settings/notifications` | Sam Ortiz | `/docs/use/notification-preferences` | Email set up, the defaults (all on). |
| 53 | `connect-allow-server.png` | 1440×900 | `/connect/google?request=…` | Sam Ortiz | `/docs/use/connecting-accounts` | Sam's Google connection already covers `gmail.readonly`; call `mail__search_messages` from a server he hasn't allowed and open the link: the page that asks only "Allow Mail (Support Tools)". |
| 54 | `server-protocol.png` | 1440×900 | `/teams/support-tools/servers/<status>` | Priya Shah | `/docs/teams/capabilities` | Run `cmd/fakemcp -protocol modern` (or `both`), refresh, and show the protocol line on the server's Overview. |

## For v0.2.0

- **New slots 44 to 54** (above) are not captured. Pages that use them show the placeholder, listed by `npm run screenshots:check`.
- **Slots 1 to 43 show v0.1.0's screens** and were not retaken. Since then the header has a bell with an unread count, the admin sidebar starts with **Overview** (the admin area also gains **Notifications** and **Automation tokens** pages), and Team settings gains two tabs, so a retake from the v0.2.0 image will show those. Three of them also changed in content: `connect-confirm` (the consent page names the server and its team for platform providers), `my-connections` (a connection lists the servers it allowed) and `server-overview` (the negotiated protocol). `/admin` now opens Overview, not Users.
