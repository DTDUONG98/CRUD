import BaseModel from './BaseModel'

class StaffTechModel extends BaseModel {

  static tableName = "staff_techs"

  //fields
  id: number;
  description: string;
  techId: number;
  staffId: number;
  createdAt: Date;
  createdBy: number;

}

export default StaffTechModel
