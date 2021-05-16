import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { BsPlus } from "react-icons/bs";
import { TitlePage } from '../../../components/title-page/title-page'
import MultiSelect from "react-multi-select-component";
import { useHistory } from "react-router-dom";
import axios from "axios";
import _ from 'lodash';
import moment from 'moment';
import { REACT_APP_BASE_URL, STAFFS, TIMEOUT_REDIRECT } from '../../../routers/router.type';
export const FormCreateStaffs = () => {

    const history = useHistory();
    const { register: dataForm, handleSubmit } = useForm();

    const [loading, setLoading] = useState(false);
    const [dataDepartment, setDataDepartment] = useState([]);
    const [dataTechStack, setDataTechStack] = useState([]);

    const [selectedDepartment, setSelectedDepartment] = useState([]);
    const [selectTechStack, setSelectTechStack] = useState([]);
    const [dateOfBirth, setDateOfBirth] = useState(new Date());

    const getDataDepartment = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${REACT_APP_BASE_URL}departments`)
            const {data} = _.get(response, 'data.data', []);
            setDataDepartment(data)
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }
    const getDataTechStack = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${REACT_APP_BASE_URL}tech_stacks`)
            const {data} = _.get(response, 'data.data', []);
            setDataTechStack(data)
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const addDisabled = (arr = []) => {
        return arr.map(item => {
          return { label: item.name, value: item.id };
        });
    };

    const onAddDisabled = (arr = []) => {
        return arr.map(item => {
            if (item.status === "inactive") {
              return { label: item.name, value: item.id, disabled: true };
            }
            return { label: item.name, value: item.id };
          });
    };


    const onSubmit = async data => {
        setLoading(true);
        data.deparmentId = null
        data.techIds = []
        data.birth = moment(dateOfBirth).format('DD/MM/YYYY')
        selectedDepartment.map(item => {
            data.deparmentId = item.value
        })
        selectTechStack.map(item => {
            data.techIds.push(item.value)
        })
        console.log('dataNewStaff', data)
        try {
            const response = await axios.post(`${REACT_APP_BASE_URL}staffs`, data)
            if(response.status == 200){
                setLoading(false);
                setTimeout(() => {
                  history.push(STAFFS);
                }, TIMEOUT_REDIRECT);
              }
        } catch (error) {
            setLoading(false)
        }
    };


    useEffect(() => {
        getDataDepartment();
        getDataTechStack();
    },[])

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
                        <div className="w-1/2 sm:w-full pt-4">
                            <label className="block text-sm text-gray-00 mb-2" htmlFor="phone">
                                Phone<span className="text-red-600">*</span>
                            </label>
                            <input
                                {...dataForm("tel", {
                                    required: "Required",
                                })}
                                className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                                id="tel"
                                name="tel"
                                type="number"
                                required
                                placeholder="phone"
                            />
                        </div>
                        <div className="w-1/2 sm:w-full pt-4">
                            <label className="block text-sm text-gray-00 mb-2" htmlFor="birth">
                                Date of birth
                            </label>
                            <DatePicker
                                className="bg-gray-200 px-5 py-1"
                                selected={dateOfBirth}
                                onChange={date => setDateOfBirth(date)}
                            />
                        </div>
                        <div className="inline-block mt-2 w-full">
                            <label className="text-sm text-gray-600 mb-2" htmlFor="deparmentId">
                                Select Department
                            </label>
                            <MultiSelect
                                options={addDisabled(dataDepartment)}
                                value={selectedDepartment}
                                onChange={setSelectedDepartment}
                                labelledBy={"Select"}
                            />
                        </div>
                        <div className="inline-block mt-2 w-full">
                            <label className="text-sm text-gray-600 mb-2" htmlFor="techIds">
                                Select Tech Stack
                            </label>
                            <MultiSelect
                                options={onAddDisabled(dataTechStack)}
                                value={selectTechStack}
                                onChange={setSelectTechStack}
                                labelledBy={"Select"}
                            />
                        </div>
                        <div className="ml-auto mr-auto sm:mt-4 pt-4">
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
