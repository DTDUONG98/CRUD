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

    let staffs = await this.StaffModel.getAll();
    let results: any[] = [];
    await Promise.all(

      staffs.map( async e => {
        const staffId: number = e.id;
        /**
         * Get tech_stacks
         */
        let techs = await this.TechStackModel.query()
          .join("staff_techs", "staff_techs.techId", "tech_stacks.id")
          .where("staff_techs.staffId", staffId)
          .select(["tech_stacks.*", "staff_techs.description as desscription"]);
        /**
         * Get Projects
         */
        let projectStaffs = await this.ProjectStaffModel.query()
          .where("staffId", staffId)
          .select(["*"]);
        let projectIds: number[] = projectStaffs.map(e => e.projectId);
        let projects = (projectIds.length) ? await this.ProjectModel.query()
          .whereIn("id", [projectIds])
          .select(["*"]) : [];
  
        results.push({
          ...e,
          techs,
          projects
        })
      })
    );

    return results;
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
    if (!staff) throw new ApiException(6000, "Staff doesn't exist!");
    /**
     * Get tech_stacks
     */
    let techs = await this.TechStackModel.query()
      .join("staff_techs", "staff_techs.techId", "tech_stacks.id")
      .where("staff_techs.staffId", id)
      .select(["tech_stacks.*", "staff_techs.description as desscription"]);
    /**
     * Get Projects
     */
    let projectStaffs = await this.ProjectStaffModel.query()
      .where("staffId", id)
      .select(["*"]);
    let projectIds: number[] = projectStaffs.map( e => e.projectId);
    let projects = (projectIds.length) ? await this.ProjectModel.query()
      .whereIn("id", [projectIds])
      .select(["*"]) : [];
    
    return {
      ...staff,
      techs,
      projects
    }
  }

}
