import BaseController from './BaseController'
import AdminModel from '@app/Models/AdminModel'
import GroupModel from '@app/Models/GroupModel'
import RoleGroupModel from '@app/Models/RoleGroupModel'
import ApiException from '@app/Exceptions/ApiException'
import _ from 'lodash'

export default class GroupController extends BaseController {
  Model: any = GroupModel
  AdminModel: any = AdminModel

  async index() {
    const { auth } = this.request;
    const inputs = this.request.all();
    let groupIds = await GroupModel.getChildren(auth.groupId, false);
    const project = ['groups.*', 'parent.name as parentName', 'role_groups.name as roleName']
    let result = await this.Model.query()
      .leftJoin('groups as parent', 'groups.parentId', 'parent.id')
      .leftJoin('role_groups', 'groups.roleGroupId', 'role_groups.id')
      .whereIn('groups.id', groupIds)
      .select(project).getForGridTable(inputs);
    return result;
  }

  async select2() {
    const { auth } = this.request;
    const data = this.request.all()
    const project = [
      'name as label',
      'id as value'
    ]

    let groupIds = await GroupModel.getChildren(auth.groupId);
    let result = await this.Model.query().whereIn('id', groupIds).select(project).getForGridTable(data);
    return result;
  }

  async store() {
    const { auth } = this.request
    const allowFields = {
      name: "string!",
      description: "string",
    }
    let inputs = this.request.all();
    let params = this.validate(inputs, allowFields, { removeNotAllow: true });
    let name = params.name.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
    let exist = await this.Model.findExist(name, 'name')
    if (exist) throw new ApiException(6014, "Group name already exists!")
    if(inputs.code) {
      let existCode = await this.Model.findExist(inputs.code, 'code')
      if (existCode) throw new ApiException(6015, "Group code already exists!")
      params.code = inputs.code
    }
    const group = await this.Model.query().findOne({ id: auth.groupId })
    const roleGroup = await RoleGroupModel.query().findOne({parentId: group.roleGroupId})
    let result = await this.Model.insertOne({
      ...params,
      parentId: auth.groupId,
      parentIds: JSON.stringify([...group.parentIds, auth.groupId]),
      roleGroupId: roleGroup.id
    });
    return result;
  }

  async selectParent() {
    const { auth } = this.request;
    const data = this.request.all()
    const { id } = data
    const project = [
      'name as label',
      'id as value'
    ]
    let query = this.Model.query()
    if (id !== "undefined") query.whereNot('id', id)
    let groupIds = await GroupModel.getChildren(auth.groupId);
    let result = await query.select(project).whereIn('id', groupIds).orderBy('id', 'asc').getForGridTable(data);
    return result
  }

  async detail() {
    const allowFields = {
      id: "number!"
    }
    let inputs = this.request.all();
    let params = this.validate(inputs, allowFields, { removeNotAllow: true });
    let result = await this.Model.getById(params.id);
    if (!result) throw new ApiException(6000, "Group doesn't exist!")
    return result
  }

  async update() {
    const allowFields = {
      id: "number!",
      name: "string!",
      description: "string",
    }
    let inputs = this.request.all();
    let params = this.validate(inputs, allowFields, { removeNotAllow: true });
    let { id } = params
    delete params.id
    let exist = await this.Model.getById(id);
    if (!exist) throw new ApiException(6016, "Group doesn't exist!");
    if(inputs.code) {
      let existGroupCode = await this.Model.findExist(inputs.code, 'code');
      if (existGroupCode && existGroupCode.id != id) {
        throw new ApiException(6015, "Group code already exists!");
      }
      params.code = inputs.code
    }
    let existGroupName = await this.Model.findExist(params.name, 'name');
    if (existGroupName && existGroupName.id != id) {
      throw new ApiException(6014, "Group name already exists!");
    }
    let result = await this.Model.updateOne(id, {
      ...params
    });
    return {
      result,
      old: exist
    }
  }

  async destroy() {
    const allowFields = {
      id: "number!"
    }
    const inputs = this.request.all();
    let params = this.validate(inputs, allowFields, { removeNotAllow: true });
    let group = await this.Model.getById(params.id);
    if (!group) throw new ApiException(6016, "Group doesn't exist!")
    let checkUser = await this.AdminModel.query().whereIn('groupId', [group.id])
    if (checkUser.length) throw new ApiException(6017, "Group contains user cannot be deleted!")
    await this.Model.deleteById(group.id);
    return {
      message: "Delete successfully",
      old: group
    }
  }

  async delete() {
    const allowFields = {
      ids: ["number!"]
    }
    const inputs = this.request.all();
    let params = this.validate(inputs, allowFields);
    let groups = await this.Model.query().whereIn('id', params.ids);
    if (groups.length !== params.ids.length) throw new ApiException(6016, "Group doesn't exist!")
    let checkUser = await this.AdminModel.query().whereIn('groupId', params.ids)
    if (!_.isEmpty(checkUser)) throw new ApiException(6017, "Group contains user cannot be deleted!")
    //return await this.Model.deleteByIds(params.ids);
    for (let group of groups) {
      await group.$query().delete()
    }
    return {
      old: {
        names: (groups || []).map(group => group.name).join(', ')
      }
    }
  }
}
