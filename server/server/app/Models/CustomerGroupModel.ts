import BaseModel from './BaseModel'

class CustomerGroupModel extends BaseModel {

  static tableName = "customer_groups"

  //fields
  id: number;
  name: string;
  description: string;
  status: string;
  priority: number;
  createdAt: Date;
  createdBy: number;

}

export default CustomerGroupModel
