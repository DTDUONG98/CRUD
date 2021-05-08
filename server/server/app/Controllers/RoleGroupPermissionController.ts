import BaseController from './BaseController'
import RoleGroupPermissionModel from "@root/server/app/Models/RoleGroupPermissionModel";
import RolePermissionModel from "@app/Models/RolePermissionModel";
import RoleGroupModel from "@root/server/app/Models/RoleGroupModel";
import ApiException from '@app/Exceptions/ApiException'

export default class AdminPermissionController extends BaseController {
  Model: any = RoleGroupPermissionModel;
  RolePermissionModel: any = RolePermissionModel;
  RoleGroupModel: any = RoleGroupModel;

  async update() {
    const allowFields = {
      groupId: "number!"
    }
    let inputs = this.request.all();
    let auth = this.request.auth;
    let params = this.validate(inputs, allowFields, { removeNotAllow: true });
    const { groupId } = params;
    const { permissions } = inputs
    if (!permissions) throw new ApiException(6005, "No data");
    let group = await this.RoleGroupModel.getById(groupId)
    if (!group) throw new ApiException(6000, "UserGroup doesn't exist!")

    for (let key in permissions) {
      const value = permissions[key]
      const exist = await this.RolePermissionModel.getByKey(key);
      if (!exist) throw new ApiException(7003, `${key} doesn't exist`);
      const role = await this.Model.getByPermissionKey({ key, roleGroupId: groupId });
      // kiem tra gia tri moi cua quyen
      if (!value) { //truong hop xoa bo quyen cu
        await this.Model.query().delete().where({ roleGroupId: groupId, key });
      }
      else if (!role) { //quyen moi chua ton tai trong DB
        await this.Model.insertOne({
          key,
          roleGroupId: groupId,
          permissionId: exist.id,
          value, createdBy: auth.id
        });
      }
      else if (role.value != value) { //update lai gia tri moi
        await this.Model.updateOne(role.id, { value: value })
      }
    }
    return { message: `Update successfully` }
  }
}
