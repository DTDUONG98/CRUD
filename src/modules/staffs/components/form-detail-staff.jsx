import React from 'react';
import { useState } from "react";
import { FcAbout } from "react-icons/fc";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types';
import { REACT_APP_BASE_URL, TIMEOUT_REDIRECT, STAFFS } from '../../../routers/router.type';
import moment from "moment";

export const FormDetailStaffs = ({ dataDetails, setUpdate }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const sumbitDeleteStaffs = async () => {
    setLoading(true);
    const {id} = dataDetails;
    try {
      const response = await axios.delete(`${REACT_APP_BASE_URL}staffs/${id}`)
      if (response.status === 200) {
        setLoading(false);
        setTimeout(() => {
          history.push(STAFFS);
        }, TIMEOUT_REDIRECT);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const onBack = async () => {
    history.push(STAFFS);
  }
  return (
    <div className="w-10/12 sm:w-11/12 sm:ml-4 rounded-lg shadow-lg bg-white mt-10 ml-5">
      <div className="flex justify-between border-b border-gray-100 px-5 py-4">
        <div className="flex items-center">
          <FcAbout className="text-2xl mr-2" />
          <span className="font-bold text-gray-700 text-lg">Staffs Information</span>
        </div>
      </div>
      <div>
        <div className="px-10 py-5 text-gray-600">
          Name: <b>{dataDetails?.name}</b>
        </div>
        <div className="px-10 py-5 text-gray-600">
          birthday : <span className="text-xl ml-2">{moment(dataDetails?.birth).format('DD/MM/YYYY')}</span>
        </div>
        <div className="px-10 py-5 text-gray-600">
          phone : <span className="text-xl ml-2">{dataDetails?.tel}</span>
        </div>
        <div className="px-10 py-5 text-gray-600">
        <p>Tech:</p> 
            <ul className="max-h-48 overflow-x-hidden mt-2">
                {dataDetails?.techs && dataDetails?.techs.map(techStack => (
                <Link
                    to={"/category/tech-stack/" + techStack.id}
                    key={techStack.id}
                    className="flex justify-start mt-4 cursor-pointer text-gray-700
                    hover:text-gray-500 hover:bg-gray-100 rounded-md py-2 my-2"
                >
                    <span className="bg-green-500 h-2 w-2 m-2 rounded-full"></span>
                    <span className="font-medium px-2">{techStack.name}</span>
                </Link>
                ))}
            </ul>
        </div>
        <div className="px-10 py-5 text-gray-600">
        <p>Project:</p> 
            <ul className="max-h-48 overflow-x-hidden mt-2">
                {dataDetails?.projects && dataDetails?.projects.map(projects => (
                <Link
                    to={"/manager/projects/" + projects.id}
                    key={projects.id}
                    className="flex justify-start mt-4 cursor-pointer text-gray-700
                    hover:text-gray-500 hover:bg-gray-100 rounded-md py-2 my-2"
                >
                    <span className="bg-green-500 h-2 w-2 m-2 rounded-full"></span>
                    <span className="font-medium px-2">{projects.name}</span>
                </Link>
                ))}
            </ul>
        </div>
        <div className="px-5 py-4 flex justify-end">
          <button
            onClick={onBack}
            className="border font-medium border-red-400 bg-red-400 text-white rounded-md px-3 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
          >
            <p>BACK</p>
          </button>
          <button
            onClick={sumbitDeleteStaffs}
            className="border font-medium border-red-400 bg-red-400 text-white rounded-md px-3 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
          >
            <p>DELETE</p>
          </button>
          <button
            onClick={() => setUpdate(true)}
            className="border font-medium border-green-600 bg-green-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
          >
            EDIT
          </button>
        </div>
      </div>
    </div>
  );
};

FormDetailStaffs.propTypes = {
  dataDetails: PropTypes.object.isRequired,
  setUpdate: PropTypes.func.isRequired
}