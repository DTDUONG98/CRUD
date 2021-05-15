import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormDetailDepartment } from "./form-detail-department";
import { Loading } from '../../../components/loading/loading';
import { FormEditDepartments } from "./form-edit-department";
import axios from 'axios';
import _ from 'lodash';
import { REACT_APP_BASE_URL } from '../../../routers/router.type';
export const DetailsDepartment = () => {
  const [detailsDepartment, setDataDetailsDepartment] = useState([]);
  const [editStatus, setEditStatus] = useState(false);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    const getDataDetailsProjects = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${REACT_APP_BASE_URL}departments/${params.id}`)
          const {data} = _.get(response,'data', []);
          console.log('data department', data)
          setDataDetailsDepartment(data)
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
    };
    getDataDetailsProjects();
  }, [update]);

  return (
    <div>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {editStatus ? (
              <FormEditDepartments
                setUpdate={setUpdate}
                dataDetails={detailsDepartment}
                setEdit={setEditStatus}
                update={update}
              />
            ) : (
              <FormDetailDepartment setUpdate={setEditStatus} dataDetails={detailsDepartment} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
