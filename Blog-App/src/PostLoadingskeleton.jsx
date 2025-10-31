export function PostLoading() {
  return (
    <div className="flex flex-col justify-center items-center mx-auto space-y-6 p-6 transition-all duration-150 animate-pulse">
      {/* Large Image Skeleton */}
      <div className="w-full h-90 bg-gray-600 rounded-lg"></div>

     

        <div className="w-20 h-4 bg-gray-600 rounded"></div>
        <div className="w-30 h-8 bg-gray-600 rounded"></div>



    </div>
  );
}
