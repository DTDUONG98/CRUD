import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Alert } from 'react-st-modal';
import { useState } from "react";
import { FcAbout } from "react-icons/fc";
import { useHistory } from "react-router-dom";
import { REACT_APP_BASE_URL, TIMEOUT_REDIRECT, PROJECT_STATUS } from '../../../routers/router.type';
export const FormDetailProjectStatus = ({ dataDetails, setUpdate }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const sumbitDeleteProjectStatus = async () => {
    setLoading(true);
    const { id } = dataDetails;
    try {
      const respon = await axios.delete(`${REACT_APP_BASE_URL}project_status/${id}`);
      if (respon.status === 200) {
        setLoading(false);
        setTimeout(() => {
          history.push(PROJECT_STATUS);
          Alert("Delete Project Status Success", "Notification");
        }, TIMEOUT_REDIRECT);
      }
    }
    catch (error) {
      setLoading(false);
      await Alert("Delete Project Status Fail, try again!", "Notification");
    }
  };

  const onBack = async () => {
    history.push(PROJECT_STATUS);
  }
  return (
    <div className="w-10/12 sm:w-11/12 sm:ml-4 rounded-lg shadow-lg bg-white mt-10 ml-5">
      <div className="flex justify-between border-b border-gray-100 px-5 py-4">
        <div className="flex items-center">
          <FcAbout className="text-2xl mr-2" />
          <span className="font-bold text-gray-700 text-lg">Project Status Information</span>
        </div>
      </div>
      <div>
        <div className="px-10 py-5 text-gray-600">
          Name: <b>{dataDetails?.name}</b>
        </div>
        <div className="px-10 py-5 text-gray-600">
          Description : <b>{dataDetails?.description}</b>
        </div>
        <div className="px-10 py-5 text-gray-600">
          Status :{" "}
          {dataDetails?.status === "active" ? (
            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
              <span
                aria-hidden
                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
              ></span>
              <span className="relative">Active</span>
            </span>
          ) : (
            <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
              <span
                aria-hidden
                className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
              ></span>
              <span className="relative">Inactive</span>
            </span>
          )}
        </div>
        <div className="px-5 py-4 flex justify-end">
        <button
            onClick={onBack}
            className="border font-medium border-red-400 bg-red-400 text-white rounded-md px-3 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
          >
            <p>BACK</p>
          </button>
          <button
            onClick={sumbitDeleteProjectStatus}
            className="border font-medium border-red-400 bg-red-400 text-white rounded-md px-3 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
          >
            <p>DELETE</p>
          </button>
          <button
            onClick={() => setUpdate(true)}
            className={
              "border disabled:opacity-50 font-medium border-green-600 bg-green-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
            }
          >
            EDIT
          </button>
        </div>
      </div>
    </div>
  );
};

FormDetailProjectStatus.propTypes = {
  dataDetails: PropTypes.object.isRequired,
  setUpdate: PropTypes.func.isRequired
}
