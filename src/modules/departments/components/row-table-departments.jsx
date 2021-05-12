import { useHistory } from "react-router-dom";

const RowTableDepartments = ({ number, type = null, mission, techStack, projects , staffs , link }) => {
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
          className="w-2/12 text-left whitespace-nowrap overflow-hidden overflow-ellipsis"
          data-title="type"
        >
          {type}
        </td>
        <td
          className="w-2/12 sm:hidden lg:hidden  text-left whitespace-nowrap overflow-hidden overflow-ellipsis"
          data-title="Description"
        >
          {mission}
        </td>
        <td className=" w-1/12 sm:w-2/12  text-center pl-5 sm:pl-0" data-title="Priority">
          {/* {techStack} */}
          tech stack
        </td>
        <td className=" w-1/12 sm:w-2/12  text-center pl-5 sm:pl-0" data-title="Priority">
          {/* {projects} */}
          project
        </td>
        <td className=" w-1/12 sm:w-2/12  text-center pl-5 sm:pl-0" data-title="Priority">
          {/* {staffs} */}
          staff
        </td>
      </tr>
    </tbody>
  );
};

export default RowTableDepartments;
