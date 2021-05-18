import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormDetailTechStack } from "./form-detail-tech-stack";
import { Loading } from '../../../components/loading/loading';
import { FormEditTechStack } from "./form-edit-tech-stack";
import axios from 'axios';
import _ from 'lodash';
import { REACT_APP_BASE_URL } from '../../../routers/router.type';
export const DetailsTechStack = () => {
  const [detailsTechStack, setDataDetailsTechStack] = useState({});
  const [editStatus, setEditStatus] = useState(false);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    const getDataDetailsProjectStatus = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${REACT_APP_BASE_URL}tech_stacks/${params.id}`)
          const {data} = _.get(response,'data', {});
          setDataDetailsTechStack(data)
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
              <FormEditTechStack
                setUpdate={setUpdate}
                dataDetails={detailsTechStack}
                setEdit={setEditStatus}
                update={update}
              />
            ) : (
              <FormDetailTechStack setUpdate={setEditStatus} dataDetails={detailsTechStack} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};