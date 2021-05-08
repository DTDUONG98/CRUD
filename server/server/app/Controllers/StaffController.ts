import BaseController from './BaseController'
import StaffModel from "@app/Models/StaffModel";
import TechStackModel from '@app/Models/TechStackModel';
import ProjectModel from '@app/Models/ProjectModel';
import ProjectStaffModel from '@app/Models/ProjectStaffModel';
import StaffTechModel from '@app/Models/StaffTechModel';

import ApiException from '../Exceptions/ApiException';

export default class ProjectStatusController extends BaseController {

  Model = StaffModel;
  TechStackModel = TechStackModel;
  ProjectModel = ProjectModel;
  ProjectStaffModel = ProjectStaffModel;
  StaffTechModel = StaffTechModel;
  StaffModel = StaffModel;

  async index() {

  }

  async detail() {

    let inputs = this.request.all();
    let allowFields = {
      id: "number!"
    };
    let params = this.validate(inputs, allowFields, { removeNotAllow: false });
    const id = params["id"];
    if (!id) throw new ApiException(9996, "ID is required!");
    /**
     * Get Staff
     */
    let staff: any = await this.StaffModel.getById(id);
    /**
     * Get tech_stacks
     */
    let staffTechs = await this.StaffTechModel.query()
      .where("staffId", id)
      .select(["*"]);
    let techIds: number[] = staffTechs.map( e => e.techId);
    let techs = await this.TechStackModel.query()
      .whereIn("id", [techIds])
      .select(["*"]);
    /**
     * Get Projects
     */
    let projectStaffs = await this.ProjectStaffModel.query()
      .where("staffId", id)
      .select(["*"]);
    let projectIds: number[] = projectStaffs.map( e => e.projectId);
    let projects = await this.ProjectModel.query()
      .whereIn("id", [projectIds])
      .select(["*"]);
    
    return {
      ...staff,
      techs,
      projects
    }
  }

}
