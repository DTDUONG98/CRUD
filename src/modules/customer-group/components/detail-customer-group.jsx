import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormDetailCustomer } from "./form-detail-customer";
import { Loading } from '../../../components/loading/loading';
import { FormEditCustomer } from "./form-edit-customer-group";
import axios from 'axios';
import _ from 'lodash';
import { REACT_APP_BASE_URL } from '../../../routers/router.type';
export const DetailsCustomer = () => {
  const [detailsCustomer, setDataDetailsCustomers] = useState([]);
  const [editStatus, setEditStatus] = useState(false);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    const getDataDetailsCustomer = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${REACT_APP_BASE_URL}customer_groups/${params.id}`)
          const {data} = _.get(response,'data', []);
          console.log('data', data);
          setDataDetailsCustomers(data)
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
    };
    getDataDetailsCustomer();
  }, [update]);

  return (
    <div>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {editStatus ? (
              <FormEditCustomer
                setUpdate={setUpdate}
                dataDetails={detailsCustomer}
                setEdit={setEditStatus}
                update={update}
              />
            ) : (
              <FormDetailCustomer setUpdate={setEditStatus} dataDetails={detailsCustomer} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
