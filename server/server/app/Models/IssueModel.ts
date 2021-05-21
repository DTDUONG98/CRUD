import BaseModel from './BaseModel'

class IssueModel extends BaseModel {

  static tableName = "issues"

  //fields
  id: number;
  name: string;
  description: string;
  status: string;
  projectId: number;
  createdAt: Date;
  createdBy: number;

}

export default IssueModel
