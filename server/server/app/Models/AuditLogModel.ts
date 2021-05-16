import BaseModel from './BaseModel'

class AuditLogModel extends BaseModel {
  static tableName = "audit_logs"

  //fields
  id: string;
  userId: number;
  groupId: number;
  controller: string;
  action: string;
  description: string;
  highLevel: string;
  detailLevel: string;
  remarks: string;
  createdAt: Date;
  updatedAt: Date;

}

export default AuditLogModel
