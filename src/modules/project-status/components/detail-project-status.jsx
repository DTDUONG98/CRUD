import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormDetailProjectStatus } from "./form-detail-project-status";
import { Loading } from '../../../components/loading/loading';
import { FormEditProjectStatus } from "./form-edit-project-status";
import { REACT_APP_BASE_URL } from '../../../routers/router.type';
export const DetailsProjectStatus = () => {
  const [detailsProjectStatus, setDataDetailsProjectStatus] = useState({});
  const [editStatus, setEditStatus] = useState(false);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    const getDataDetailsProjectStatus = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${REACT_APP_BASE_URL}project_status/${params.id}`)
          const {data} = _.get(response,'data', {});
          setDataDetailsProjectStatus(data)
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
    };
    getDataDetailsProjectStatus();
  }, [update]);

  return (
    <div>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {editStatus ? (
              <FormEditProjectStatus
                setUpdate={setUpdate}
                dataDetails={detailsProjectStatus}
                setEdit={setEditStatus}
                update={update}
              />
            ) : (
              <FormDetailProjectStatus setUpdate={setEditStatus} dataDetails={detailsProjectStatus} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
