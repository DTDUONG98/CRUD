import Base from "./baseService";

class RoleGroupPermissionService extends Base {
  update = async (data: any) => {
    return this.request({
      url: "/api/v1/roleGroupPermissions/update",
      method: "PUT",
      data: data,
    });
  }
}

export default () => new RoleGroupPermissionService();
