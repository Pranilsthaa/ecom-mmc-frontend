import type { SVGProps } from "react";

// Lucide no longer includes brand icons. Keep the supplied footer artwork local.
const defaults = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

export function Facebook(props: SVGProps<SVGSVGElement>) {
  return <svg {...defaults} {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
}

export function Instagram(props: SVGProps<SVGSVGElement>) {
  return <svg {...defaults} {...props}><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg>;
}

export function Twitter(props: SVGProps<SVGSVGElement>) {
  return <svg {...defaults} {...props}><path d="M22 5.9a8 8 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.4 8.4 0 0 1-2.7 1 4.2 4.2 0 0 0-7.2 3.8A12 12 0 0 1 2.8 4.7a4.2 4.2 0 0 0 1.3 5.6A4.2 4.2 0 0 1 2.2 9.8a4.2 4.2 0 0 0 3.4 4.1 4.2 4.2 0 0 1-1.9.1 4.2 4.2 0 0 0 3.9 2.9A8.4 8.4 0 0 1 2 18.5a12 12 0 0 0 18.4-10.1V8a8.6 8.6 0 0 0 1.6-2.1z" /></svg>;
}
