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
                  data-cols-width="10,30,30,30"
                >
                    <thead>
                        <tr className=" flex w-full sm:w-full bg-indigo-700 justify-around text-white rounded-t-xl cursor-pointer hover:bg-indigo-600">
                            <th className="pt-5 pb-5 w-1/12" onClick={() => sortTable(0)}>No.</th>
                            <th className="pt-5 pb-5 w-2/12 text-center" onClick={() => sortTable(1)}>Name</th>
                            <th className="pt-5 pb-5 w-2/12 lg:hidden sm:hidden text-center" onClick={() => sortTable(2)}>Function</th>
                            <th className="pt-5 pb-5 w-2/12 sm:w-2/12 text-center" onClick={() => sortTable(3)}>Mission</th>
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