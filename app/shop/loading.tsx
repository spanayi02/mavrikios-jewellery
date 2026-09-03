export default function ShopLoading() {
  return (
    <div>
      <div className="border-b border-stone-200 py-10 text-center sm:py-14">
        <div className="mx-auto h-3 w-20 animate-pulse rounded-sm bg-stone-200" />
        <div className="mx-auto mt-3 h-8 w-56 animate-pulse rounded-sm bg-stone-200" />
      </div>
      <div className="container-mavrikios py-10 sm:py-14">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-stone-100" />
              <div className="mt-3 h-3 w-2/3 rounded-sm bg-stone-100" />
              <div className="mt-2 h-3 w-1/3 rounded-sm bg-stone-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
