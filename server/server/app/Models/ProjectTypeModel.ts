import BaseModel from './BaseModel'

class ProjectTypeModel extends BaseModel {

  static tableName = "project_types"

  //fields
  id: number;
  name: string;
  description: string;
  status: string;
  priority: number;
  createdAt: Date;
  createdBy: number;

}

export default ProjectTypeModel
