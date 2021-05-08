import BaseModel from './BaseModel'
import ApiException from '@app/Exceptions/ApiException'
import GroupModel from "./GroupModel"
const bcrypt = require("bcrypt")
const authConfig = require("@config/auth")

class AdminModel extends BaseModel {
  static tableName = "admins"

  //fields
  id: number;
  username: string;
  password: string;
  groupId: number;
  firstName: string;
  email: string;
  lastName: string;
  twofaSecret?: string;

  static get relationMappings() {
    return {
      group: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: GroupModel,
        join: {
          from: `${this.tableName}.groupId`,
          to: 'groups.id'
        }
      }
    }
  }

  static async checkLogin({ username, password }) {
    const user = await this.query().findOne({ username: username });
    if (!user) return false;
    let checkPassword = await this.compare(password, user.password);
    delete user.password;
    if (checkPassword) return user;
    return false;
  }

  static async hash(plainPassword) {
    return await bcrypt.hash(plainPassword + authConfig.SECRET_KEY, 10)
  }

  static async compare(plainPassword, encryptedPassword) {
    return await bcrypt.compare(plainPassword + authConfig.SECRET_KEY, encryptedPassword)
  }

  async changePassword(newPassword) {
    newPassword = await AdminModel.hash(newPassword)
    return await this.$query().patchAndFetchById(this.id, {
      password: newPassword
    })
  }

  static async getInfoAuth(auth) {
    let result = await this.query().withGraphJoined('group').where('admins.id', auth.id).first()
    if (!result) throw new ApiException(6006, "User doesn't exist!")
    return result
  }

}

export default AdminModel
