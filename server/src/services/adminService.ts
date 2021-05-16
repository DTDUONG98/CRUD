import Base from "./baseService";

class AdminService extends Base {
  index = async (filter: any) => {
    return this.request({
      url: "/api/v1/admins",
      method: "GET",
      data: filter,
    });
  };

  create = async (data: any) => {
    return this.request({
      url: "/api/v1/admins",
      method: "POST",
      data: data,
    });
  };

  detail = async (data: any) => {
    return this.request({
      url: "/api/v1/admins/:id",
      method: "GET",
      data: data,
    });
  };

  edit = async (data: any) => {
    return this.request({
      url: "/api/v1/admins/:id",
      method: "PUT",
      data: data,
    });
  };

  delete = async (data: any) => {
    return this.request({
      url: "/api/v1/admins",
      method: "DELETE",
      data: data,
    });
  };

  destroy = async (data: any) => {
    return this.request({
      url: "/api/v1/admins/:id",
      method: "DELETE",
      data: data,
    });
  };

  loginAs = async(data: any) => {
    return this.request({
      url: "/api/v1/admins/loginAs",
      method: "POST",
      data: data,
    });
  }

  generateOTP = async() => {
    return this.request({
      url: "/api/v1/admins/generateOTP",
      method: "GET"
    });
  }

  submitOTP = async(data: any) => {
    return this.request({
      url: "/api/v1/admins/submitOTP",
      method: "POST",
      data: data,
    });
  }
}

const service = () => new AdminService();
export default service;
