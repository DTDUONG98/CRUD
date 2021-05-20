import React from 'react';
import { TitlePage } from "../../../components/title-page/title-page";
import { TableCustomerGroup } from "../../../modules/customer-group/components/table-customer-group";
import { ButtonAddMore } from '../../../components/buton-add-more/buton-add-more';
import { ExportToExcel } from '../../../components/print-to-excel/table-to-excel';
export const CustomerGroup = () => {
  return (
    <div className=" sm:w-full sm:flex sm:items-center sm:flex-col">
      <div className="flex justify-between sm:mb-5 sm:mt-14 w-11/12 sm:w-11/12 mt-10 mb-10 items-end">
        <TitlePage content="Nhóm khách hàng" />
        <ExportToExcel name={"customer.xlsx"} />
        <ButtonAddMore route="/category/customer-group/create" />
      </div>
      <TableCustomerGroup />
    </div>
  );
};