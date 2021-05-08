import BaseModel from './BaseModel'
import RoleGroupPermissionModel from './RoleGroupPermissionModel'

class AdminPermissionModel extends BaseModel {
  static tableName = "admin_permissions"

  //fields
  id: number;
  name: string;
  description: any;

  static get relationMappings() {
    return {
      roleGroupPermission: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: RoleGroupPermissionModel,
        join: {
          from: `${this.tableName}.id`,
          to: 'role_group_permissions.permissionId'
        }
      }
    }
  }

  static async getByKey(key){
    return await this.getOne({key})
  }
}

export default AdminPermissionModel
