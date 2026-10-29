import Image from "next/image";
import logo from "@/public/brand/meat-love-logo-light.png";
import { cn } from "@/lib/cn";

/**
 * Logo officiel Meat Love (tête de taureau), version claire pour fond sombre,
 * extraite du logo fourni par le restaurant.
 */
export function Wordmark({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src={logo}
      alt="Meat Love"
      priority={priority}
      sizes="160px"
      className={cn("h-12 w-auto select-none", className)}
    />
  );
}
