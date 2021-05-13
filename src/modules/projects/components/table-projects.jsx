import { useEffect, useState } from "react";
import { PaginationNav } from "../../../components/pagination/pagination";
import RowTableProjects from "./row-table-projects";
import axios from 'axios';
import _ from 'lodash';
import { REACT_APP_BASE_URL } from '../../../routers/router.type';
const queryString = require("query-string");
export const TableProjectType = () => {
      const [loading, setLoading] = useState(false);
    const [ListProjects, setListProjects] = useState([]);
    const [page, setPage] = useState(1);
    const getDataProjects = async () => {
          setLoading(true);
          try {
            const response = await axios.get(`${REACT_APP_BASE_URL}projects`, {
                params: {
                    page: page-1,
                    pageSize: 5
                }
            })
            const {data} = _.get(response, 'data', []);
            console.log('response', data);
            setListProjects({data: data});
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    useEffect(() => {
        getDataProjects();
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
                            <th className="pt-5 pb-5 w-1/12 text-right">Name</th>
                            <th className="pt-5 pb-5 w-2/12 lg:hidden sm:hidden text-right">Project Type</th>
                            <th className="pt-5 pb-5 w-2/12 lg:hidden sm:hidden text-center">Project Status</th>
                            <th className="pt-5 pb-5 w-1/12 sm:w-2/12">Department</th>
                        </tr>
                    </thead>
                    {ListProjects.data &&
                        ListProjects.data.map(projects => {
                            return (
                                <RowTableProjects
                                    link={"/manager/projects/" + projects.id}
                                    key={projects.id}
                                    number={projects.id}
                                    type={projects.name}
                                    projectType={projects.projectType}
                                    projectStatus={projects.projectStatus}
                                    department={projects.department}
                                />
                            );
                        })}
                </table>
                <PaginationNav
                    page={page}
                    totalPage={ListProjects.totalPage}
                    onChange={handelChangePage}
                />
            </div>
        </div>
    );
};
