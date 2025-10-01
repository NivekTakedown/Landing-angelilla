import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 28"
      aria-label="Mente Serena Logo"
      {...props}
    >
      <style>
        {`
          .logo-text {
            font-family: 'Playfair Display', serif;
            font-weight: 600;
            font-size: 24px;
            fill: hsl(var(--foreground));
          }
          .logo-swash {
            fill: none;
            stroke: hsl(var(--primary));
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
          }
        `}
      </style>
      <text x="0" y="20" className="logo-text">
        Mente Serena
      </text>
      <path
        className="logo-swash"
        d="M 90,15 Q 95,5 100,15"
        transform="translate(-1, 0)"
      />
    </svg>
  );
}
