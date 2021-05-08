import { useRef, useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { 
  FcConferenceCall,
  FcInfo, 
  FcDepartment,
  FcBusinessman,
  FcFile,
  FcDocument,
  FcGenealogy,
  FcStatistics
} from "react-icons/fc";
import { BiMenu, BiX } from "react-icons/bi";
import { NavLink } from "react-router-dom";
export const SidebarLeft = () => {
  const refNavBar = useRef(null);
  const [background, setBackground] = useState(false);

  const handleShowSideBar = () => {
    const styleElement = refNavBar.current.classList;
    styleElement.remove("sm:-translate-x-full");
    styleElement.add("sm:translateX(0)");
    setBackground(true);
  };
  const handleHideSideBar = () => {
    const styleElement = refNavBar.current.classList;
    styleElement.add("sm:-translate-x-full");
    styleElement.remove("sm:translateX(0)");
    setBackground(false);
  };
  return (
    <div className="w-2/12 sm:w-full mt-4 lg:w-2/6 relative">
      <div className="flex justify-center">
        <div className="flex items-center w-10/12 sm:w-full sm:mr-4  sm:flex-row-reverse">
          <div>
            <img
              className="w-20 sm:w-12"
              src="https://cdn.icon-icons.com/icons2/582/PNG/512/man-2_icon-icons.com_55041.png"
              alt=""
            />
          </div>
          <div className="ml-5">
            <p className="font-bold sm:text-lg sm:pr-2 tracking-wider text-xl">DUONG.</p>
            <p className="text-gray-400 sm:hidden">Develop</p>
          </div>
        </div>
      </div>
      <div
        onBlur={handleHideSideBar}
        ref={refNavBar}
        className="flex flex-col items-center mt-10
      sm:z-20
      sm:w-4/6
       sm:fixed transform
       transition duration-500 ease-in-out sm:-translate-x-full
       sm:left-0 sm:m-0 sm:top-0 sm:h-full sm:bg-white"
      >
        <div className="w-10/12 sm:mt-16">
          <ul>
            <div className="text-gray-400 text-sm flex items-center">
              <p>CATEGORY</p>
              <p className="ml-2 text-2xl">
                <AiOutlineEllipsis />
              </p>
            </div>
            <div onClick={handleHideSideBar}>
              <NavLink
                to="/category/project-type"
                activeClassName="hover:bg-indigo-700 hover:text-pink-100 bg-indigo-700 text-white rounded-xl"
                className="flex mt-6 items-center rounded-lg hover:text-gray-900 hover:bg-gray-200  p-2 cursor-pointer "
              >
                <FcDocument className=" text-2xl " />
                <p className="text-base  ml-3">Project Type</p>
              </NavLink>
              <NavLink
                to="/category/project-status"
                activeClassName="hover:bg-indigo-700 hover:text-pink-100 bg-indigo-700 text-white rounded-xl"
                className="flex items-center mt-3 p-2 rounded-lg hover:text-gray-900 hover:bg-gray-200"
              >
                <FcInfo className=" text-2xl" />
                <p className=" text-base ml-3">Project Status</p>
              </NavLink>
              <NavLink
                to="/category/tech-stack"
                activeClassName="hover:bg-indigo-700 hover:text-pink-100 bg-indigo-700 text-white rounded-xl"
                className="flex items-center mt-3 p-2 rounded-lg hover:text-gray-900 hover:bg-gray-200"
              >
                <FcGenealogy className=" text-2xl" />
                <p className="  text-base ml-3"> Tech Stack</p>
              </NavLink>
              <NavLink
                to="/category/customer-group"
                activeClassName=" bg-indigo-700 hover:bg-indigo-700 hover:text-pink-100 text-white rounded-xl"
                className="flex items-center mt-3 p-2 rounded-lg hover:text-gray-900 hover:bg-gray-200"
              >
                <FcConferenceCall className=" text-2xl" />
                <p className="  text-base ml-3">Customer Group</p>
              </NavLink>
            </div>
          </ul>
          <button onClick={handleHideSideBar}>
            <BiX className="text-3xl hidden sm:block absolute top-5 left-40 ml-3" />
          </button>
        </div>
        <div className="w-10/12 mt-5">
          <ul>
            <div className="text-gray-400 text-sm flex items-center">
              <p>MANAGER</p>
              <p className="ml-2 text-2xl">
                <AiOutlineEllipsis />
              </p>
            </div>
            <div onClick={handleHideSideBar}>
              <NavLink
                to="/manager/departments"
                activeClassName="hover:bg-indigo-700 hover:text-pink-100 bg-indigo-700 text-white rounded-xl"
                className="flex items-center mt-3 p-2 rounded-lg hover:text-gray-900 hover:bg-gray-200"
              >
                <FcDepartment className=" text-2xl" />
                <p className="  text-base ml-3">Departments</p>
              </NavLink>
              <NavLink
                to="/manager/staffs"
                activeClassName="bg-indigo-700 text-white rounded-xl"
                className="flex items-center mt-3 p-2 rounded-lg hover:text-gray-900 hover:bg-gray-200"
              >
                <FcBusinessman className=" text-2xl" />
                <p className="  text-base ml-3">Staffs</p>
              </NavLink>
              <NavLink
                to="/manager/projects"
                activeClassName="hover:bg-indigo-700 hover:text-pink-100 bg-indigo-700 text-white rounded-xl"
                className="flex items-center mt-3 p-2 rounded-lg hover:text-gray-900 hover:bg-gray-200"
              >
                <FcFile className=" text-2xl" />
                <p className="  text-base ml-3">Projects</p>
              </NavLink>
            </div>
          </ul>
        </div>
        <div className="w-10/12 mt-5">
          <ul>
            <div className="text-gray-400 text-sm flex items-center">
              <p>REPORT</p>
              <p className="ml-2 text-2xl">
                <AiOutlineEllipsis />
              </p>
            </div>
            <div onClick={handleHideSideBar}>
              <NavLink
                to="/report/project-quantity"
                activeClassName="hover:bg-indigo-700 hover:text-pink-100 bg-indigo-700 text-white rounded-xl"
                className="flex items-center mt-3 p-2 rounded-lg hover:text-gray-900 hover:bg-gray-200"
              >
                <FcStatistics className=" text-2xl" />
                <p className="  text-base ml-3">Project Quantity</p>
              </NavLink>
              <NavLink
                to="/report/staff-quantity"
                activeClassName="bg-indigo-700 text-white rounded-xl"
                className="flex items-center mt-3 p-2 rounded-lg hover:text-gray-900 hover:bg-gray-200"
              >
                <FcStatistics className=" text-2xl" />
                <p className="  text-base ml-3">Staffs Quantity</p>
              </NavLink>
            </div>
          </ul>
        </div>
      </div>
      <button
        style={{ outline: "none", border: "none" }}
        onClick={handleShowSideBar}
        className="hidden sm:block absolute top-3 left-3 "
      >
        <BiMenu className="text-3xl " />
      </button>
      {background && (
        <div
          onClick={handleHideSideBar}
          className="fixed w-full min-h-screen top-0 z-10 opacity-50 bg-black"
        ></div>
      )}
    </div>
  );
};
