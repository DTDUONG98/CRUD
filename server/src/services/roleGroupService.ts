import Base from "./baseService";

class RoleGroupService extends Base {
  index = async (filter: any) => {
    return this.request({
      url: "/api/v1/roleGroups",
      method: "GET",
      data: filter,
    });
  };

  select2 = async (filter: any) => {
    return this.request({
      url: "/api/v1/roleGroups/select2",
      method: "GET",
      data: filter,
    });
  };

  selectParent = async (filter: any) => {
    return this.request({
      url: "/api/v1/roleGroups/selectParent",
      method: "GET",
      data: filter,
    });
  };

  create = async (data: any) => {
    return this.request({
      url: "/api/v1/roleGroups",
      method: "POST",
      data: data,
    });
  };

  detail = async (data: any) => {
    return this.request({
      url: "/api/v1/roleGroups/:id",
      method: "GET",
      data: data,
    });
  };

  edit = async (data: any) => {
    return this.request({
      url: "/api/v1/roleGroups/:id",
      method: "PUT",
      data: data,
    });
  };

  delete = async (data: any) => {
    return this.request({
      url: "/api/v1/roleGroups",
      method: "DELETE",
      data: data,
    });
  };

  destroy = async (data: any) => {
    return this.request({
      url: "/api/v1/roleGroups/:id",
      method: "DELETE",
      data: data,
    });
  };
}

export default () => new RoleGroupService();
