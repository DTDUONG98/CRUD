import _debug from 'debug'
const debug = _debug('@ngochipx:dnc')
import AuditLogModel from '@app/Models/AuditLogModel'
import MailService from '@app/Services/Mail'
import auditLogs from '@config/auditLog'
import _ from 'lodash'
const LARGE_ACTION = ["WhiteNumberController.store", "BlackNumberController.store", "MNOController.store"]
const PARAMS_REMOVE = ['password', 'otp', 'secret']

class AuditLog {
  static async send(auth, controller, action, method: string = '', data, dataT) {
    if (method.toLowerCase() == 'get' && (!["CdrController", "ExcelController"].includes(controller) || !["exportExcel"].includes(action))) {
      return
    }
    const description = {...this.filterData(controller, action, data)}
    try {
      let type = controller.replace(/Controller/, "").toLowerCase()
      let dataInsert = await this.convertData({ auth, type, description, action, dataT })
      if(Object.values(dataInsert).length) {
        console.log("dataInsert", dataInsert)
        await AuditLogModel.query().insert(dataInsert)
      }
    }
    catch(e){
      console.log("e", e)
    }
  }

  static filterData(controller, action, data) {
    let route = `${controller}.${action}`
    //filter param not allowed
    for (let param of PARAMS_REMOVE) {
      delete data[param]
    }

    //filter large data
    if (!LARGE_ACTION.includes(route)) return data;
    if (route == "MNOController.store") {
      data['data'] = data['mno'];
      delete data['mno']
    }
    data['data'] = data['data'].length;
    return data;
  }

  static async convertData({auth, action, description, type, dataT}) {
    let dataType = _.get(auditLogs, `[${type}]`, {})
    if(!Object.values(dataType).length) return {}
    let controller = dataType.controller
    let userId = auth.id
    let groupId = auth.groupId
    let actionT = dataType['items'][action]['action']
    let highLevel = dataType['items'][action]['highLevel']
    let detailLevel = dataType['items'][action]['detailLevel']
    console.log("type", type, actionT)

    //auth
    if(['auth'].includes(type) && ['username'].includes(highLevel)) {
      if(['forgotPassword'].includes(action)) {
        highLevel = _.get(dataT, highLevel, "")
        userId = _.get(dataT, "id", "")
        groupId = _.get(dataT, "groupId", "")
      }
      else highLevel = _.get(description, highLevel, "")
      if(['login'].includes(action)) {
        userId = _.get(dataT, "user.id", "")
        groupId = _.get(dataT, "user.groupId", "")
      }
    }

    //group
    if(['group', 'admin'].includes(type)) {
      if(['name', 'username'].includes(highLevel) && ["store"].includes(action)) {
        highLevel = _.get(description, `${highLevel}`, "")
      }
      if(typeof detailLevel !== "string" && ["update"].includes(action)) {
        highLevel = _.get(description, `${highLevel}`, "")
        const { fields } = detailLevel
        let changes = this.checkChanges(dataT.old, description, fields)
        let texts = []
        for(let key in changes) {
          texts.push(`${_.startCase(key)}: ${_.get(changes, `[${key}]['old']`, "")} changed to ${_.get(changes, `[${key}]['new']`, "")}`)
        }
        detailLevel = texts.join(',\n ')
      }
      if(["destroy", "delete"].includes(action)) {
        let group = dataT.old
        highLevel = _.get(group, `${highLevel}`, "")
      }

      if(["submitOTP"].includes(action)) {
        let { enable } = description
        controller = '2FA'
        actionT = enable ? 'Enable' : 'Disable'
        highLevel = _.get(auth, highLevel, "")
      }
    }

    //mno
    if(['mno'].includes(type)) {
      let { isType, data } = description
      highLevel = _.get(highLevel, `${isType}`, "")
      detailLevel = MailService.makeContent(detailLevel, { data: data || 0 })
    }

    //agent
    if(['agent'].includes(type)) {
      if(["store"].includes(action)) {
        let { isType } = description
        highLevel = _.get(highLevel, `${isType}`, "")
        let { inserted, deleted, error } = dataT
        detailLevel = _.get(detailLevel, `${isType}`, "")
        detailLevel = MailService.makeContent(detailLevel, { inserted, deleted, errors: error })
      }
      if(typeof detailLevel !== "string" && ["update"].includes(action)) {
        highLevel = _.get(description, `${highLevel}`, "")
        const { fields } = detailLevel
        let changes = this.checkChanges(dataT.old, description, fields)
        let texts = []
        for(let key in changes) {
          texts.push(`${_.startCase(key)}: ${_.get(changes, `[${key}]['old']`, "")} changed to ${_.get(changes, `[${key}]['new']`, "")}`)
        }
        detailLevel = texts.join(',\n ')
      }
      if(["destroy", "delete"].includes(action)) {
        let agent = dataT.old
        highLevel = _.get(agent, `${highLevel}`, "")
      }
    }

    //blacklist, whitelist
    if(['blacknumber', 'whitenumber'].includes(type)) {
      let { isType } = description
      highLevel = _.get(highLevel, `${isType}`, "")
      let { inserted, deleted, error } = dataT
      detailLevel = _.get(detailLevel, `${isType}`, "")
      detailLevel = MailService.makeContent(detailLevel, { inserted, deleted, errors: error })
    }

    //Money Threshold
    if(['setting'].includes(type) && ["update"].includes(action)) {
      highLevel = _.get(description, highLevel, "")
    }

    return {
      groupId: groupId,
      userId: userId,
      controller: controller,
      action: actionT,
      description: JSON.stringify(description),
      highLevel, detailLevel
    }
  }

  static checkChanges(oldData, newData, keys) {
    let changes = {}
    for (let key in keys) {
      if (oldData[key] == null && newData[key] == null) continue; // null thì bỏ qua
      let oldDataStr = oldData[key]
      let newDataStr = newData[key]

      //Nếu mang kiểu là number
      if (["number"].includes(keys[key])) {
        oldDataStr = Number(oldData[key])
        newDataStr = Number(newData[key])
      }

      if (oldDataStr != newDataStr) {
        changes[key] = {
          old: oldDataStr,
          new: newDataStr
        }
      }
    }
    console.log("changes", changes)
    return changes;
  }
}

export default AuditLog
