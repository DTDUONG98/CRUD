import { useEffect, useState } from "react";
import { PaginationNav } from "../../../components/pagination/pagination";
import RowTableProjectStatus from "./row-table-project-status";
import axios from 'axios';
import _ from 'lodash';
import { REACT_APP_BASE_URL } from '../../../routers/router.type';
const queryString = require("query-string");
export const TableProjectStatus = () => {
    const [ListProjectStatus, setListProjectStatus] = useState([]);
    const [page, setPage] = useState(1);
    const getDataProjectStatus = async () => {
        const response = await axios.get(`${REACT_APP_BASE_URL}project_status`, {
            params: {
                page: page-1,
                pageSize: 5,
            }
        })
       const {data} = _.get(response,'data.data', []);
       console.log('data', data);
       setListProjectStatus({data: data});
    };
    useEffect(() => {
        getDataProjectStatus();
    }, [page]);
    const handelChangePage = e => {
        const numberPage = e;
        setPage(numberPage);
    };
    return (
        <div className="h-96 sm:w-full">
            <div className="sm:w-full sm:flex sm:flex-col sm:items-center">
                <table className="flex-col shadow-xl flex justify-center sm:w-11/12 bg-white w-11/12 rounded-xl">
                    <thead>
                        <tr className=" flex w-full sm:w-full bg-indigo-700 justify-around text-white rounded-t-xl cursor-pointer hover:bg-indigo-600">
                            <th className="pt-5 pb-5 w-1/12">No.</th>
                            <th className="pt-5 pb-5 w-2/12 text-left">Name</th>
                            <th className="pt-5 pb-5 w-2/12 lg:hidden sm:hidden text-left">Description</th>
                            <th className="pt-5 pb-5 w-1/12 lg:w-2/12 sm:w-2/12">Status</th>
                        </tr>
                    </thead>
                    {ListProjectStatus.data &&
                        ListProjectStatus.data.map(projectType => {
                            return (
                                <RowTableProjectStatus
                                    link={"/category/project-status/" + projectType.id}
                                    key={projectType.id}
                                    number={projectType.id}
                                    type={projectType.name}
                                    description={projectType.description}
                                    status={projectType.status}
                                />
                            );
                        })}
                </table>
                <PaginationNav
                    page={page}
                    totalPage={ListProjectStatus.totalPage}
                    onChange={handelChangePage}
                />
            </div>
        </div>
    );
};
