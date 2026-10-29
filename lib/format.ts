const dinarFormatter = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 0,
});

/** 1350 → « 1 350 DA » (espace fine insécable, typographie française). */
export function formatDA(amount: number): string {
  // Normalise les espaces produits par Intl en espace fine insécable.
  const digits = dinarFormatter.format(amount).replace(/[\s  ]/g, " ");
  return `${digits} DA`;
}

/** Version texte brut (messages WhatsApp, presse-papiers) : espaces simples. */
export function formatDAPlain(amount: number): string {
  return formatDA(amount).replace(/[  ]/g, " ");
}
