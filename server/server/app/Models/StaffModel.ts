import BaseModel from './BaseModel'

class StaffModel extends BaseModel {

  static tableName = "staffs"

  //fields
  id: number;
  name: string;
  birth: string;
  tel: string;
  deparmentId: number;
  createdAt: Date;
  createdBy: number;

}

export default StaffModel
