import Base from "./baseService";

class ExcelService extends Base {
  exportExcel = async (data: any) => {
    return this.request({
      url: "/api/v1/excel/exportExcel",
      method: "GET",
      data: data,
    });
  };

  checkExportCompleted = async (data: any) => {
    return this.request({
      url: "/api/v1/excel/checkExportCompleted",
      method: "GET",
      data: data,
    });
  };
}

export default () => new ExcelService();
