import React from 'react';
import { useEffect, useState } from "react";
import { PaginationNav } from "../../../components/pagination/pagination";
import RowTableStaffs from "./row-table-staffs";
import { Loading } from '../../../components/loading/loading';
import { useDispatch, useSelector } from "react-redux";
import { getStaffs } from '../../../services/staffs-service'
export const TableStaffs = () => {
    const data = useSelector(state => state.staffs.data);
    const loading = useSelector(state => state.staffs.loading);
    const dispatch = useDispatch();
    const [ListStaffs, setListStaffs] = useState([]);
    const [page, setPage] = useState(1);
    const getDataProjectStatus = async () => {
        try {
            setListStaffs(data)
        } catch (error) {
            await Alert("GetData failed, try again!", "Notification");
        }
    };
    useEffect(() => {
        getDataProjectStatus();
    }, [loading])
    useEffect(() => {
        dispatch(getStaffs(page))
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
                            <th className="pt-5 pb-5 w-1/12 text-center">Birthday</th>
                            <th className="pt-5 pb-5 w-1/12 text-center">SĐT</th>
                        </tr>
                    </thead>
                    {ListStaffs &&
                        ListStaffs.map((staffs, index) => {
                            return (
                                <RowTableStaffs
                                    link={"/manager/staffs/" + staffs.id}
                                    key={staffs.id}
                                    number={index + 1}
                                    type={staffs.name}
                                    birthday={staffs.birth}
                                    phone={staffs.tel}
                                />
                            );
                        })}
                </table>
                <PaginationNav
                    page={page}
                    totalPage={ListStaffs.totalPage}
                    onChange={handelChangePage}
                />
            </div>
        )}
        </div>
    );
};