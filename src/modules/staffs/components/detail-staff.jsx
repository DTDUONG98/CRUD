import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormDetailStaffs } from "./form-detail-staff";
import { Loading } from '../../../components/loading/loading';
import { FormEditStaffs } from "./form-edit-staff";
import axios from 'axios';
import _ from 'lodash';
import { REACT_APP_BASE_URL } from '../../../routers/router.type';
export const DetailsStaffs = () => {
  const [detailsStaffs, setDataDetailsStaffs] = useState([]);
  const [editStatus, setEditStatus] = useState(false);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    const getDataDetailsStaffs = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${REACT_APP_BASE_URL}staffs/${params.id}`)
          const {data} = _.get(response,'data', []);
          setDataDetailsStaffs(data)
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
    };
    getDataDetailsStaffs();
  }, [update]);

  return (
    <div>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {editStatus ? (
              <FormEditStaffs
                setUpdate={setUpdate}
                dataDetails={detailsStaffs}
                setEdit={setEditStatus}
                update={update}
              />
            ) : (
              <FormDetailStaffs setUpdate={setEditStatus} dataDetails={detailsStaffs} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
