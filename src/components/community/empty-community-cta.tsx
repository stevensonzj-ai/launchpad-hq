export const START_DISCUSSION_LABEL = "Start the discussion";
export const SHARE_FIRST_PROMPT_LABEL = "Share the first prompt";

/**
 * Compact stand-in for an empty discussions or prompts tab. Opening it reveals
 * the existing sign-in prompt or post form; it is not a link to the path URL.
 */
export function EmptyCommunityCta({
  label,
  onOpen,
}: {
  label: string;
  onOpen: () => void;
}) {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 px-4 py-3">
      <button
        type="button"
        onClick={onOpen}
        className="text-sm font-medium text-orange-400 hover:text-orange-300 hover:underline"
      >
        {label}
      </button>
    </div>
  );
}
