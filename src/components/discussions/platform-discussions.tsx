type PlatformDiscussionsProps = {
  platformName: string;
};

export function PlatformDiscussions({ platformName }: PlatformDiscussionsProps) {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-8">
      <h2 className="text-lg font-semibold text-white">Discussions</h2>
      <p className="mt-1 text-sm text-gray-400">
        Community Q&amp;A for <span className="text-gray-300">{platformName}</span>
      </p>
      <p className="mt-6 rounded-md border border-dashed border-gray-700 bg-gray-950/50 px-4 py-8 text-center text-sm text-gray-500">
        Coming soon
      </p>
    </div>
  );
}
