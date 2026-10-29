import { Info } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * Encart visible uniquement en mode présentation (site.showSetupHints) :
 * signale une information à fournir par le restaurant. N'affiche jamais
 * de fausse donnée.
 */
export function SetupHint({ children, className }: { children: React.ReactNode; className?: string }) {
  if (!site.showSetupHints) return null;
  return (
    <p
      className={cn(
        "flex items-start gap-2.5 rounded-xl border border-dashed border-glow/35 bg-glow/[0.04] px-4 py-3 text-sm leading-relaxed text-cream/75",
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0 text-glow" aria-hidden />
      <span className="min-w-0 [overflow-wrap:anywhere]">{children}</span>
    </p>
  );
}
