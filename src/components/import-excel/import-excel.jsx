import React from 'react';
import excel from 'xlsx';
import { FaPrint } from "react-icons/fa";
export const ImportExcel = () => {
    const ImportExcelTabe = () => {
        let fileName = "projectType.xlsx";
        let workbook = excel.readFile(fileName);
        console.log(workbook)
    }
    return(
        <button
        style={{ outline: "none" }}
        className="flex hover:underline pl-40"
        onClick={() => ImportExcelTabe()}
        >
        <p className="custom-outline font-semibold">ImportToExcel</p>
        <FaPrint className="outline-none text-2xl ml-2 " />
      </button>
    );
}