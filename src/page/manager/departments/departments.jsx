import React from 'react';
import { TitlePage } from "../../../components/title-page/title-page";
import { TableDepartments } from "../../../modules/departments/components/table-departments";
import { ButtonAddMore } from '../../../components/buton-add-more/buton-add-more';
export const Departments = () => {
  return (
    <div className=" sm:w-full sm:flex sm:items-center sm:flex-col">
      <div className="flex justify-between sm:mb-5 sm:mt-14 w-11/12 sm:w-11/12 mt-10 mb-10 items-end">
        <TitlePage content="Trung Tâm, Bộ phận, Phòng ban" />
        <ButtonAddMore route="/manager/departments/create" />
      </div>
      <TableDepartments />
    </div>
  );
};
