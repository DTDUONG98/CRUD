import Base from "./baseService";

class GroupService extends Base {
  index = async (filter: any) => {
    return this.request({
      url: "/api/v1/groups",
      method: "GET",
      data: filter,
    });
  };

  select2 = async (filter: any) => {
    return this.request({
      url: "/api/v1/groups/select2",
      method: "GET",
      data: filter,
    });
  };

  selectParent = async (filter: any) => {
    return this.request({
      url: "/api/v1/groups/selectParent",
      method: "GET",
      data: filter,
    });
  };

  create = async (data: any) => {
    return this.request({
      url: "/api/v1/groups",
      method: "POST",
      data: data,
    });
  };

  detail = async (data: any) => {
    return this.request({
      url: "/api/v1/groups/:id",
      method: "GET",
      data: data,
    });
  };

  edit = async (data: any) => {
    return this.request({
      url: "/api/v1/groups/:id",
      method: "PUT",
      data: data,
    });
  };

  delete = async (data: any) => {
    return this.request({
      url: "/api/v1/groups",
      method: "DELETE",
      data: data,
    });
  };

  destroy = async (data: any) => {
    return this.request({
      url: "/api/v1/groups/:id",
      method: "DELETE",
      data: data,
    });
  };
}

export default () => new GroupService();
