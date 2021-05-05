import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsPlus } from "react-icons/bs";
import { TitlePage } from '../../../components/title-page/title-page'
import MultiSelect from "react-multi-select-component";
export const FormCreateProjects = () => {

  const { handleSubmit } = useForm();

  const onSubmit = async data => {
    console.log('on Submit')
  };

  const addDisabled = (arr = []) => {
    console.log('add Disabled');
  };
  const [selectedProjectType, setSelectedProjectType] = useState([]);
  const [selectedProjectStatus, setSelectedProjectStatus] = useState([]);
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedStaffs, setSelectedStaffs] = useState([]);
  
  

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
                className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                id="name"
                name="name"
                type="text"
                required
                placeholder="Name"
              />
            </div>
            <div className="inline-block mt-2 w-full">
              <label className="text-sm text-gray-600 mb-2" htmlFor="techStack">
                Select project type
              </label>
              <MultiSelect
                options={options}
                value={selectedProjectType}
                onChange={setSelectedProjectType}
                labelledBy={"Select"}
              />
            </div>
            <div className="inline-block mt-2 w-full">
              <label className="text-sm text-gray-600 mb-2" htmlFor="techStack">
                Select project status
              </label>
              <MultiSelect
                options={options}
                value={selectedProjectStatus}
                onChange={setSelectedProjectStatus}
                labelledBy={"Select"}
              />
            </div>
            <div className="inline-block mt-2 w-full">
              <label className="text-sm text-gray-600 mb-2" htmlFor="techStack">
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
              <label className="text-sm text-gray-600 mb-2" htmlFor="staff">
                Select departments
              </label>
              <MultiSelect
                options={options}
                value={selectedDepartment}
                onChange={setSelectedDepartment}
                labelledBy={"Select"}
              />
            </div>
            <div className="inline-block mt-2 w-full">
              <label className="text-sm text-gray-600 mb-2" htmlFor="projectType">
                Select staffs
              </label>
              <MultiSelect
                options={options}
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
