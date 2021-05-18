import React from 'react';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsPlus } from "react-icons/bs";
import { TitlePage } from '../../../components/title-page/title-page'
import MultiSelect from "react-multi-select-component";
import axios from "axios";
import _ from 'lodash';
import PropTypes from 'prop-types';
import { REACT_APP_BASE_URL, DEPARTMENTS, TIMEOUT_REDIRECT } from '../../../routers/router.type';
export const FormEditDepartments = ({ dataDetails, setUpdate, setEdit, update }) => {
  const { register: dataForm, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [selectedStaffs, setSelectedStaffs] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const [dataTechStack, setDataTechStack] = useState([]);
  const [dataStaff, setDataStaff] = useState([]);
  const [dataProjects, setDataProjects] = useState([]);
  const onSubmit = async data => {
    setLoading(true);
    const {id} = dataDetails
    data.techIds = []
    data.staffIds = []
    data.projectIds = []
    selectedTechStacks.map((item) =>{
      data.techIds.push(item.value)
    })
    selectedStaffs.map((item) =>{
      data.staffIds.push(item.value)
    })
    selectedProject.map((item) =>{
      data.projectIds.push(item.value)
    })
    try {
      const response = await axios.put(`${REACT_APP_BASE_URL}departments/${id}`, data)
        if (response.status === 200) {
          setLoading(false);
          setTimeout(() => {
            setEdit(false);
            setUpdate(!update);
            Alert("Update Department Success", "Notification");
          }, TIMEOUT_REDIRECT);
        }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      await  Alert("Update Department Fail", "Notification");
    }
  };
  const changeArr = (arr = []) => {
    return arr.map(item => {
      return { label: item.name, value: item.id };
    });
  };
  const addDisabled = (arr = []) => {
    return arr.map(item => {
      if (item.status === "inactive") {
        return { label: item.name, value: item.id, disabled: true };
      }
      return { label: item.name, value: item.id };
    });
  };
  const dataSelectTechStack = () => {
    let dataTechs = [];
    const {tech_stacks} = dataDetails
    tech_stacks.map(element => {
      const {name} = element
      const {id} = element
      dataTechs.push({label: name, value: id})
    })
    setSelectedTechStacks(dataTechs)
  }
  const dataSelectStaffs = () => {
    let dataStaffs = [];
    const {staffs} = dataDetails
    staffs.map(element => {
      const {name} = element
      const {id} = element
      dataStaffs.push({label: name, value: id})
    })
    setSelectedStaffs(dataStaffs)
  }
  const dataSelectProjects = () => {
    let dataProjects = [];
    const {projects} = dataDetails
    projects.map(element => {
      const {name} = element
      const {id} = element
      dataProjects.push({label: name, value: id})
    })
    setSelectedProject(dataProjects)
  }
  const getDataStaff = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${REACT_APP_BASE_URL}staffs`)
      const {data} = _.get(response, 'data.data', [])
      setDataStaff(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
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
  const getDataProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${REACT_APP_BASE_URL}projects`)
      const {data} = _.get(response, 'data.data', [])
      setDataProjects(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  useEffect(() => {
    getDataStaff();
    getDataTechStack();
    getDataProjects();
    dataSelectTechStack();
    dataSelectStaffs();
    dataSelectProjects();
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
              defaultValue={dataDetails.name}
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
              defaultValue={dataDetails.functions}
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
              defaultValue={dataDetails.mission}
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
              defaultValue={dataDetails.description}
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
          <div className="inline-block mt-2 w-full">
            <label className="text-sm text-gray-600 mb-2" htmlFor="staffs">
              Select staffs
            </label>
            <MultiSelect
              options={changeArr(dataStaff)}
              value={selectedStaffs}
              onChange={setSelectedStaffs}
              labelledBy={"Select"}
            />
          </div>
          <div className="inline-block mt-2 w-full">
            <label className="text-sm text-gray-600 mb-2" htmlFor="projects">
              Select projects
            </label>
            <MultiSelect
              options={changeArr(dataProjects)}
              value={selectedProject}
              onChange={setSelectedProject}
              labelledBy={"Select"}
            />
          </div>
          <div className=" ml-auto mr-auto sm:mt-4 pt-8">
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
        </form>
      </div>
    </div>
  </div>
  );
};

FormEditDepartments.propTypes = {
  dataDetails: PropTypes.object.isRequired,
  setUpdate: PropTypes.func.isRequired,
  setEdit: PropTypes.func.isRequired,
  update: PropTypes.bool.isRequired,
}