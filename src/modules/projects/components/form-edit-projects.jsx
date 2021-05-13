import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiChevronDown } from "react-icons/bi";
import { REACT_APP_BASE_URL, TIMEOUT_REDIRECT } from '../../../routers/router.type';
export const FormEditProjects = ({ dataDetails, setUpdate, setEdit, update }) => {
  const { register: dataForm, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const handeleOnSubmitUpdate = async dataProjects => {
    setLoading(true);
    const {id} = dataDetails;
    try {
        const respon = await axios.put(`${REACT_APP_BASE_URL}projects/${id}`, dataProjects);
        if (respon.status === 200) {
            setLoading(false);
            setTimeout(() => {
              setEdit(false);
              setUpdate(!update);
            }, TIMEOUT_REDIRECT);
          }
        setLoading(false);
    } catch (error) {
        setLoading(false);
    }
  };
  return (
    <div className="w-10/12 sm:w-11/12 sm:ml-4 rounded-lg shadow-lg bg-white mt-10 ml-5">
      <div className="flex justify-between border-b border-gray-100  py-4">
        <form onSubmit={handleSubmit(handeleOnSubmitUpdate)} className="w-full">
          <div className="px-10">
            <div className="mt-8 mb-3">
              <div className="pb-6 md:pb-0 flex flex-col">
                <label htmlFor="name" className="input-label text-base mb-2">
                  Name
                </label>
                <div>
                  <label className="input-field sm:w-full lg:w-full inline-flex w-3/4 items-baseline border-none bg-white ">
                    <div className="flex-1 leading-none h-full">
                      <input
                        {...dataForm("name", {
                            required: "Required",
                          })}
                        id="handle"
                        defaultValue={dataDetails?.name}
                        type="text"
                        className=" w-full py-3 px-5 outline-none  text-gray-700 focus:shadow-lg border-gray-400 border rounded"
                        name="name"
                        placeholder="Jane"
                      />
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className=" py-4 flex justify-end sm:mt-5 mt-10">
              <button
                onClick={() => setEdit(false)}
                className="border font-medium border-red-400 bg-red-400 text-white rounded-md px-3 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
              >
                CANCEL
              </button>
              <button
                type="sumbit"
                className="border font-medium border-green-700 bg-green-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
              >
                <p>UPDATE</p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
