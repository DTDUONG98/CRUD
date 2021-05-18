import React from 'react';
import axios from "axios";
import _ from 'lodash';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsPlus } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { TitlePage } from '../../../components/title-page/title-page'
import MultiSelect from "react-multi-select-component";
import { REACT_APP_BASE_URL, DEPARTMENTS, TIMEOUT_REDIRECT } from '../../../routers/router.type';
export const FormCreateDepartments = () => {
  const { register: dataForm, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const onSubmit = async data => {
    setLoading(true);
    data.techIds = []
    selectedTechStacks.map((item) =>{
      data.techIds.push(item.value)
    })
    try {
      const response = await axios.post(`${REACT_APP_BASE_URL}departments`, data)
      if (response.status === 200) {
        setLoading(false);
        setTimeout(() => {
          history.push(DEPARTMENTS);
          Alert("Create Department success", "Notification");
        }, TIMEOUT_REDIRECT);
      }
    } catch (error) {
      setLoading(false);
      await Alert("Create Department faild, try again!", "Notification");
    }
  };
  const addDisabled = (arr = []) => {
    return arr.map(item => {
      if (item.status === "inactive") {
        return { label: item.name, value: item.id, disabled: true };
      }
      return { label: item.name, value: item.id };
    });
  };
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const [dataTechStack, setDataTechStack] = useState([]);
  const getDataTechStack = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${REACT_APP_BASE_URL}tech_stacks`)
      const {data} = _.get(response, 'data.data', [])
      setDataTechStack(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  useEffect(() => {
    getDataTechStack()
  },[])
  return (
    <div className="mt-10">
      <TitlePage content="Edit Department " />
      <div className="flex justify-center">
        <div className="leading-loose w-full">
          <form className=" m-4 p-10 bg-white rounded shadow-xl flex flex-wrap" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-gray-800 font-medium mb-5 w-full">Departments information.</p>
            <div className="w-1/2 sm:w-full pt-4 pr-4 sm:pr-0">
              <label className="block text-sm text-gray-600 mb-2" htmlFor="name">
                Name<span className="text-red-600">*</span>
              </label>
              <input
                {...dataForm("name", {
                  required: "Required",
                })}
                className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                id="name"
                name="name"
                type="text"
                required
                placeholder="Name"
              />
            </div>
            <div className="w-1/2 sm:w-full pt-4 pr-4 sm:pr-0">
              <label className="block text-sm text-gray-600 mb-2" htmlFor="functions">
                Function<span className="text-red-600">*</span>
              </label>
              <input
                {...dataForm("functions", {
                  required: "Required",
                })}
                className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                id="functions"
                name="functions"
                type="text"
                required
                placeholder="Functions"
              />
            </div>
            <div className="w-1/2 sm:w-full pt-4 pr-4 sm:pr-0">
              <label className="block text-sm text-gray-600 mb-2" htmlFor="mission">
                Mission<span className="text-red-600">*</span>
              </label>
              <input
                {...dataForm("mission", {
                  required: "Required",
                })}
                className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                id="mission"
                name="mission"
                type="text"
                required
                placeholder="Mission"
              />
            </div>
            <div className="w-1/2 sm:w-full pt-4 pr-4 sm:pr-0">
              <label className="block text-sm text-gray-600 mb-2" htmlFor="description">
                Description<span className="text-red-600">*</span>
              </label>
              <textarea
                {...dataForm("description", {
                  required: "Required",
                })}
                className="w-full outline-none px-5  py-4 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                id="description"
                name="description"
                type="text"
                required
                placeholder="Description"
              />
            </div>
            <div className="inline-block mt-2 w-full">
              <label className="text-sm text-gray-600 mb-2" htmlFor="tech_stacks">
                Select tech stacks
              </label>
              <MultiSelect
                options={addDisabled(dataTechStack)}
                value={selectedTechStacks}
                onChange={setSelectedTechStacks}
                labelledBy={"Select"}
              />
            </div>
            <div className="ml-auto mr-auto sm:mt-4 pt-8 ">
              <div className="m-3">
                <button
                  style={{ outline: "none" }}
                  className="bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 flex items-center"
                >
                  <span className="mr-1">Add</span>
                  <BsPlus className="text-xl font-bold " />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};