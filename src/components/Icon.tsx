const paths: Record<string, string> = {
  dna: '<path d="M6 3c0 6 12 12 12 18M18 3c0 6-12 12-12 18M7 8h10M7 16h10"/>',
  metabolism: '<path d="M3 12h4l2-7 4 14 2-7h6"/>',
  stress:
    '<circle cx="12" cy="10" r="6"/><path d="M9 21c0-2 1.5-3 3-3s3 1 3 3"/><path d="M9 9c.5-1.5 2-1.5 3-.5 1-1 2.5-1 3 .5"/>',
  dandruff:
    '<path d="M12 2c-3 4-6 7-6 11a6 6 0 0 0 12 0c0-4-3-7-6-11z"/><circle cx="6" cy="19" r="1"/><circle cx="17" cy="18" r=".7"/>',
  gut: '<path d="M6 4c0 3 3 3 3 6s-3 3-3 6 3 3 3 5M12 4c0 3 3 3 3 6s-3 3-3 6 3 3 3 5"/>',
  nutrition:
    '<path d="M12 21c-5-2-8-6-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 5-3 9-8 11z"/><path d="M12 10V4"/>',
  kit: '<path d="M4 8h16l-1 12H5L4 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  doctor:
    '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/><path d="M12 12v4M10 14h4"/>',
  coach:
    '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 2.5-5 6-5"/><path d="M16 4l1.5 1.5L21 2"/><circle cx="17" cy="15" r="4"/>',
  nutplan:
    '<path d="M4 4h16v4H4z"/><path d="M6 8v12h12V8"/><path d="M9 12h6M9 16h6"/>',
  genomic:
    '<path d="M4 6c4 2 4 4 8 4s4-2 8-4M4 12c4 2 4 4 8 4s4-2 8-4M4 18c4 2 4 4 8 4s4-2 8-4" transform="translate(0,-6)"/>',
  consult:
    '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  cross:
    '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  bottle:
    '<path d="M10 2h4v3l2 2v13a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V7l2-2z"/><path d="M8 12h8"/>',
  dropper:
    '<path d="M9 2h6l-1 6-3 3-3-3-1-6z"/><path d="M12 11v9"/><circle cx="12" cy="21" r="1.4"/>',
  jar: '<path d="M6 9h12v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9z"/><path d="M5 6h14v3H5z"/>',
  capsule:
    '<rect x="4" y="9" width="16" height="6" rx="3" transform="rotate(-30 12 12)"/><line x1="10" y1="8" x2="14" y2="16"/>',
  comb: '<path d="M4 4h16v4H4z"/><path d="M6 8v12M9 8v12M12 8v12M15 8v12M18 8v12"/>',
  roller: '<circle cx="12" cy="9" r="3"/><path d="M12 12v8M9 16h6"/>',
  gummy:
    '<path d="M12 3c4 0 6 3 6 7s-2 8-6 8-6-4-6-8 2-7 6-7z"/><path d="M9 10c1 1 5 1 6 0"/>',
  spray:
    '<path d="M9 6h4v3h4l1 2v11H8V11l1-2z" /><path d="M9 6V3h4v3"/>',
  cart: '<path d="M4 4h2l1.4 11.2A2 2 0 0 0 9.4 17h7.2a2 2 0 0 0 2-1.6L20 8H6"/><circle cx="10" cy="21" r="1.2" fill="currentColor" stroke="none"/><circle cx="17" cy="21" r="1.2" fill="currentColor" stroke="none"/>',
  star: '<polygon points="12 2 15 8.5 22 9.3 17 14 18.5 21 12 17.5 5.5 21 7 14 2 9.3 9 8.5 12 2" fill="currentColor" stroke="none"/>',
  headM:
    '<path d="M12 3C7 3 5 7 5 11c0 5 2 8 2 10h10c0-2 2-5 2-10 0-4-2-8-7-8z"/>',
  headF:
    '<path d="M12 3c-5 0-7 4-7 9 0 5 2 8 2 9h10c0-1 2-4 2-9 0-5-2-9-7-9z"/><path d="M5 10c0 3 1 3 1 6M19 10c0 3-1 3-1 6"/>',
  users:
    '<path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  checkCircle:
    '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  starOutline:
    '<polygon points="12 2 15 8.5 22 9.3 17 14 18.5 21 12 17.5 5.5 21 7 14 2 9.3 9 8.5 12 2"/>',
  whatsapp:
    '<path d="M12 3a9 9 0 0 0-7.75 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z"/><path d="M8.5 8.8c.2-.5.4-.5.6-.5h.5c.15 0 .35 0 .5.4.2.5.65 1.6.7 1.75.06.15.1.3 0 .5-.1.2-.15.3-.3.45l-.4.45c-.15.15-.3.3-.13.6.17.3.75 1.2 1.6 1.95 1.1.95 1.95 1.25 2.25 1.4.3.13.45.1.6-.07.2-.2.75-.85.95-1.15.2-.3.4-.25.65-.15.25.1 1.6.75 1.9.9.3.13.5.2.55.3.1.2.1 1.05-.25 1.5-.35.45-1.35 1.05-2.3 1.05-.95 0-2.5-.35-4.5-2.2-2.4-2.15-3.85-4.5-4.05-4.85-.2-.35-1.05-1.55-1.05-2.85 0-1.3.7-1.9.95-2.15z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  chevronDown: '<polyline points="6 9 12 15 18 9"/>',
  chevronLeft: '<polyline points="15 18 9 12 15 6"/>',
  chevronRight: '<polyline points="9 18 15 12 9 6"/>',
  person:
    '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  instagram:
    '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>',
  youtube:
    '<rect x="2" y="5" width="20" height="14" rx="4"/><polygon points="10 9 15 12 10 15" fill="currentColor" stroke="none"/>',
  linkedin:
    '<rect x="3" y="3" width="18" height="18" rx="3"/><line x1="8" y1="10" x2="8" y2="16"/><circle cx="8" cy="7" r=".5" fill="currentColor"/><path d="M12 16v-3.5a2 2 0 0 1 4 0V16"/>',
}

type IconProps = {
  name: string
  className?: string
  strokeWidth?: number | string
}

export function Icon({ name, className, strokeWidth = 1.6 }: IconProps) {
  const path = paths[name]
  if (!path) return null

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: path }}
    />
  )
}
