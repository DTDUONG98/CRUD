import { useEffect, useState } from "react";
import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Alert } from "react-st-modal";
import { PaginationNav } from "../../../components/pagination/pagination";
import RowTableCustomerGroup from "./row-table-customer-group";
import { Loading } from '../../../components/loading/loading';
import { REACT_APP_BASE_URL } from '../../../routers/router.type';
const queryString = require("query-string");
export const TableCustomerGroup = () => {
    const [loading, setLoading ] = useState(false);
    const [ListCustomerGroup, setListCustomerGroup] = useState([]);
    const [page, setPage] = useState(1);
    const getDataCustomerGroup = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${REACT_APP_BASE_URL}customer_groups?page=${page-1}&pageSize=${5}`)
            const {data} = _.get(response,'data.data', []);
            console.log('data', data);
            setListCustomerGroup({data: data});
            setLoading(false);
        } catch (error) {
            setLoading(false);
            await Alert("GetData failed, try again!", "Notification");
        }
    };
    useEffect(() => {
        getDataCustomerGroup();
    }, [page]);
    const handelChangePage = e => {
        const numberPage = e;
        setPage(numberPage);
    };
    return (
        <div className="h-96 sm:w-full">
            {loading ? (
        <Loading />
      ) : (
            <div className="sm:w-full sm:flex sm:flex-col sm:items-center">
                <table className="flex-col shadow-xl flex justify-center sm:w-11/12 bg-white w-11/12 rounded-xl">
                    <thead>
                        <tr className=" flex w-full sm:w-full bg-indigo-700 justify-around text-white rounded-t-xl cursor-pointer hover:bg-indigo-600">
                            <th className="pt-5 pb-5 w-1/12">No.</th>
                            <th className="pt-5 pb-5 w-2/12 text-left">Name</th>
                            <th className="pt-5 pb-5 w-2/12 lg:hidden sm:hidden text-left">Description</th>
                            <th className="pt-5 pb-5 w-1/12 sm:w-2/12">Priority</th>
                            <th className="pt-5 pb-5 w-1/12 lg:w-2/12 sm:w-2/12">Status</th>
                        </tr>
                    </thead>
                    {ListCustomerGroup.data &&
                        ListCustomerGroup.data.map(customerGroup => {
                            return (
                                <RowTableCustomerGroup
                                    link={"/category/customer-group/" + customerGroup.id}
                                    key={customerGroup.id}
                                    number={customerGroup.id}
                                    type={customerGroup.name}
                                    description={customerGroup.description}
                                    priority={customerGroup.priority}
                                    status={customerGroup.status}
                                />
                            );
                        })}
                </table>
                <PaginationNav
                    page={page}
                    totalPage={ListCustomerGroup.totalPage}
                    onChange={handelChangePage}
                />
            </div>
        )}
        </div>
      );
};