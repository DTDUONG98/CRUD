import BaseModel from './BaseModel'

class StaffTechModel extends BaseModel {

    static tableName = "project_techs"

    //fields
    id: number;
    techId: number;
    projectId: number;
    createdAt: Date;
    createdBy: number;

}

export default StaffTechModel
