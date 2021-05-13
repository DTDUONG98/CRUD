import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormDetailProjects } from "./form-detail-project";
import { Loading } from '../../../components/loading/loading';
import { FormEditProjects } from "./form-edit-projects";
import axios from 'axios';
import _ from 'lodash';
import { REACT_APP_BASE_URL } from '../../../routers/router.type';
export const DetailsProjects = () => {
  const [detailsProjects, setDataDetailsProjects] = useState([]);
  const [editStatus, setEditStatus] = useState(false);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    const getDataDetailsProjects = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${REACT_APP_BASE_URL}projects/${params.id}`)
          const {data} = _.get(response,'data', []);
          data.department = data.department.name
          data.projectType = data.projectType.name
          data.projectStatus = data.projectStatus.name
          setDataDetailsProjects(data)
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
              <FormEditProjects
                setUpdate={setUpdate}
                dataDetails={detailsProjects}
                setEdit={setEditStatus}
                update={update}
              />
            ) : (
              <FormDetailProjects setUpdate={setEditStatus} dataDetails={detailsProjects} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
