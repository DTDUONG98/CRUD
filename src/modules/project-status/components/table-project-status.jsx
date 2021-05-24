import React from 'react';
import { useEffect, useState } from "react";
import { PaginationNav } from "../../../components/pagination/pagination";
import RowTableProjectStatus from "./row-table-project-status";
import { Loading } from '../../../components/loading/loading';
import { useDispatch, useSelector } from "react-redux";
import { getProjectStatus } from '../../../services/project-status-service';
export const TableProjectStatus = () => {
    const data = useSelector(state => state.projectStatus.data);
    const loading = useSelector(state => state.projectStatus.loading);
    const dispatch = useDispatch();
    const [ListProjectStatus, setListProjectStatus] = useState([]);
    const [page, setPage] = useState(1);
    const getDataProjectStatus = async () => {
       try {
            setListProjectStatus(data)
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
    const onSearch = () => {
      const input = document.getElementById("myInput");
      const filter = input.value.toUpperCase();
      const table = document.getElementById("myTable");
      const tr = table.getElementsByTagName("tr");
      for (let i = 1; i < tr.length; i++) {
          if (tr[i].textContent.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
      }
    }
    useEffect(() => {
        getDataProjectStatus();
    }, [loading]);
    useEffect(() => {
        dispatch(getProjectStatus(page))
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
                <input
                  className="p-2 mb-3 rounded-md w-5/12"
                  type="search"
                  id="myInput"
                  onsearch={() => onSearch()}
                  onKeyUp={() => onSearch()}
                  placeholder="Search Here"
                />
                <table 
                  id="myTable" 
                  className="flex-col shadow-xl flex justify-center sm:w-11/12 bg-white w-11/12 rounded-xl"
                  data-cols-width="10,30,30,20"
                >
                    <thead>
                        <tr className=" flex w-full sm:w-full bg-indigo-700 justify-around text-white rounded-t-xl cursor-pointer hover:bg-indigo-600">
                            <th className="pt-5 pb-5 w-1/12" onClick={() => sortTable(0)}>No.</th>
                            <th className="pt-5 pb-5 w-2/12 text-left" onClick={() => sortTable(1)}>Name</th>
                            <th className="pt-5 pb-5 w-2/12 lg:hidden sm:hidden text-left" onClick={() => sortTable(2)}>Description</th>
                            <th className="pt-5 pb-5 w-1/12 lg:w-2/12 sm:w-2/12" onClick={() => sortTable(3)}>Status</th>
                        </tr>
                    </thead>
                    {ListProjectStatus &&
                        ListProjectStatus.map(projectStatus => {
                            return (
                                <RowTableProjectStatus
                                    link={"/category/project-status/" + projectStatus.id}
                                    key={projectStatus.id}
                                    number={projectStatus.id}
                                    type={projectStatus.name}
                                    description={projectStatus.description}
                                    status={projectStatus.status}
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
             )}
        </div>
    );
};
