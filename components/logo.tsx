import mark from '@/lib/mark.json';

/*
 * The Open MCP Portal logo, "Keystone": a round arch of three stones on a
 * dark tile, the teal keystone at the crown standing slightly proud. The mark
 * is inline SVG (no request, no font), read from lib/mark.json, which holds
 * mark-small.svg from omp-assets (logo/keystone/), the drawing for 20 to
 * 47 px; `npm run logo -- keystone` writes it. The name beside it is live
 * text. The website draws the same mark at the same size from its own copy of
 * lib/mark.json: change both together.
 */

/** The mark: decorative here, because the name is always next to it. */
export function OmpMark({ className = 'size-7' }: { className?: string }) {
  return (
    <svg
      viewBox={mark.viewBox}
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 ${className}`}
      // Static markup from lib/mark.json, written by us; no user input.
      dangerouslySetInnerHTML={{ __html: mark.svg }}
    />
  );
}

/** The product's full name as text, set in Inter (used inline in sentences too). */
export function OmpWordmark({ className }: { className?: string }) {
  return <span className={`font-semibold tracking-tight whitespace-nowrap ${className ?? ''}`}>Open MCP Portal</span>;
}

/**
 * The nav bar title: the mark, the name and a "docs" tag. `antialiased`
 * matches the website, whose body sets it, so the name renders identically.
 */
export function NavTitle() {
  return (
    <span className="inline-flex items-center gap-2.5 text-fd-foreground antialiased">
      <OmpMark />
      <OmpWordmark className="text-[1.05rem]" />
      <span className="rounded-md border border-fd-border px-1.5 py-0.5 text-xs font-medium text-fd-muted-foreground">
        docs
      </span>
    </span>
  );
}
