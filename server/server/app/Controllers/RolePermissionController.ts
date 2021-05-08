import BaseController from './BaseController'
import RolePermissionModel from "@app/Models/RolePermissionModel";
import RoleGroupModel from "@root/server/app/Models/RoleGroupModel";
import ApiException from '@app/Exceptions/ApiException'

export default class RolePermissionController extends BaseController {
  Model: any = RolePermissionModel
  RoleGroupModel: any = RoleGroupModel;

  async getPermissionByGroupId() {
    const { auth } = this.request
    const allowFields = {
      groupId: "number!"
    }
    let inputs = this.request.all();
    let params = this.validate(inputs, allowFields, { removeNotAllow: true });
    let group = await this.RoleGroupModel.getById(params.groupId)
    if (!group) throw new ApiException(6000, "UserGroup doesn't exist!")
    let permissions = await this.Model.getByCondition({ createdBy: auth.id })
    for(let index in permissions) {
      let permission = permissions[index]
      let result = await permission.$relatedQuery('roleGroupPermission').where('roleGroupId', group.id).first()
      if(result) permissions[index]['currentValue'] = result.value
      else permissions[index]['currentValue'] = 0
    }
    group['permissions'] = permissions
    return [group]
  }
}
