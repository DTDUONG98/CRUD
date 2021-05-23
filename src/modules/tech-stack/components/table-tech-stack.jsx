import React from 'react';
import { useEffect, useState } from "react";
import { PaginationNav } from "../../../components/pagination/pagination";
import RowTableTechStack from "./row-table-tech-stack";
import { Loading } from '../../../components/loading/loading';
import { useDispatch, useSelector } from "react-redux";
import { getTechStack } from '../../../services/tech-stack-service';
export const TableTechStack = () => {
    const pageSize = 5;
    const data = useSelector(state => state.techStack.data);
    const loading = useSelector(state => state.techStack.loading);
    const dispatch = useDispatch();
    const [ListTechStack, setListTechStack] = useState([]);
    const [page, setPage] = useState(1);
    const getDataTechStack = async () => {
        try {
            setListTechStack(data)
        } catch (error) {
            await Alert("GetData failed, try again!", "Notification");
        }
    };
    const sortTable = (n) => {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("myTable");
        switching = true;
        dir = "asc"; 
        while (switching) {
          switching = false;
          rows = table.rows;
          for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
              if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch= true;
                break;
              }
            } else if (dir == "desc") {
              if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
              }
            }
          }
          if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;      
          } else {
            if (switchcount == 0 && dir == "asc") {
              dir = "desc";
              switching = true;
            }
          }
        }
    }
    useEffect(() => {
        getDataTechStack();
    }, [loading]);
    useEffect(() => {
        dispatch(getTechStack(page, pageSize));
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
                <table id="myTable" className="flex-col shadow-xl flex justify-center sm:w-11/12 bg-white w-11/12 rounded-xl">
                    <thead>
                        <tr className=" flex w-full sm:w-full bg-indigo-700 justify-around text-white rounded-t-xl cursor-pointer hover:bg-indigo-600">
                            <th className="pt-5 pb-5 w-1/12" onClick={() => sortTable(0)}>No.</th>
                            <th className="pt-5 pb-5 w-2/12 text-left" onClick={() => sortTable(1)}>Name</th>
                            <th className="pt-5 pb-5 w-2/12 lg:hidden sm:hidden text-left" onClick={() => sortTable(2)}>Description</th>
                            <th className="pt-5 pb-5 w-1/12 lg:w-2/12 sm:w-2/12" onClick={() => sortTable(3)}>Status</th>
                        </tr>
                    </thead>
                    {ListTechStack &&
                        ListTechStack.map(techStack => {
                            return (
                                <RowTableTechStack
                                    link={"/category/tech-stack/" + techStack.id}
                                    key={techStack.id}
                                    number={techStack.id}
                                    type={techStack.name}
                                    description={techStack.description}
                                    status={techStack.status}
                                />
                            );
                        })}
                </table>
                <PaginationNav
                    page={page}
                    totalPage={ListTechStack.totalPage}
                    onChange={handelChangePage}
                />
            </div>
            )}
        </div>
    );
};