import BaseModel from './BaseModel'

class ProjectStatusModel extends BaseModel {

  static tableName = "project_status"

  //fields
  id: number;
  name: string;
  description: string;
  status: string;
  createdAt: Date;
  createdBy: number;

}

export default ProjectStatusModel
