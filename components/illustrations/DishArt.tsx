import type { ReactNode } from "react";
import type { VisualKey } from "@/data/menu";

/*
 * Illustrations au trait façon « gravure de carte », utilisées tant que les
 * photos réelles des plats ne sont pas fournies. Volontairement stylisées :
 * elles évoquent le plat sans prétendre le représenter fidèlement, et
 * n'ajoutent aucun ingrédient absent de la carte.
 *
 * Repère : viewBox 240 × 240. `currentColor` = trait ivoire, classe
 * `accent` = braise.
 */

const Steam = ({ x, y, h = 34 }: { x: number; y: number; h?: number }) => (
  <g className="steam" opacity="0.55">
    <path d={`M${x} ${y} c-7 -${h / 4} 7 -${h / 2} 0 -${(h * 3) / 4} s 5 -${h / 4} 2 -${h / 4}`} />
    <path d={`M${x + 14} ${y + 4} c-6 -${h / 4} 6 -${h / 2} 0 -${(h * 3) / 4}`} />
    <path d={`M${x - 14} ${y + 4} c-6 -${h / 4} 6 -${h / 2} 0 -${(h * 3) / 4}`} />
  </g>
);

const Smoke = () => (
  <g className="steam" opacity="0.4">
    <path d="M96 78c-10-12 6-20-2-34s8-18 4-30" />
    <path d="M122 72c-8-14 10-18 2-34s6-16 2-26" />
    <path d="M148 80c-10-10 6-22-2-34" />
  </g>
);

const Board = () => (
  <g>
    <path d="M38 168h164a8 8 0 0 1 8 8v6a8 8 0 0 1-8 8H38a8 8 0 0 1-8-8v-6a8 8 0 0 1 8-8Z" />
    <path d="M210 176h12a6 6 0 0 1 0 12h-12" />
    <path d="M44 179h40M96 179h70" opacity="0.35" />
  </g>
);

const Plate = ({ cy = 150, rx = 92, ry = 30 }: { cy?: number; rx?: number; ry?: number }) => (
  <g>
    <ellipse cx="120" cy={cy} rx={rx} ry={ry} />
    <ellipse cx="120" cy={cy - 2} rx={rx - 18} ry={ry - 8} opacity="0.4" />
  </g>
);

const Bun = ({ top, bottom }: { top: number; bottom: number }) => (
  <g>
    {/* chapeau brioché */}
    <path d={`M54 ${top + 40}c0-30 30-44 66-44s66 14 66 44c0 4-3 6-7 6H61c-4 0-7-2-7-6Z`} />
    <path d={`M78 ${top + 14}c10-6 22-9 42-9`} opacity="0.4" />
    {/* base */}
    <path d={`M56 ${bottom}h128c0 12-6 20-16 20H72c-10 0-16-8-16-20Z`} />
  </g>
);

const art: Record<VisualKey, ReactNode> = {
  burger: (
    <g>
      <Bun top={70} bottom={148} />
      <path className="accent" d="M50 122c0-4 3-6 7-6h126c4 0 7 2 7 6v8c0 4-3 6-7 6H57c-4 0-7-2-7-6Z" />
      <path d="M66 126h12M90 126h14M118 126h12M144 126h14M168 126h6" opacity="0.5" />
      <path d="M58 142h124" opacity="0.5" />
    </g>
  ),
  "brisket-burger": (
    <g>
      <Bun top={56} bottom={158} />
      <path className="accent" d="M52 110c14-6 26 4 40-2s28 6 42 0 28 4 42-2l6 2v10c-14 6-28-4-42 2s-28-6-42 0-28-4-40 2l-6-2Z" />
      <path className="accent" d="M52 128c14-6 26 4 40-2s28 6 42 0 28 4 42-2l6 2v10c-14 6-28-4-42 2s-28-6-42 0-28-4-40 2l-6-2Z" />
      <path d="M50 152h140" opacity="0.5" />
    </g>
  ),
  "chicken-burger": (
    <g>
      <Bun top={70} bottom={150} />
      <path className="accent" d="M48 124c4-8 14-6 20-10 10-6 26-2 36-6 12-4 26 2 38-2s26 2 32 6 10 6 12 12-4 10-10 12c-14 4-28 0-42 2-16 2-30-2-46 0-14 2-34 2-40-6-2-2-2-6 0-8Z" />
      <path d="M74 128l8-4M104 126l10-4M136 126l8-4M160 128l6-3" opacity="0.5" />
    </g>
  ),
  "lamb-shoulder": (
    <g>
      <Smoke />
      <Board />
      {/* pièce entière, croûte de fumage, tranches à droite */}
      <path className="accent" d="M34 166c2-18 14-30 32-36 14-5 22-16 40-18 20-2 34 6 46 14 8 5 14 10 16 18l-6 22Z" />
      <path d="M48 150c10-12 24-16 36-20 14-5 22-14 36-14 14 0 24 6 32 12" opacity="0.5" strokeDasharray="2 6" />
      <path d="M70 160c12-8 30-12 46-10" opacity="0.45" />
      <path className="accent-solid" d="M168 166l12-40h9l-11 40Z" />
      <path className="accent-solid" d="M184 166l11-34h9l-10 34Z" />
      <path className="accent-solid" d="M199 166l9-27h9l-8 27Z" />
    </g>
  ),
  "lamb-shank": (
    <g>
      <Smoke />
      <ellipse cx="120" cy="178" rx="88" ry="16" />
      <ellipse cx="120" cy="176" rx="68" ry="10" opacity="0.4" />
      {/* jarret dressé, os vers le haut */}
      <path className="accent" d="M90 174c-16-8-20-34-8-52 9-13 18-20 22-34h32c4 14 13 21 22 34 12 18 8 44-8 52Z" />
      <path d="M100 160c-6-12-4-26 6-36M140 160c6-12 4-26-6-36M120 166v-50" opacity="0.5" />
      <path d="M110 88V52M130 88V52" />
      <path d="M104 52c-8-6-2-18 7-14 1-8 17-8 18 0 9-4 15 8 7 14Z" />
    </g>
  ),
  "lamb-neck": (
    <g>
      <Smoke />
      <Board />
      {/* collier tranché : rondelles autour de la vertèbre */}
      <g>
        <circle className="accent-solid" cx="186" cy="146" r="22" />
        <circle cx="186" cy="146" r="5" />
        <circle className="accent-solid" cx="72" cy="140" r="28" />
        <circle cx="72" cy="140" r="6" />
        <path d="M72 120v8M52 140h8M84 140h8M72 152v8" opacity="0.5" />
        <circle className="accent-solid" cx="130" cy="134" r="34" />
        <circle cx="130" cy="134" r="8" />
        <path d="M130 108v10M104 134h12M144 134h12M130 150v10M112 116l7 7M148 116l-7 7M112 152l7-7M148 152l-7-7" opacity="0.5" />
        <path d="M108 112a30 30 0 0 1 22-10" opacity="0.4" strokeDasharray="2 5" />
      </g>
    </g>
  ),
  cloche: (
    <g>
      <Steam x={120} y={58} h={30} />
      <ellipse cx="120" cy="168" rx="96" ry="18" />
      <path className="accent" d="M44 162c0-46 34-80 76-80s76 34 76 80Z" />
      <path d="M64 140c6-22 22-40 42-46" opacity="0.5" />
      <path d="M112 82v-8a8 8 0 0 1 16 0v8" />
      <path d="M38 162h164" />
    </g>
  ),
  "chicken-plate": (
    <g>
      <Plate cy={150} />
      <path className="accent" d="M70 146c-6-16 4-34 22-38 16-4 30 4 36 16 4 8 2 18-6 22-16 8-38 8-52 0Z" />
      <path d="M118 140l20 6c4-4 12-4 14 2s-4 10-8 8l-26-6" />
      <path d="M86 126c8-6 20-6 28 0" opacity="0.5" />
      {/* riz */}
      <path d="M140 132c4-12 32-12 38 0 2 4-1 8-6 8h-26c-5 0-8-4-6-8Z" />
      <path d="M150 128h.01M158 124h.01M166 129h.01M160 132h.01" strokeWidth="3" strokeLinecap="round" />
      {/* salade */}
      <path d="M96 164c-4-10 8-14 14-8 4-8 16-6 16 2 8-2 12 8 4 12-10 4-28 2-34-6Z" opacity="0.8" />
      {/* pommes de terre */}
      <path d="M150 156l16-8 8 10-16 8Z" />
      <path d="M174 146l14-4 2 10-14 4Z" />
    </g>
  ),
  "smoked-chicken": (
    <g>
      <Smoke />
      <Plate cy={162} rx={96} ry={26} />
      {/* volaille entière, cuisses relevées */}
      <path className="accent" d="M58 156c-6-34 22-58 60-58 34 0 60 18 64 46 1 6-3 12-10 13-36 6-76 6-108 2-3 0-6-1-6-3Z" />
      <path d="M78 128c14-14 40-20 64-12" opacity="0.5" />
      <path d="M86 140c18-8 44-10 66-4" opacity="0.35" strokeDasharray="2 6" />
      <path className="accent-solid" d="M140 120c6-14 20-24 34-26l4 10c-12 4-22 12-28 22Z" />
      <path d="M176 96l10-8" />
      <circle cx="190" cy="84" r="4.5" />
      <circle cx="184" cy="81" r="3.5" />
      <path className="accent-solid" d="M154 134c8-12 22-18 36-18l2 10c-12 1-24 6-32 14Z" />
      <path d="M192 120l12-4" />
      <circle cx="208" cy="113" r="4.5" />
      <circle cx="203" cy="109" r="3.5" />
    </g>
  ),
  pasta: (
    <g>
      <path d="M36 128h168c0 34-36 56-84 56s-84-22-84-56Z" />
      <path d="M92 188h56" />
      <path className="accent" d="M56 128c8-22 34-30 52-20 14-14 42-12 54 2 14-4 26 4 26 18Z" />
      <path d="M72 124c10-12 26-14 38-6M108 118c12-10 30-10 42 0M134 122c12-6 26-4 36 4M84 128c8-8 22-10 34-4" opacity="0.6" />
      <path d="M168 40l-24 76M178 44l-24 76M188 48l-24 76M164 128l6-14" />
      <path d="M162 36c6-6 26 2 28 12" />
    </g>
  ),
  soup: (
    <g>
      <Steam x={120} y={92} h={40} />
      <path d="M40 120h160c0 38-34 62-80 62s-80-24-80-62Z" />
      <ellipse className="accent" cx="120" cy="120" rx="80" ry="14" />
      <path d="M96 116c10 4 30 4 44 0" opacity="0.5" />
      <path d="M150 112l46-40c4-4 10 2 6 6l-44 40" />
      <path d="M92 186h56" />
    </g>
  ),
  bourek: (
    <g>
      <Plate cy={152} />
      <g className="accent">
        <rect x="56" y="112" width="128" height="20" rx="10" transform="rotate(-8 120 122)" />
        <rect x="52" y="134" width="132" height="20" rx="10" transform="rotate(4 120 144)" />
      </g>
      <path d="M78 108l-4 20M100 106l-4 20M124 102l-4 20M148 98l-4 20" opacity="0.5" />
      <path d="M76 134l2 20M100 136l2 20M124 138l2 20M148 140l2 20" opacity="0.5" />
    </g>
  ),
  rice: (
    <g>
      <path d="M44 136h152c0 30-32 50-76 50s-76-20-76-50Z" />
      <path className="accent" d="M58 136c4-30 34-46 62-46s58 16 62 46Z" />
      <path
        d="M84 120h.01M100 108h.01M120 102h.01M140 108h.01M156 120h.01M110 122h.01M132 124h.01M96 130h.01M146 130h.01M120 114h.01"
        strokeWidth="3.4"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path d="M96 190h48" />
    </g>
  ),
  "creme-brulee": (
    <g>
      <ellipse cx="120" cy="172" rx="88" ry="14" opacity="0.6" />
      <path d="M52 112v42c0 10 30 18 68 18s68-8 68-18v-42" />
      <ellipse className="accent" cx="120" cy="112" rx="68" ry="16" />
      <path d="M64 120v40M80 124v42M96 126v44M112 127v44M128 127v44M144 126v44M160 124v42M176 120v40" opacity="0.35" />
      <path d="M92 108l14 4 10-6 14 6 12-4" opacity="0.6" />
    </g>
  ),
  tiramisu: (
    <g>
      <ellipse cx="120" cy="176" rx="92" ry="14" opacity="0.6" />
      <path d="M56 104l64-22 64 22v60l-64 18-64-18Z" />
      <path d="M56 104l64 18 64-18M120 122v60" />
      <path className="accent" d="M56 124l64 18 64-18M56 144l64 18 64-18" />
      <path d="M78 98h.01M96 92h.01M120 90h.01M140 96h.01M160 100h.01M108 100h.01M130 104h.01" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
    </g>
  ),
  soda: (
    <g>
      <path d="M90 196h60" opacity="0.6" />
      <path d="M86 84h68l-8 108H94Z" />
      <path className="accent" d="M89 112h62l-5 74H94Z" />
      <path d="M104 132h.01M124 150h.01M116 120h.01M134 168h.01M110 172h.01" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M132 84l12-48 16-4" />
    </g>
  ),
  water: (
    <g>
      <path d="M100 52h40M104 52v22c0 10-30 22-30 56v48c0 8 6 14 14 14h64c8 0 14-6 14-14v-48c0-34-30-46-30-56V52" />
      <path className="accent" d="M76 136h88v42c0 6-4 10-10 10H86c-6 0-10-4-10-10Z" opacity="0.7" />
      <path d="M90 150c8 4 20 4 30 0s22-4 30 0" opacity="0.6" />
    </g>
  ),
  coffee: (
    <g>
      <Steam x={112} y={96} h={36} />
      <ellipse cx="116" cy="172" rx="80" ry="14" />
      <path d="M62 112h108v18c0 26-24 44-54 44s-54-18-54-44Z" />
      <ellipse className="accent" cx="116" cy="112" rx="54" ry="10" />
      <path d="M170 122h10a16 16 0 0 1 0 32h-14" />
    </g>
  ),
  brioche: (
    <g>
      <ellipse cx="120" cy="176" rx="96" ry="12" opacity="0.6" />
      <path className="accent" d="M44 170c-6-30 6-54 30-60 2-22 22-36 46-36s44 14 46 36c24 6 36 30 30 60Z" />
      <path d="M92 168c-6-24-2-48 14-64M148 168c6-24 2-48-14-64M120 166V96" opacity="0.5" />
      <path d="M86 92c10-8 22-11 34-11" opacity="0.5" />
    </g>
  ),
};

export function DishArt({ visual, className }: { visual: VisualKey; className?: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {art[visual]}
    </svg>
  );
}
