import BaseModel from './BaseModel'

class TeckStackModel extends BaseModel {

  static tableName = "tech_stacks"

  //fields
  id: number;
  name: string;
  description: string;
  status: string;
  createdAt: Date;
  createdBy: number;

}

export default TeckStackModel
