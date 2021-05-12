import { useEffect, useState } from "react";
import { Loading } from "../../../components/loading/loading";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormEditStaff } from "./form-edit-staff";
import { FormStaffDetail } from "./form-staff-detail";

export const StaffDetailModules = () => {
  const params = useParams();

  const [update, setUpdate] = useState(false);
  const { loading } = useSelector(state => state.staffs);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {update ? (
            <FormEditStaff setUpdate={setUpdate} />
          ) : (
            <FormStaffDetail setUpdate={setUpdate} />
          )}
        </div>
      )}
    </div>
  );
};
