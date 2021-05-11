import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormDetailProjectType } from "./form-detai-project-type";
import { Loading } from '../../../components/loading/loading';
import { FormEditProjectType } from "./form-edit-project-type";
import axios from 'axios';
import _ from 'lodash';
import { REACT_APP_BASE_URL } from '../../../routers/router.type';
export const DetailsProjectType = () => {
  const [detailsProjectType, setDataDetailsProjectType] = useState([]);
  const [editStatus, setEditStatus] = useState(false);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    const getDataDetailsProjectType = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${REACT_APP_BASE_URL}project_types/${params.id}`)
          const {data} = _.get(response,'data', []);
          console.log('data', data);
          setDataDetailsProjectType(data)
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
    };
    getDataDetailsProjectType();
  }, [update]);

  return (
    <div>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {editStatus ? (
              <FormEditProjectType
                setUpdate={setUpdate}
                dataDetails={detailsProjectType}
                setEdit={setEditStatus}
                update={update}
              />
            ) : (
              <FormDetailProjectType setUpdate={setEditStatus} dataDetails={detailsProjectType} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
