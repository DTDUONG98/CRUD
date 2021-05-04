import { useHistory } from "react-router-dom";

const RowTableProjectType = ({ number, type = null, description, priority, status, link }) => {
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
          {description}
        </td>
        <td className=" w-1/12 sm:w-2/12  text-center pl-5 sm:pl-0" data-title="Priority">
          {priority}
        </td>
        <td className="  w-1/12 lg:w-2/12  sm:w-2/12 text-center" data-title="Status">
          {status === "active" ? (
            <span className="relative inline-block px-3 py-1 sm:px-2 font-semibold text-green-900 leading-tight">
              <span
                aria-hidden
                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
              ></span>
              <span className="relative">Active</span>
            </span>
          ) : (
            <span className="relative sm:px-0 inline-block px-2 py-1 font-semibold text-red-900 leading-tight">
              <span
                aria-hidden
                className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
              ></span>
              <span className="relative">Inactive</span>
            </span>
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default RowTableProjectType;
