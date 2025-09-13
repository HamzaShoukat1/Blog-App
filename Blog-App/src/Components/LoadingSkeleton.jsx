function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    
      {Array.from({length:8}).map((_,index)=>(
         <div key={index} className="p-2 mt-3  rounded-md  animate-pulse bg-gray-300">
          <div className="h-30 bg-gray-400 rounded mb-2"></div> 
          <div className="h-4 bg-gray-300 rounded mb-1"></div>   
        </div>
        
      ))}
    </div>
  );
}
export default LoadingSkeleton


  