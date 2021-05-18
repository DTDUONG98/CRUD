import { useHistory } from "react-router-dom";
import React from 'react';
import PropTypes from 'prop-types';
const RowTableDepartments = ({ number, type = null, mission, func , link }) => {
  const history = useHistory();
  const onClickRedirect = () => {
    history.push(link);
  };
  return (
    <tbody>
      <tr
        onClick={onClickRedirect}
        className=" flex w-full justify-around pt-4 pb-4 border-gray-200 hover:bg-gray-200 cursor-pointer border-b-2"
      >
        <td className=" w-1/12 text-center" data-title="STT">
          {number}
        </td>
        <td
          className="w-2/12 text-center whitespace-nowrap overflow-hidden overflow-ellipsis"
          data-title="type"
        >
          {type}
        </td>
        <td className=" w-2/12 sm:w-2/12  text-center pl-5 sm:pl-0" data-title="function">
          {func}
        </td>
        <td
          className="w-2/12 sm:hidden lg:hidden  text-center whitespace-nowrap overflow-hidden overflow-ellipsis"
          data-title="mission"
        >
          {mission}
        </td>
      </tr>
    </tbody>
  );
};
export default RowTableDepartments;

RowTableDepartments.propTypes = {
  number: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  mission: PropTypes.string.isRequired,
  func: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}
