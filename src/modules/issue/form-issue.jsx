import React, { useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { BoardTrello } from '../../components/board-trello/board-trello';
import { Alert } from 'react-st-modal';
import { REACT_APP_BASE_URL } from '../../routers/router.type';
import { Loading } from '../../components/loading/loading';
export const FormReportProjectIssue = () => {
    const [loading, setLoading] = useState(false);
    const [dataStart, setDataStart] = useState([])
    const [dataDoing, setDataDoing] = useState([])
    const [dataExprired, setDataExprired] = useState([])
    const [dataComplete, setDataComplete] = useState([])
    const [dataLose, setDataLose] = useState([])
    const [input, setInput] = useState(0);
    const { register: dataForm, handleSubmit } = useForm();
    const onSubmit = async input => {
      setLoading(true)
      const dataStart = []
      const dataDoing = []
      const dataExprired = []
      const dataComplete = []
      const dataLose = []
      try {
        const projects = await axios.get(`${REACT_APP_BASE_URL}projects/${input.projectId}`);
        const projectDetail = _.get(projects, 'data.data.projectStatus.name', {})
        if(projectDetail == "doing" || projectDetail == "complete" || projectDetail == "fail"){
          const response = await axios.get(`${REACT_APP_BASE_URL}projects/${input.projectId}/issues`)
          const {data} = _.get(response, 'data.data', [])
          data.map((item, index) => {
            if(item.status == "start"){
              dataStart.push({
                id: index,
                title: item.name,
                description: item.description,
                data: item
              })
            }
            if(item.status == "doing"){
              dataDoing.push({
                id: index,
                title: item.name,
                description: item.description,
                data: item
              })
            }
            if(item.status == "exprired"){
              dataExprired.push({
                id: index,
                title: item.name,
                description: item.description,
                data: item
              })
            }
            if(item.status == "complete"){
              dataComplete.push({
                id: index,
                title: item.name,
                description: item.description,
                data: item
              })
            }
            if(item.status == "lose"){
              dataLose.push({
                id: index,
                title: item.name,
                description: item.description,
                data: item
              })
            }
          })
          setDataStart(dataStart)
          setDataDoing(dataDoing)
          setDataExprired(dataExprired)
          setDataComplete(dataComplete)
          setDataLose(dataLose)
          setInput(input.projectId)
          setLoading(false)
        }else{
          Alert("Project có thể chưa được start", "Notification")
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    return (
        <div className="mt-10">
        <div className="flex justify-center">
        <div className="leading-loose w-full ">
        <form className=" m-4 p-10 bg-white rounded shadow-xl flex flex-wrap" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-gray-800 font-medium mb-5 w-full">Report project tech follow time</p>
            <div className="w-1/2 sm:w-full pt-4 pr-4 sm:pr-0">
              <label className="block text-sm text-gray-600 mb-2" htmlFor="projectId">
                Project Id<span className="text-red-600">*</span>
              </label>
              <input
                {...dataForm("projectId", {
                  required: "Required",
                })}
                className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                id="projectId"
                name="projectId"
                type="text"
                required
                placeholder="projectId"
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
            </div>
          </form>
          {loading ? (
                  <Loading />
              ) : (
              <div className="inline-block mt-2 w-full">
                <BoardTrello 
                  dataStart={dataStart}
                  dataDoing={dataDoing}
                  dataExprired={dataExprired}
                  dataComplete={dataComplete}
                  dataLose={dataLose}
                  setLoading={setLoading}
                  input={input}
                /> 
              </div>
              )}
        </div>
      </div>
        </div>
    );
};