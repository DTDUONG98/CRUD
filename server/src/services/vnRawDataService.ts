import Base from "./baseService";

class VNDrugService extends Base {
  index = async (filter: any) => {
    return this.request({
      url: "/api/v1/vn_raw_datas",
      method: "GET",
      data: filter,
    });
  };

  select2 = async (filter: any) => {
    return this.request({
      url: "/api/v1/vn_raw_datas/select2",
      method: "GET",
      data: filter,
    });
  };

  selectParent = async (filter: any) => {
    return this.request({
      url: "/api/v1/vn_raw_datas/selectParent",
      method: "GET",
      data: filter,
    });
  };

  create = async (data: any) => {
    return this.request({
      url: "/api/v1/vn_raw_datas",
      method: "POST",
      data: data,
    });
  };

  detail = async (data: any) => {
    return this.request({
      url: "/api/v1/vn_raw_datas/:id",
      method: "GET",
      data: data,
    });
  };

  edit = async (data: any) => {
    return this.request({
      url: "/api/v1/vn_raw_datas/:id",
      method: "PUT",
      data: data,
    });
  };

  delete = async (data: any) => {
    return this.request({
      url: "/api/v1/vn_raw_datas",
      method: "DELETE",
      data: data,
    });
  };

  destroy = async (data: any) => {
    return this.request({
      url: "/api/v1/vn_raw_datas/:id",
      method: "DELETE",
      data: data,
    });
  };
}

export default () => new VNDrugService();
