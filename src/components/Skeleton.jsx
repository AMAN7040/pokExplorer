export default function Skeleton() {
  return (
    <div className="bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-2xl p-4 flex flex-col items-center h-40 space-y-2">
      <div className="w-20 h-20 bg-gray-300 dark:bg-zinc-700 rounded-full" />
      <div className="w-2/3 h-4 bg-gray-300 dark:bg-zinc-700 rounded" />
      <div className="w-1/2 h-3 bg-gray-300 dark:bg-zinc-700 rounded" />
    </div>
  );
}
