import React from 'react';
import { TitlePage } from "../../../components/title-page/title-page";
import { TableProjectType } from "../../../modules/projects/components/table-projects";
import { ButtonAddMore } from '../../../components/buton-add-more/buton-add-more';
import { ExportToExcel } from '../../../components/print-to-excel/table-to-excel';  
export const Projects = () => {
  return (
    <div className=" sm:w-full sm:flex sm:items-center sm:flex-col">
      <div className="flex justify-between sm:mb-5 sm:mt-14 w-11/12 sm:w-11/12 mt-10 mb-10 items-end">
        <TitlePage content="Dự án" />
        <ExportToExcel name={"projects.xlsx"} />
        <ButtonAddMore route="/manager/projects/create" />
      </div>
      <TableProjectType />
    </div>
  );
};