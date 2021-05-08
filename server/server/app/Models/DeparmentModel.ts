import BaseModel from './BaseModel'

class DeparmentModel extends BaseModel {

  static tableName = "deparments"

  //fields
  id: number;
  name: string;
  functions: string;
  mission: string;
  description: string;
  createdAt: Date;
  createdBy: number;

}

export default DeparmentModel
