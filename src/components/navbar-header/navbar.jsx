import { AiOutlineLogin } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import React from 'react';
export const Navbar = () => {
  const history = useHistory();
  return (
    <nav className="flex justify-between h-20 w-11/12">
      <form className="flex items-center ml-3">
        <input className="outline-none text-lg bg-transparent" />
      </form>
      <div
        className="flex w-50 items-center justify-around relative "
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
        <div className="pl-2">
          <p>DO DUONG</p>
        </div>
        <button onClick={() => {history.push('/')}}>
          <AiOutlineLogin className="text-gray-500 text-3xl pl-2" />
        </button>
      </div>
    </nav>
  );
};
