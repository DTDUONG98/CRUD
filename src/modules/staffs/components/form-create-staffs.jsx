import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { BsPlus } from "react-icons/bs";
import { TitlePage } from '../../../components/title-page/title-page'
import MultiSelect from "react-multi-select-component";
import { Input } from "@material-ui/core";
export const FormCreateStaffs = () => {

    const { handleSubmit } = useForm();

    const onSubmit = async data => {
        console.log('on Submit')
    };

    const addDisabled = (arr = []) => {
        console.log('add Disabled');
    };
    
    const [selectedProject, setSelectedProject] = useState([]);
    const [selectedTechStacks, setSelectedTechStacks] = useState([]);

    const [dateOfBirth, setDateOfBirth] = useState(new Date());

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
            <TitlePage content="ADD Staff " />
            <div className="flex justify-center">
                <div className="leading-loose w-full">
                    <form
                        className=" m-4 p-10 bg-white rounded shadow-xl flex flex-wrap"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <p className="text-gray-800 font-medium mb-5 w-full">Staff information.</p>
                        <div className="w-1/2 sm:w-full pt-4 pr-4 sm:pr-0">
                            <label className="block text-sm text-gray-00 mb-2" htmlFor="name">
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
                        <div className="w-1/2 sm:w-full pt-4">
                            <label className="block text-sm text-gray-00 mb-2" htmlFor="email">
                                Phone<span className="text-red-600">*</span>
                            </label>
                            <Input
                                className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                                id="phone"
                                name="phone"
                                type="text"
                                required
                                placeholder="phone"
                            />
                        </div>
                        <div className="w-1/2 sm:w-full pt-4">
                            <label className="block text-sm text-gray-00 mb-2" htmlFor="address">
                                Date of birth
                            </label>
                            <DatePicker
                                className="bg-gray-200 px-5 py-1"
                                selected={dateOfBirth}
                                onChange={date => setDateOfBirth(date)}
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
                        <div className="ml-auto mr-auto sm:mt-4">
                            <div className="m-3">
                                <button className="bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                    <span className="mr-2">Add</span>
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
