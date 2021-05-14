import { useHistory } from "react-router-dom";

const RowTableStaffs = ({ number, type = null, birthday, phone, link }) => {
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
          className="w-2/12 sm:w-2/12  text-center pl-5 sm:pl-0" data-title="type"
        >
          {type}
        </td>
        <td className=" w-1/12 sm:w-2/12  text-center pl-5 sm:pl-0" data-title="birthday">
          {birthday}
        </td>
        <td className=" w-1/12 sm:w-2/12  text-center pl-5 sm:pl-0" data-title="phone">
          {phone}
        </td>
      </tr>
    </tbody>
  );
};

export default RowTableStaffs;
