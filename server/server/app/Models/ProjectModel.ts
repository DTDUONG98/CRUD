import BaseModel from './BaseModel'

class ProjectModel extends BaseModel {

  static tableName = "projects"

  //fields
  id: number;
  name: string;
  statusId: number;
  typeId: number;
  deparmentId: number;
  createdAt: Date;
  createdBy: number;

}

export default ProjectModel
