import BaseModel from './BaseModel'

class DepartmentTechModel extends BaseModel {

  static tableName = "deparment_techs"

  //fields
  id: number;
  deparmentId: number;
  techId: number;
  createdAt: Date;
  createdBy: number;

}

export default DepartmentTechModel
