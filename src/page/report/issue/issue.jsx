import React from 'react';
import { TitlePage } from "../../../components/title-page/title-page";
import { FormReportProjectIssue } from "../../../modules/issue/form-issue";
export const ReportProjectIssue = () => {
  return (
    <div className=" sm:w-full sm:flex sm:items-center sm:flex-col">
      <div className="flex justify-between sm:mb-5 sm:mt-14 w-11/12 sm:w-11/12 mt-10 mb-10 items-end">
        <TitlePage content="Report Project Issue" />
      </div>
      <FormReportProjectIssue />
    </div>
  );
};
