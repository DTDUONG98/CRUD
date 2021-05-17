import { TitlePage } from "../../../components/title-page/title-page";
import { FormReportProjectStatus } from "../../../modules/report-project/form-report-project-status";
export const ReportProjectFollowStatus = () => {
  return (
    <div className=" sm:w-full sm:flex sm:items-center sm:flex-col">
      <div className="flex justify-between sm:mb-5 sm:mt-14 w-11/12 sm:w-11/12 mt-10 mb-10 items-end">
        <TitlePage content="Report Project Follow Status" />
      </div>
      <FormReportProjectStatus />
    </div>
  );
};
