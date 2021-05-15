import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsPlus } from "react-icons/bs";
import { TitlePage } from '../../../components/title-page/title-page'
import MultiSelect from "react-multi-select-component";
export const FormEditDepartments = ({ dataDetails, setUpdate, setEdit, update }) => {

  const { register: dataForm, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async data => {
    console.log('on Submit')
  };

  const addDisabled = (arr = []) => {
    console.log('add Disabled');
  };

  const [selectedStaffs, setSelectedStaffs] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);

  const getDataStaff = async () => {
    setLoading(true);
  }

  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry", disabled: true },
    { label: "Watermelon 🍉", value: "watermelon" },
    { label: "Pear 🍐", value: "pear" },
    { label: "Apple 🍎", value: "apple" },
    { label: "Tangerine 🍊", value: "tangerine" },
    { label: "Pineapple 🍍", value: "pineapple" },
    { label: "Peach 🍑", value: "peach" },
  ];

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
              options={options}
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
              options={options}
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
              options={options}
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
