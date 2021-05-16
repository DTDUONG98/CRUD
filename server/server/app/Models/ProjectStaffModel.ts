import BaseModel from './BaseModel'

class ProjectStaffModel extends BaseModel {

  static tableName = "project_staffs"

  //fields
  id: number;
  projectId: number;
  staffId: number;
  createdAt: Date;
  createdBy: number;

}

export default ProjectStaffModel
