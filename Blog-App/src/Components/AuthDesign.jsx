import { Outlet } from "react-router-dom";

 export  function AuthDesign() {
  return (
    <div className=" overflow-hidden  h-screen flex items-center justify-center  bg-gradient-to-b from-gray-200 to-gray-800">
      <Outlet />
    </div>
  );
}
