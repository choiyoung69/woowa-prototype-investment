import { getEmotionTag } from "@/data/concepts";

export function ConceptPopover({ tagId }: { tagId: string }) {
  const tag = getEmotionTag(tagId);
  if (!tag) return null;

  return (
    <div className="rounded-lg border border-accent/40 bg-accent/10 p-3 text-xs leading-5">
      <span className="font-semibold text-accent">{tag.label}</span>
      <span className="text-muted"> · {tag.description}</span>
    </div>
  );
}
