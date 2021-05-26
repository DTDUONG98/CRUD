import React, { useEffect } from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { FormChart } from '../../components/chart/chart'
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { REACT_APP_BASE_URL } from '../../routers/router.type';
import { Loading } from '../../components/loading/loading';
import { Alert } from 'react-st-modal';
export const FormReportProjectStatus = () => {
  const [loading, setLoading] = useState(false);
  const [ListReports, setListReports] = useState([]);
  const [categories, setCategories] = useState([]);
  const [listTech, setListTech] = useState([]);
  const [display, setDisplay] = useState(true)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date())
  const { register: dataForm, handleSubmit } = useForm();
  const getTechStack = async () => {
    const listTechName = []
    try {
      const response = await axios.get(`${REACT_APP_BASE_URL}tech_stacks`)
      const {data} = _.get(response, 'data.data', [])
      data.map((item) => {
        if(item.status == 'active'){
          listTechName.push(item.name)
        }
      })
      setListTech(listTechName)
    } catch (error) {
      console.log(error)
    }
  }
  const onSubmit = async dataTime => {
    const techStacks = []
    const res = {}
    const techName = []
    const DataChart = []
    const dataCategory = []
    setLoading(true);
    if(startDate > endDate){
      Alert("StartDate phải nhỏ hơn EndDate, try again!", "Notification")
    }else {
      try {
        const response = await axios.post(`${REACT_APP_BASE_URL}reports/projects`, {
            startDate: moment(startDate).format("YYYY-MM-DD"),
            endDate: moment(endDate).format("YYYY-MM-DD")
        })
        const { data } = _.get(response, 'data', []);
        if(data.length !== 0){
          data.map((item) => {
            techStacks.push(item.tech_stacks)
          })
          techStacks.map((item) => {
            techName.push(item.name)
          })
          techName.map((item) => {
            if (dataCategory.indexOf(item) == -1) {
              dataCategory.push(item)
            }
          })
          techName.map((item) => {
            res[item] = res[item] + 1 || 1
          })
          for (const iterator in res) {
            DataChart.push(res[iterator])
          }
          setCategories(dataCategory)
          setListReports(DataChart)
          setLoading(false);
          setDisplay(false)
        }else{
          setCategories(listTech);
          setLoading(false);
          setDisplay(false)
        }
      } catch (error) {
        console.log('error', error);
        setLoading(false);
      }
    }
  }
  useEffect(() =>{
    getTechStack();
  },[])
  return (
    <div className="mt-10">
      <div className="flex justify-center">
        <div className="leading-loose w-full">
          <form className=" m-4 p-10 bg-white rounded shadow-xl flex flex-wrap" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-gray-800 font-medium mb-5 w-full">Report project tech follow time</p>
            <div className="w-1/2 sm:w-full pt-4 pr-4 sm:pr-0">
              <label className="block text-sm text-gray-600 mb-2" htmlFor="startDate">
                Start Date<span className="text-red-600">*</span>
              </label>
              <DatePicker
                className="bg-gray-200 px-5 py-1"
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </div>
            <div className="w-1/2 sm:w-full pt-4 pr-4 sm:pr-0">
              <label className="block text-sm text-gray-600 mb-2" htmlFor="endDate">
                End Date<span className="text-red-600">*</span>
              </label>
              <DatePicker
                className="bg-gray-200 px-5 py-1"
                selected={endDate}
                onChange={date => setEndDate(date)}
              />
            </div>
            <div className="ml-auto mr-auto sm:mt-4 pt-8 ">
              <div className="m-3">
                <button
                  style={{ outline: "none" }}
                  className="bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 flex items-center"
                >
                  <span className="mr-1">SEARCH</span>
                  <FaSearch className="text-xl font-bold " />
                </button>
              </div>
              <div hidden={display}>
                {loading ? (
                  <Loading />
                ) : (
                  <div className="inline-block mt-2 w-full">
                    <FormChart
                      dataChart={ListReports}
                      categories={categories}
                    />
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};