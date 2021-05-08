import BaseController from './BaseController'
import RoleGroupModel from '@app/Models/RoleGroupModel'
import GroupModel from '@app/Models/GroupModel'
import AdminModel from '@app/Models/AdminModel'
import ApiException from '@app/Exceptions/ApiException'
import constantConfig from '@config/constant'
const { roleGroupKey } = constantConfig
import _ from 'lodash'

export default class RoleGroupController extends BaseController {
  Model: any = RoleGroupModel
  GroupModel: any = GroupModel
  AdminModel: any = AdminModel

  async index() {
    const inputs = this.request.all();
    const project = ['role_groups.*', 'ag.name as parentName']
    let result = await this.Model.query().leftJoin('role_groups as ag', 'role_groups.parentId', 'ag.id').select(project).getForGridTable(inputs);
    return result;
  }

  async store() {
    const { auth } = this.request
    const allowFields = {
      name: "string!",
      description: "string",
      parentId: "number!"
    }
    let inputs = this.request.all();
    let params = this.validate(inputs, allowFields, { removeNotAllow: true });
    let name = params.name.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
    let exist = await this.Model.findExist(name, 'name')
    if (exist) throw new ApiException(6002, "Role Group name already exists!")
    let parentExist = await this.Model.getById(params.parentId);
    if (!parentExist) throw new ApiException(6000, "Role Group doesn't exist!")
    return await this.Model.insertOne({
      ...params,
      createdBy: auth.id,
    });
  }

  async detail() {
    const allowFields = {
      id: "number!"
    }
    let inputs = this.request.all();
    let params = this.validate(inputs, allowFields, { removeNotAllow: true });
    let result = await this.Model.getById(params.id);
    if (!result) throw new ApiException(6000, "Role Group doesn't exist!")
    return result
  }

  async select2() {
    const { auth } = this.request;
    const group = await this.GroupModel.query().findOne({ id: auth.groupId })
    const data = this.request.all()
    const project = [
      'name as label',
      'id as value'
    ]
    let result = await this.Model.query()
      .where('parentId', group.roleGroupId)
      .select(project).getForGridTable(data);
    return result;
  }

  async selectParent() {
    const data = this.request.all()
    const { id } = data
    const project = [
      'name as label',
      'id as value'
    ]
    let query = this.Model.query()
    if(id !== "undefined") query.whereNot('id', id)
    let result = await query.select(project).orderBy('id', 'asc').getForGridTable(data);
    return result
  }

  async update() {
    const { auth } = this.request
    const allowFields = {
      id: "number!",
      name: "string!",
      description: "string",
      parentId: "number!"
    }
    let inputs = this.request.all();
    let params = this.validate(inputs, allowFields, { removeNotAllow: true });
    let { id } = params
    delete params.id
    let exist = await this.Model.getById(id);
    if (!exist) throw new ApiException(6000, "Role Group doesn't exist!");
    let existUserGroupName = await this.Model.findExist(params.name, 'name');
    if (existUserGroupName && existUserGroupName.id != id) {
      throw new ApiException(6002, "Role Group name already exists!");
    }
    let parentExist = await this.Model.getById(params.parentId);
    if (!parentExist) throw new ApiException(6000, "Role Group doesn't exist!")
    return await this.Model.updateOne(id, {
      ...params,
      updatedBy: auth.id
    });
  }

  async destroy() {
    const allowFields = {
      id: "number!"
    }
    const inputs = this.request.all();
    let params = this.validate(inputs, allowFields, { removeNotAllow: true });
    let group = await this.Model.getById(params.id);
    if (!group) throw new ApiException(6000, "Role Group doesn't exist!")
    if(group.key === roleGroupKey.root) throw new ApiException(6003, "Cannot delete root group!")
    let checkUser = await this.AdminModel.query().whereIn('groupId', [group.id])
    if(checkUser.length) throw new ApiException(6004, "Role contains user cannot be deleted!")
    return await this.Model.deleteById(group.id);
  }

  async delete() {
    const allowFields = {
      ids: ["number!"]
    }
    const inputs = this.request.all();
    let params = this.validate(inputs, allowFields);
    let groups = await this.Model.query().whereIn('id', params.ids);
    if (groups.length !== params.ids.length) throw new ApiException(6000, "Role Group doesn't exist!")
    let group = groups.find(group => group.key === roleGroupKey.root)
    if (group) throw new ApiException(6003, "Cannot delete root group!")
    let checkUser = await this.AdminModel.query().whereIn('groupId', params.ids)
    if (!_.isEmpty(checkUser)) throw new ApiException(6004, "Role contains user cannot be deleted!")
    return await this.Model.deleteByIds(params.ids);
  }
}
