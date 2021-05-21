import React from 'react';
import TableToExcel from "@linways/table-to-excel";
import { FaPrint } from "react-icons/fa";
export const ExportToExcel = (name) => {
    const  PrintTableToExcel = () => {
        let table = document.querySelector('table')
        TableToExcel.convert(table, {
          name: name.name
        })
    }
    return(
        <button
        style={{ outline: "none" }}
        className="flex hover:underline pl-40"
        onClick={() => PrintTableToExcel()}
        >
        <p className="custom-outline font-semibold">ExportToExcel</p>
        <FaPrint className="outline-none text-2xl ml-2 " />
      </button>
    );
}