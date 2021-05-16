import axios from "axios";
import _ from 'lodash';
import { BsPlus } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import MultiSelect from "react-multi-select-component";
import { TitlePage } from "../../../components/title-page/title-page";
import { REACT_APP_BASE_URL, TIMEOUT_REDIRECT } from '../../../routers/router.type';
export const FormEditProjects = ({ dataDetails, setUpdate, setEdit, update }) => {
  const { register: dataForm, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const [ProjectType, setProjectType] = useState([]);
  const [ProjectStatus, setProjectStatus] = useState([]);
  const [TechStacks, setTechStacks] = useState([]);
  const [Department, setDepartment] = useState([]);
  const [Staffs, setStaffs] = useState([]);

  const [selectedProjectType, setSelectedProjectType] = useState([]);
  const [selectedProjectStatus, setSelectedProjectStatus] = useState([]);
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedStaffs, setSelectedStaffs] = useState([]);

  const onSubmit = async dataProjects => {
    setLoading(true);
    const {id} = dataDetails;
    dataProjects.deparmentId = null
    dataProjects.statusId = null
    dataProjects.typeId = null
    dataProjects.techIds = []
    dataProjects.staffIds = []
    selectedDepartment.map((item) =>{
      dataProjects.deparmentId = item.value
    })
    selectedProjectStatus.map((item) =>{
      dataProjects.statusId = item.value
    })
    selectedProjectType.map((item) =>{
      dataProjects.typeId = item.value
    })
    selectedStaffs.map((item) =>{
      dataProjects.staffIds.push(item.value)
    })
    selectedTechStacks.map((item) =>{
      dataProjects.techIds.push(item.value)
    })
    console.log('dataProjects', dataProjects);
    // try {
    //     const respon = await axios.put(`${REACT_APP_BASE_URL}projects/${id}`, dataProjects);
    //     if (respon.status === 200) {
    //         setLoading(false);
    //         setTimeout(() => {
    //           setEdit(false);
    //           setUpdate(!update);
    //         }, TIMEOUT_REDIRECT);
    //       }
    //     setLoading(false);
    // } catch (error) {
    //     setLoading(false);
    // }
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

  const dataProjectType = async () => {
    let dataProjectType = [];
    const {projectType} = dataDetails
    dataProjectType.push({...projectType, label: projectType.name, value: projectType.id})
    setSelectedProjectType(dataProjectType)
  }

  const dataProjectStatus = async () => {
    let dataProjectStatus = [];
    const {projectStatus} = dataDetails
    dataProjectStatus.push({...projectStatus,label: projectStatus.name, value: projectStatus.id})
    setSelectedProjectStatus(dataProjectStatus)
  }

  const dataDepartments = async () => {
    let dataDepartment = [];
    const {department} = dataDetails
    dataDepartment.push({label: department.name, value: department.name})
    setSelectedDepartment(dataDepartment)
  }

  const dataSelectTech = () => {
    let dataTechs = [];
    const {techs} = dataDetails
    techs.map(element => {
      const {name} = element
      dataTechs.push({label: name, value: name})
    })
    setSelectedTechStacks(dataTechs)
  }

  const dataStaffs = () => {
    let dataStaffs = [];
    const {staffs} = dataDetails
    staffs.map(element => {
      const {name} = element
      const {id} = element
      dataStaffs.push({label: name, value: id})
    })
    setSelectedStaffs(dataStaffs)
  }

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
  const getDataTechStack = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`${REACT_APP_BASE_URL}tech_stacks`)
        const {data} = _.get(response,'data.data', []);
        setTechStacks(data)
        setLoading(false);
    } catch (error) {
        setLoading(true);
    }
}



useEffect(() => {
  getDataTechStack()
  getProjectType()
  getProjectStatus()
  getDepartments()
  getStaffs()
  dataProjectStatus()
  dataProjectType()
  dataDepartments()
  dataSelectTech()
  dataStaffs()
},[])
  return (
    <div className="mt-10">
    <TitlePage content="Edit Project " />
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
              defaultValue={dataDetails.name}
              required
              placeholder="Name"
            />
          </div>
          <div className="inline-block mt-2 w-full">
            <label className="text-sm text-gray-600 mb-2" htmlFor="projectType">
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
            <label className="text-sm text-gray-600 mb-2" htmlFor="projectStatus">
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
            <label className="text-sm text-gray-600 mb-2" htmlFor="techs">
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
            <label className="text-sm text-gray-600 mb-2" htmlFor="department">
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
            <label className="text-sm text-gray-600 mb-2" htmlFor="staffs">
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
