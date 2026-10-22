/**
 * Sello (hanko) decorativo en el color de acento. Elemento gráfico propio,
 * no un carácter japonés real, usado como detalle de marca junto al logotipo
 * y como motivo discreto en distintos puntos de la web.
 */
export function Hanko({ className = '', title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect x="1" y="1" width="38" height="38" rx="3" fill="currentColor" />
      <path
        d="M20 9 C 15 14, 15 18, 20 20 C 25 22, 25 26, 20 31"
        stroke="#fff"
        strokeWidth="2.1"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="20" cy="14.5" r="1.4" fill="#fff" />
      <circle cx="20" cy="25.5" r="1.4" fill="#fff" />
    </svg>
  )
}
