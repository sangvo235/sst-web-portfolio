export function PostSkeleton() {
  return (
    <div className="grid grid-cols-6 gap-4 animate-pulse">
      <div className="col-start-2 col-span-4 py-2 h-12 bg-gray-300 rounded"></div>
      <div className="col-start-2 col-span-4 py-4 h-6 bg-gray-300 rounded"></div>
      <div className="col-start-2 col-span-4 relative h-96 w-full bg-gray-200 rounded" />
      <div className="col-start-2 col-span-4 py-2 h-6 bg-gray-300 rounded"></div>
      <div className="col-start-2 col-span-4 py-2 h-32 bg-gray-200 rounded"></div>
      <div className="col-start-2 col-span-4 h-8 bg-gray-300 rounded"></div>
    </div>
  );
}
