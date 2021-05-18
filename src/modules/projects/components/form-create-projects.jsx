import React from 'react';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsPlus } from "react-icons/bs";
import { TitlePage } from '../../../components/title-page/title-page'
import MultiSelect from "react-multi-select-component";
import { useHistory } from "react-router-dom";
import axios from "axios";
import _ from 'lodash';
import { REACT_APP_BASE_URL, TIMEOUT_REDIRECT, PROJECTS } from '../../../routers/router.type';
export const FormCreateProjects = () => {

  const history = useHistory();
  const { register: dataForm, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const addDisabled = (arr = []) => {
    return arr.map(item => {
      if (item.status === "inactive") {
        return { label: item.name, value: item.id, disabled: true };
      }
      return { label: item.name, value: item.id };
    });
  };

  const changeArr = (arr = []) => {
    return arr.map(item => {
      return { label: item.name, value: item.id };
    });
};

  const onSubmit = async data => {
    setLoading(true);
    data.deparmentId = null
    data.statusId = null
    data.typeId = null
    data.techIds = []
    data.staffIds = []
    selectedDepartment.map((item) =>{
      data.deparmentId = item.value
    })
    selectedProjectStatus.map((item) =>{
      data.statusId = item.value
    })
    selectedProjectType.map((item) =>{
      data.typeId = item.value
    })
    selectedStaffs.map((item) =>{
      data.staffIds.push(item.value)
    })
    selectedTechStacks.map((item) =>{
      data.techIds.push(item.value)
    })
    console.log('dataNewStaff', data)
    try {
        const response = await axios.post(`${REACT_APP_BASE_URL}projects`, data)
        if(response.status == 200){
            setLoading(false);
            setTimeout(() => {
              history.push(PROJECTS);
            }, TIMEOUT_REDIRECT);
          }
    } catch (error) {
        setLoading(false)
    }
  };
  const [selectedProjectType, setSelectedProjectType] = useState([]);
  const [selectedProjectStatus, setSelectedProjectStatus] = useState([]);
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedStaffs, setSelectedStaffs] = useState([]);

  const [ProjectType, setProjectType] = useState([]);
  const [ProjectStatus, setProjectStatus] = useState([]);
  const [TechStacks, setTechStacks] = useState([]);
  const [Department, setDepartment] = useState([]);
  const [Staffs, setStaffs] = useState([]);
  
  const getProjectType = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`${REACT_APP_BASE_URL}project_types`)
        const {data} = _.get(response, 'data.data', []);
        setProjectType(data)
        setLoading(false);
    } catch (error) {
        setLoading(true);
    }
  }
  const getProjectStatus = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`${REACT_APP_BASE_URL}project_status`)
        const {data} = _.get(response, 'data.data', []);
        setProjectStatus(data)
        setLoading(false);
    } catch (error) {
        setLoading(true);
    }
  }
  const getTechStack = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`${REACT_APP_BASE_URL}tech_stacks`)
        const {data} = _.get(response, 'data.data', []);
        setTechStacks(data)
        setLoading(false);
    } catch (error) {
        setLoading(true);
    }
  }
  const getDepartments = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`${REACT_APP_BASE_URL}departments`)
        const {data} = _.get(response, 'data.data', []);
        setDepartment(data)
        setLoading(false);
    } catch (error) {
        setLoading(true);
    }
  }
  const getStaffs = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`${REACT_APP_BASE_URL}staffs`)
        const {data} = _.get(response, 'data.data', []);
        setStaffs(data)
        setLoading(false);
    } catch (error) {
        setLoading(true);
    }
  }

  useEffect(() => {
    getProjectType()
    getProjectStatus()
    getTechStack()
    getDepartments()
    getStaffs()
  },[])

  return (
    <div className="mt-10">
      <TitlePage content="ADD Project " />
      <div className="flex justify-center">
        <div className="leading-loose w-6/12 sm: w-full">
          <form className=" m-4 p-10 bg-white rounded shadow-xl" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-gray-800 font-medium mb-5">Project information.</p>
            <div>
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
            <div className="inline-block mt-2 w-full">
              <label className="text-sm text-gray-600 mb-2" htmlFor="typeId">
                Select project type
              </label>
              <MultiSelect
                options={addDisabled(ProjectType)}
                value={selectedProjectType}
                onChange={setSelectedProjectType}
                labelledBy={"Select"}
              />
            </div>
            <div className="inline-block mt-2 w-full">
              <label className="text-sm text-gray-600 mb-2" htmlFor="statusId">
                Select project status
              </label>
              <MultiSelect
                options={addDisabled(ProjectStatus)}
                value={selectedProjectStatus}
                onChange={setSelectedProjectStatus}
                labelledBy={"Select"}
              />
            </div>
            <div className="inline-block mt-2 w-full">
              <label className="text-sm text-gray-600 mb-2" htmlFor="techIds">
                Select tech stacks
              </label>
              <MultiSelect
                options={addDisabled(TechStacks)}
                value={selectedTechStacks}
                onChange={setSelectedTechStacks}
                labelledBy={"Select"}
              />
            </div>
            <div className="inline-block mt-2 w-full">
              <label className="text-sm text-gray-600 mb-2" htmlFor="deparmentId">
                Select departments
              </label>
              <MultiSelect
                options={changeArr(Department)}
                value={selectedDepartment}
                onChange={setSelectedDepartment}
                labelledBy={"Select"}
              />
            </div>
            <div className="inline-block mt-2 w-full">
              <label className="text-sm text-gray-600 mb-2" htmlFor="staffIds">
                Select staffs
              </label>
              <MultiSelect
                options={changeArr(Staffs)}
                value={selectedStaffs}
                onChange={setSelectedStaffs}
                labelledBy={"Select"}
              />
            </div>
            <div className="flex items-center justify-center mt-6">
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
