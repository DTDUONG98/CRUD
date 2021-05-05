import { useState } from "react";
import { AiOutlineLogin, AiOutlineSetting } from "react-icons/ai";
import { FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [showBox, setShowBox] = useState(false);
  return (
    <nav className="flex justify-between h-20 w-11/12">
      <form className="flex items-center ml-3">
        <input className="outline-none text-lg bg-transparent" />
      </form>
      <div
        onBlur={() => setShowBox(false)}
        className="flex w-40 items-center justify-around relative "
      >
        <div className="relative">
          <div>
            <img
              className=" w-11"
              src="https://cdn.icon-icons.com/icons2/582/PNG/512/man-2_icon-icons.com_55041.png"
              alt=""
            />
          </div>
          <span className="absolute bottom-0 right-0 border-white border-solid border-2 w-3 h-3 bg-green-500 rounded-full"></span>
        </div>
        <div>
          <p>DO DUONG</p>
        </div>
        <button onClick={() => setShowBox(!showBox)} style={{ outline: "none" }}>
          <FaCaretDown className="text-gray-500 text-xl" />
        </button>
        {showBox ? (
          <div className="flex absolute right-0 -top-12 rounded-md ">
            <div className="my-32">
              <div className="" />
              <div className="absolute right-0 w-32 rounded-md shadow-lg z-20">
                <Link
                  to="/"
                  className="flex items-center justify-start px-5 py-2 text-sm rounded-md pxcapitalize text-gray-700 hover:bg-indigo-600 hover:text-white"
                >
                  <AiOutlineSetting className="text-lg mr-2" />
                  <p className="font-medium">Settings</p>
                </Link>
                <Link
                  to="/"
                  className="flex items-center mt-1 px-5 py-2 text-sm capitalize rounded-md text-gray-700 hover:bg-indigo-600 hover:text-white"
                >
                  <AiOutlineLogin className="text-lg mr-2" />
                  <p className="font-medium">Sign Out</p>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
};
