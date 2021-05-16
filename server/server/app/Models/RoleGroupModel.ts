import BaseModel from './BaseModel'

class RoleGroupModel extends BaseModel {
  static tableName = "role_groups"

  //fields
  id: number;
  name: string;
  description: any;
}

export default RoleGroupModel
