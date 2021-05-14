import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import MultiSelect from "react-multi-select-component";
import _ from 'lodash';
import moment from 'moment';
import { TitlePage } from "../../../components/title-page/title-page";
import { REACT_APP_BASE_URL, TIMEOUT_REDIRECT } from '../../../routers/router.type';
export const FormEditStaffs = ({ dataDetails, setUpdate, setEdit, update }) => {
  const { register: dataForm, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  const [dataTechStack, setDataTechStack] = useState([]);
  const [dataProjects, setDataProjects] = useState([]);

  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);

  const getDataTechStack = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`${REACT_APP_BASE_URL}tech_stacks`)
        const {data} = _.get(response,'data.data', []);
        for( let i=0;i<data.length;i++){
            data[i].label = data[i].name
            data[i].value = data[i].name
        }
        setDataTechStack(data)
        setLoading(false);
    } catch (error) {
        setLoading(true);
    }
}
const getDataProject = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`${REACT_APP_BASE_URL}projects`)
        const {data} = _.get(response, 'data', []);
        for( let i=0;i<data.length;i++){
            data[i].label = data[i].name
            data[i].value = data[i].name
        }
        setDataProjects(data)
        setLoading(false);
    } catch (error) {
        setLoading(true);
    }
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
  const dataSelectPriject = () => {
    let dataProjects = [];
    const {projects} = dataDetails
    projects.map(element => {
      const {name} = element
      dataProjects.push({label: name, value: name})
    })
    setSelectedProject(dataProjects)
  }
  const onSubmit = async dataStaffs => {
    setLoading(true);
    const {id} = dataDetails;
    try {
        const respon = await axios.put(`${REACT_APP_BASE_URL}staffs/${id}`, dataStaffs);
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

  useEffect(() => {
    dataSelectTech()
    dataSelectPriject()
    getDataProject()
    getDataTechStack()
  },[])
  return (
    <div className="mt-10">
    <TitlePage content="Edit Staff " />
    <div className="flex justify-center">
      <div className="leading-loose w-full">
        <form
          className=" m-4 p-10 bg-white rounded shadow-xl flex flex-wrap"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-gray-800 font-medium mb-5 w-full">Staff information.</p>
          <div className="w-1/2 sm:w-full pt-4 pr-4 sm:pr-0">
            <label className="block text-sm text-gray-00 mb-2" htmlFor="name">
              Name
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
          <div className="w-1/2 sm:w-full pt-4">
            <label className="block text-sm text-gray-00 mb-2" htmlFor="tel">
              Phone
            </label>
            <input
                {...dataForm("tel", {
                  required: "Required",
              })}
              className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
              id="phone"
              name="tel"
              type="phone"
              defaultValue={dataDetails.tel}
              required
              placeholder="phone"
            />
          </div>
          <div className="w-full pt-4">
            <label className="block text-sm text-gray-00 mb-2" htmlFor="address">
              Date of birth
            </label>
            <DatePicker
              className="bg-gray-200 px-5 py-1"
              selected={dateOfBirth}
              onChange={date => setDateOfBirth(date)}
            />
          </div>
          <div className="w-1/2 sm:w-full pr-4 sm:pr-0">
            <div className="inline-block mt-2 w-full pr-1">
              <label className="text-sm text-gray-00 mb-2">Select tech stacks</label>
              <MultiSelect
                // isLoading={selectedTechStacks}
                options={dataTechStack}
                value={selectedTechStacks}
                onChange={setSelectedTechStacks}
                labelledBy={"Select"}
              />
            </div>
          </div>
          <div className="w-1/2 sm:w-full pr-4 sm:pr-0">
            <div className="inline-block mt-2 w-full pr-1">
              <label className="text-sm text-gray-00 mb-2">Select projects</label>
              <MultiSelect
                // isLoading={selectedProject}
                options={dataProjects}
                value={selectedProject}
                onChange={setSelectedProject}
                labelledBy={"Select"}
              />
            </div>
          </div>
          <div className=" ml-auto mr-auto sm:mt-4">
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
