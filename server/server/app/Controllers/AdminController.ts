import BaseController from './BaseController'
import AdminModel from '@app/Models/AdminModel'
import GroupModel from '@app/Models/GroupModel'
import ApiException from '@app/Exceptions/ApiException'
import OTPService from '@app/Services/OTP'
import MailService from '@app/Services/Mail'
import TemplateEmail from '@config/email_templates'

export default class AdminController extends BaseController {
  Model: typeof AdminModel = AdminModel
  GroupModel: any = GroupModel

  async index() {
    const { auth } = this.request;
    let inputs = this.request.all()
    let project = ["admins.*", "groups.name as groupName"]
    let query = this.Model.query()
      .leftJoin('groups', 'admins.groupId', 'groups.id')
    return await query.select(project).where('groups.parentIds', '@>', auth.groupId).orWhere('groups.id', auth.groupId).getForGridTable(inputs);
  }

  async store() {
    const { auth } = this.request
    let inputs = this.request.all()
    const allowFields = {
      firstName: "string!",
      lastName: "string!",
      username: "string!",
      password: "string!",
      email: "string!",
      groupId: "number!",
    }
    let params = this.validate(inputs, allowFields, { removeNotAllow: true });

    let username = params.username.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
    let usernameExist = await this.Model.findExist(username, 'username')
    if (usernameExist) throw new ApiException(6007, "Username already exists!")

    let emailExist = await this.Model.findExist(params.email, 'email')
    if (emailExist) throw new ApiException(6021, "Email already exists!")

    let userGroup = await this.GroupModel.getById(params.groupId)
    if (!userGroup) throw new ApiException(6000, "UserGroup not exists!")
    let svProvider = userGroup
    if(userGroup.roleGroupId != 2 && userGroup.parentId) {
      svProvider = await this.GroupModel.getById(userGroup.parentId)
    }
    let variables = {
      username: params.username,
      password: params.password,
      name: svProvider.name
    }
    if (params['password']) {
      params['password'] = await this.Model.hash(params['password']);
    }

    params = {
      ...params,
      groupId: userGroup.id,
      createdBy: auth.id
    }
    let result = await this.Model.insertOne(params);
    delete result['password']
    let { subject, content } = TemplateEmail['login']
    await MailService.send(params.email, subject, content, variables)
    return result
  }

  async update() {
    let inputs = this.request.all()
    const allowFields = {
      id: "number!",
      firstName: "string!",
      lastName: "string!",
      email: "string!",
    }
    let params = this.validate(inputs, allowFields, { removeNotAllow: true });
    const { id } = params
    delete params.id
    let exist = await this.Model.getById(id)
    if (!exist) throw new ApiException(6006, "User doesn't exists!")
    if(exist.email !== params.email) {
      let emailExist = await this.Model.findExist(params.email, 'email')
      if (emailExist) throw new ApiException(6021, "Email already exists!")
    }
    let result = await this.Model.updateOne(id, params);
    delete result['password']
    return {
      result,
      old: exist
    }
  }

  async destroy() {
    const { auth } = this.request
    let params = this.request.all();
    let id = params.id;
    if (!id) throw new ApiException(9996, "ID is required!");
    let groupIds = await GroupModel.getChildren(auth.groupId);
    if([id].includes(auth.id)) throw new ApiException(6022, "You can not remove your account.")
    let user = await this.Model.query().where('id', params.id).whereIn('groupId', groupIds).first()
    await user.$query().delete()
    return {
      message: `Delete successfully`,
      old: user
    }
  }

  async delete() {
    const { auth } = this.request
    const allowFields = {
      ids: ["number!"]
    }
    const inputs = this.request.all();
    let params = this.validate(inputs, allowFields);
    let groupIds = await GroupModel.getChildren(auth.groupId);
    if(params.ids.includes(auth.id)) throw new ApiException(6022, "You can not remove your account.")
    let users = await this.Model.query().whereIn('id', params.ids).whereIn('groupId', groupIds)
    for(let user of users) {
      await user.$query().delete()
    }
    return {
      old: {
        usernames: (users || []).map(user => user.username).join(', ')
      }
    };
  }

  async loginAs() {
    const auth = this.request.auth;
    let inputs = this.request.all()
    const allowFields = {
      id: "number!"
    }

    /* let params = this.validate(inputs, allowFields, { removeNotAllow: true });
    let user = await this.Model.query().where("id", params.id).where('parentIds', '@>', auth.id).first();
    if (!user) throw new ApiException(7000, "Can not login")

    let group = await this.RoleGroupModel.getById(user.groupId)
    if (!group) throw new ApiException(6000, "UserGroup doesn't exist!")

    let type = "admin";
    let permissions = await this.RoleGroupPermissionModel.getPermissions(group.id);

    let token = Auth.generateJWT({
      id: user.id,
      username: user.username,
      parentId: user.parentId,
      parentIds: user.parentIds,
      groupId: user.groupId,
      permissions: permissions,
      type: type
    }, {
      key: authConfig['SECRET_KEY_ADMIN'],
      expiresIn: authConfig['JWT_EXPIRE_ADMIN']
    });

    return {
      token,
      user: {
        ...user,
        permissions
      }
    } */
  }

  async generateOTP() {
    const { auth } = this.request;
    let user = await this.Model.query().where("id", auth.id).first();
    if (!user) throw new ApiException(6006, "User doesn't exist");
    if (user.twofaSecret)  throw new ApiException(6013, "2FA is already enabled.")
    const secret = await OTPService.generateSecret({
      issuer: process.env.SYSTEM_NAME || "DNC System",
      name: user.username
    })
    return secret
  }

  async submitOTP() {
    const auth = this.request.auth;
    let inputs = this.request.all()
    const allowFields = {
      enable: "number!",
      secret: "string",
      otp: "string"
    }

    let params = this.validate(inputs, allowFields, { removeNotAllow: true });

    let user = await this.Model.query().where("id", auth.id).first();
    if (!user) throw new ApiException(6006, "User doesn't exist");
    if (!params.enable) {
      await user.$query().patch({
        twofaSecret: null
      })
    }
    else {
      if (OTPService.verify(params.otp, params.secret)) {
        await user.$query().patch({
          twofaSecret: params.secret
        })
      }
      else {
        throw new ApiException(6019, "Verify Failed!")
      }
    }
    return
  }
}
