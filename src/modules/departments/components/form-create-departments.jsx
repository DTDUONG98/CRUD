import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsPlus } from "react-icons/bs";
import { TitlePage } from '../../../components/title-page/title-page'
import MultiSelect from "react-multi-select-component";
export const FormCreateDepartments = () => {

  const { handleSubmit } = useForm();

  const onSubmit = async data => {
    console.log('on Submit')
  };

  const addDisabled = (arr = []) => {
    console.log('add Disabled');
  };

  const [selectedStaffs, setSelectedStaffs] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);

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
      <TitlePage content="ADD Department " />
      <div className="flex justify-center">
        <div className="leading-loose w-6/12 sm: w-full">
          <form className=" m-4 p-10 bg-white rounded shadow-xl" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-gray-800 font-medium mb-5">Departments information.</p>
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
            <div className="mt-4">
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
              <label className="text-sm text-gray-600 mb-2" htmlFor="projectType">
                Select projects
              </label>
              <MultiSelect
                options={options}
                value={selectedProject}
                onChange={setSelectedProject}
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
