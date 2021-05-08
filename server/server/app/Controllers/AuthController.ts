import BaseController from './BaseController'
import Model from '@app/Models/AdminModel'
import GroupModel from '@root/server/app/Models/GroupModel';
import RoleGroupPermissionModel from '@root/server/app/Models/RoleGroupPermissionModel';
import ApiException from '@app/Exceptions/ApiException'
import AuditLogModel from '@app/Models/AuditLogModel'
import auditLogs from '@config/auditLog'
import MailService from '@app/Services/Mail';
import TemplateEmail from '@config/email_templates'
import Auth from '@libs/Auth'
import authConfig from '@config/auth'
import to from 'await-to-js'
import OTPService from '@app/Services/OTP'

export default class AuthController extends BaseController {
  Model: any = Model
  GroupModel: any = GroupModel
  RoleGroupPermissionModel: any = RoleGroupPermissionModel

  async login() {
    const inputs = this.request.all();
    const allowFields = {
      username: "string!",
      password: "string!",
      otp: "string"
    }

    const data = this.validate(inputs, allowFields, { removeNotAllow: true });
    let user = await this.Model.checkLogin({
      username: data.username,
      password: data.password
    })
    if (!user) throw new ApiException(7000, "Can not login")
    let group = await this.GroupModel.getById(user.groupId)
    if (!group) throw new ApiException(6000, "UserGroup doesn't exist!")
    if (user.twofaSecret && !OTPService.verify(data.otp, user.twofaSecret)) {
      await AuditLogModel.query().insert({
        ...auditLogs['otpLogin'],
        userId: user.id,
        highLevel: "",
        detailLevel: "OTP invalid!",
        groupId: user.groupId
      })
      throw new ApiException(6020, "OTP invalid!");
    }

    let type = "admin";
    let permissions = {}
    //if(group.key === "root") permissions = { root: 15 }
    permissions = await this.RoleGroupPermissionModel.getPermissions(group.roleGroupId);
    let token = Auth.generateJWT({
      id: user.id,
      username: user.username,
      permissions: permissions,
      groupId: user.groupId,
      roleGroupId: group.roleGroupId,
      type: user.groupId === 1 ? type : "user"
    }, {
      key: authConfig['SECRET_KEY_ADMIN'],
      expiresIn: authConfig['JWT_EXPIRE_ADMIN']
    });

    return {
      token,
      user: {
        ...user,
        type: user.groupId === 1 ? type : "user",
        roleGroupId: group.roleGroupId,
        permissions
      }
    }
  }

  async logout() {
    const inputs = this.request.all();
    const allowFields = {
      username: "string!",
    }

    const data = this.validate(inputs, allowFields, { removeNotAllow: true });
    console.log("data", data)
    return data
  }

  async forgotPassword() {
    const allowFields = {
      email: "string!"
    }
    let inputs = this.request.all()
    let params = this.validate(inputs, allowFields, { removeNotAllow: true });
    let exist = await this.Model.getOne({ email: params.email })
    if (!exist) throw new ApiException(6006, "User does't exist!")
    let { subject, content } = TemplateEmail['forgotPassword']
    //sent email
    let variables = {
      resetPasswordLink: this.makeForgotPasswordLink(exist),
      name: exist.name,
      email: exist.email,
    }
    MailService.send(exist.email, subject, content, variables)
    return exist
  }

  makeForgotPasswordLink(user) {
    let token = Auth.generateJWT({
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email
    }, {
      key: authConfig['SECRET_KEY_ADMIN'],
      expiresIn: authConfig['JWT_EXPIRE_VERYFY_EMAIL']
    })
    return `${this.request.get('origin')}/reset-password/${token}`
  }

  async checkToken() {
    const allowFields = {
      token: "string!"
    }
    let inputs = this.request.all()
    let params = this.validate(inputs, allowFields, { removeNotAllow: true });
    let [error, auth] = await to(Auth.verify(params.token, {
      key: authConfig['SECRET_KEY_ADMIN']
    }))
    if (error) throw new ApiException(6012, "The token has expired")
    let user = await this.Model.getById(auth.id);
    if (!user) throw new ApiException(6006, "User doesn't exist!")
    delete user.password
    return user
  }

  async resetPassword() {
    const allowFields = {
      token: "string!",
      newPassword: "string!"
    }
    let inputs = this.request.all()
    let params = this.validate(inputs, allowFields, { removeNotAllow: true });
    let [error, auth] = await to(Auth.verify(params.token, {
      key: authConfig['SECRET_KEY_ADMIN']
    }))
    if (error) throw new ApiException(6012, "The token has expired")
    let user = await this.Model.getById(auth.id);
    if (!user) throw new ApiException(6006, "User doesn't exist!")
    let hash = await this.Model.hash(params.newPassword)
    return await this.Model.updateOne(user.id, { password: hash })
  }

  async changePassword() {
    let inputs = this.request.all()
    const allowFields = {
      password: "string!"
    }
    let data = this.validate(inputs, allowFields, { removeNotAllow: true });
    const auth = this.request.auth || {};
    const id = auth.id;
    let user = await this.Model.query().findById(id);
    if (!user) throw new ApiException(6006, "User doesn't exist!")
    let result = await user.changePassword(data['password'])
    delete result['password']
    return result
  }
}
