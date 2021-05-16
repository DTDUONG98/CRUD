import BaseModel from './BaseModel'

class RoleGroupPermissionModel extends BaseModel {
  static tableName = "role_group_permissions"

  //fields
  id: number;
  groupId: number;
  permissionId: number;
  key: string;
  value: number;
  createdAt: Date;
  createdBy: number;

  static async getByPermissionKey(condition){
    return await this.getOne(condition)
  }

  static async getPermissions(roleGroupId) {
    let permissions = await this.getByCondition({roleGroupId: roleGroupId})
    let result = {}
    for(let permission of permissions) {
      result[permission.key] = permission.value
    }
    return result
  }
}

export default RoleGroupPermissionModel
