export default function AdminLoading() {
  return (
    <div>
      <div className="mb-1 h-3 w-16 animate-pulse rounded-sm bg-stone-200" />
      <div className="mb-8 h-8 w-48 animate-pulse rounded-sm bg-stone-200" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse border border-stone-200 bg-stone-50" />
        ))}
      </div>
    </div>
  );
}
