import React from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiChevronDown } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { FcAbout } from "react-icons/fc";
import { useHistory } from "react-router-dom";
import { Alert } from 'react-st-modal';
import { TitlePage } from "../../../components/title-page/title-page";
import axios from 'axios';
import { REACT_APP_BASE_URL, TIMEOUT_REDIRECT, TECH_STACK } from '../../../routers/router.type';
export const FormCreateTechStack = () => {
  const [loading, setLoading] = useState(false);
  const { register: dataForm, handleSubmit } = useForm();
  const history = useHistory();
  const onSubmit = async dataNewTechStack => {
    setLoading(true);
    console.log('dataNewTechStack', dataNewTechStack)
    try {
      const response  = await axios.post(`${REACT_APP_BASE_URL}tech_stacks`,dataNewTechStack)
      if (response.status === 200) {
        setLoading(false);
        setTimeout(() => {
          history.push(TECH_STACK);
          Alert("Created Tech Stack Success", "Notification");
        }, TIMEOUT_REDIRECT);
      }
    } catch (error) {
      setLoading(false);
      await Alert("Created Teach Stack Fail, try again!", "Notification");
    }
  };
  return (
    <div>
      <div className="mt-10">
        <div className="sm:ml-5">
          <TitlePage content="Create Tech Stack " />
        </div>
        <div className="flex justify-center">
          <div className="leading-loose lg:mr-4 lg:w-full w-6/12 sm:w-11/12">
            <form
              className=" m-4 p-10 sm:m-0 sm:mt-6 sm:mb-5 bg-white rounded shadow-xl"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="text-gray-800 font-medium items-center flex mb-5">
                <FcAbout className="text-xl  mr-1" />
                <p> Tech Stack information</p>
              </div>
              <div>
                <label className="block text-sm text-gray-00 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  {...dataForm("name", {
                    required: "Required",
                  })}
                  className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-md   border-gray-400 border  rounded"
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Name"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm text-gray-600 mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  {...dataForm("description", {
                    required: "Required",
                  })}
                  className="w-full outline-none px-5 py-4   text-gray-700 focus:shadow-lg border-gray-400 border rounded"
                  id="description"
                  name="description"
                  type="text"
                  required
                  placeholder="Description"
                />
              </div>
              <div className="inline-block mt-2 w-1/2 pr-1">
                <label className="text-sm text-gray-600 mb-2" htmlFor="status">
                  Status
                </label>
                <div className="relative ">
                  <select
                    {...dataForm("status", {
                      required: "Required",
                    })}
                    className="w-full appearance-none outline-none px-3 py-3 text-gray-700 bg-gray-200 rounded"
                    id="status"
                    name="status"
                    required
                  >
                    <option className="mt-10" value="active">
                      Active
                    </option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <BiChevronDown className="absolute top-4 text-gray-500 text-2xl right-5" />
                </div>
              </div>
              <div className="flex items-center justify-center mt-6">
                <div className="m-3">
                  <button
                    style={{ outline: "none" }}
                    className="bg-white  text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 flex items-center"
                  >
                    {" "}
                      <div className="flex h-10 items-center">
                        <span className="mr-1">Add</span>
                        <BsPlus className="text-xl font-bold " />
                      </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};