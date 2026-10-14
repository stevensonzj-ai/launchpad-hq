const DEFAULT_VISIBLE = 4;

export function TruncatedValue({
  text,
  visibleCount = DEFAULT_VISIBLE,
}: {
  text: string;
  visibleCount?: number;
}) {
  const parts = text
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length <= visibleCount) {
    return <>{text}</>;
  }

  const visible = parts.slice(0, visibleCount).join(", ");
  const rest = parts.slice(visibleCount).join(", ");

  return (
    <>
      {visible}
      <details className="mt-1">
        <summary className="cursor-pointer text-xs font-medium text-orange-400 hover:text-orange-300">
          more
        </summary>
        <p className="mt-1 text-sm text-gray-300">{rest}</p>
      </details>
    </>
  );
}
