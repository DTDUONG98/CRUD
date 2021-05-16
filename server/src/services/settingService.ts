import Base from "./baseService";

class SettingService extends Base {
  index = async (filter: any) => {
    return this.request({
      url: "/api/v1/settings",
      method: "GET",
      data: filter,
    });
  };

  detail = async (data: any) => {
    return this.request({
      url: "/api/v1/settings/:id",
      method: "GET",
      data: data,
    });
  };

  edit = async (data: any) => {
    return this.request({
      url: "/api/v1/settings/:id",
      method: "PUT",
      data: data,
    });
  };
}

export default () => new SettingService();
