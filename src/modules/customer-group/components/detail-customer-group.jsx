import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormDetailCustomer } from "./form-detail-customer";
// import { FormEditCustomer } from "./form-edit-customer";
export const DetailsCustomer = () => {
  const [detailsCustomer, setDataDetailsCustomers] = useState([]);
  const [editStatus, setEditStatus] = useState(false);
  const [update, setUpdate] = useState(false);
  const params = useParams();
  useEffect(() => {
    const getDataDetailsCustomer = async () => {
        console.log('detail customer group')
    };
    getDataDetailsCustomer();
  }, [update]);

  return (
    <div>
      <div>
          <div>
            {/* {editStatus ? (
              <FormEditCustomer
                setUpdate={setUpdate}
                dataDetails={detailsCustomer}
                setEdit={setEditStatus}
                update={update}
              />
            ) : ( */}
              <FormDetailCustomer setUpdate={setEditStatus} dataDetails={detailsCustomer} />
            {/* )} */}
          </div>
      </div>
    </div>
  );
};
