import React from 'react';
import { useEffect, useState } from "react";
import { PaginationNav } from "../../../components/pagination/pagination";
import RowTableProjectType from "./row-table-project-type";
import { Loading } from '../../../components/loading/loading';
import { useDispatch, useSelector } from "react-redux";
import { getProjectType } from '../../../services/project-type-service';
export const TableProjectType = () => {
  const data = useSelector(state => state.projectType.data);
  const loading = useSelector(state => state.projectType.loading);
  const dispatch = useDispatch();
  const [ListProjectType, setListProjectType] = useState([]);
  const [valueInput, setValueInput] = useState("");
  const [page, setPage] = useState(1);
  const getDataProjectType = async () => {
    try {
      setListProjectType(data)
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
            shouldSwitch = true;
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
        switchcount++;
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
    var td, i;
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  useEffect(() => {
    getDataProjectType();
  }, [loading])
  useEffect(() => {
    dispatch(getProjectType(page))
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
            type="search"
            id="myInput"
            onsearch={() => onSearch()}
            onKeyUp={() => onSearch()}
            placeholder="Search Here"
          />
          <table id="myTable" className="flex-col shadow-xl flex justify-center sm:w-11/12 bg-white w-11/12 rounded-xl table-list">
            <thead>
              <tr className=" flex w-full sm:w-full bg-indigo-700 justify-around text-white rounded-t-xl cursor-pointer hover:bg-indigo-600">
                <th className="pt-5 pb-5 w-1/12" onClick={() => sortTable(0)}>No.</th>
                <th className="pt-5 pb-5 w-2/12 text-left" onClick={() => sortTable(1)}>Name</th>
                <th className="pt-5 pb-5 w-2/12 lg:hidden sm:hidden text-left" onClick={() => sortTable(2)}>Description</th>
                <th className="pt-5 pb-5 w-1/12 sm:w-2/12" onClick={() => sortTable(3)}>Priority</th>
                <th className="pt-5 pb-5 w-1/12 lg:w-2/12 sm:w-2/12" onClick={() => sortTable(4)}>Status</th>
              </tr>
            </thead>
            {ListProjectType &&
              ListProjectType.map(projectType => {
                return (
                  <RowTableProjectType
                    link={"/category/project-type/" + projectType.id}
                    key={projectType.id}
                    number={projectType.id}
                    type={projectType.name}
                    description={projectType.description}
                    priority={projectType.priority}
                    status={projectType.status}
                  />
                );
              })}
          </table>
          <PaginationNav
            page={page}
            totalPage={ListProjectType.totalPage}
            onChange={handelChangePage}
          />
        </div>
      )}
    </div>
  );
};
