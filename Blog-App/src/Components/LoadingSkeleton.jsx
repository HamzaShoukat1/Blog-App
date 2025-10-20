function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-8">
    
      {Array.from({length:8}).map((_,index)=>(
         <div key={index} className="p-3 h-40 w-60  rounded-md animate-pulse mt-10 bg-gray-600">
          <div className="h-30 bg-gray-500 rounded mb-2"></div> 
          <div className="h-4 bg-gray-400 rounded mb-1"></div>   
        </div>
        
      ))}
    </div>
  );
}
export default LoadingSkeleton


  