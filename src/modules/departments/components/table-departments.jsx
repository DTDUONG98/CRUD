import React from 'react';
import { useEffect, useState } from "react";
import { PaginationNav } from "../../../components/pagination/pagination";
import RowTableDepartments from "./row-table-departments";
import { Loading } from '../../../components/loading/loading';
import { useDispatch, useSelector } from "react-redux";
import { getDepartment } from '../../../services/departments-service';
export const TableDepartments = () => {
    const data = useSelector(state => state.department.data);
    const loading = useSelector(state => state.department.loading);
    const dispatch = useDispatch();
    const [ListDepartments, setListDepartments] = useState([]);
    const [page, setPage] = useState(1);
    const getDataDepartment = async () => {
        try {
            setListDepartments(data)
        } catch (error) {
            await Alert("GetData failed, try again!", "Notification");
        }
    };
    useEffect(() => {
        getDataDepartment();
    }, [loading]);
    useEffect(() => {
        dispatch(getDepartment(page));
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
                            <th className="pt-5 pb-5 w-2/12 text-center">Name</th>
                            <th className="pt-5 pb-5 w-2/12 lg:hidden sm:hidden text-center">Function</th>
                            <th className="pt-5 pb-5 w-2/12 sm:w-2/12 text-center">Mission</th>
                        </tr>
                    </thead>
                    {ListDepartments &&
                        ListDepartments.map((departments, index) => {
                            return (
                                <RowTableDepartments
                                    link={"/manager/departments/" + departments.id}
                                    key={departments.id}
                                    number={index + 1}
                                    type={departments.name}
                                    mission={departments.mission}
                                    func={departments.functions}
                                />
                            );
                        })}
                </table>
                <PaginationNav
                    page={page}
                    totalPage={ListDepartments.totalPage}
                    onChange={handelChangePage}
                />
            </div>
        )}
        </div>
    );
};