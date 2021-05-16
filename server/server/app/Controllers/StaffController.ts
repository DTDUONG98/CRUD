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

    let inputs = this.request.all();
    let records = await this.StaffModel.query().getForGridTable(inputs);
    let staffs = records.data || [];
    let results: any[] = [];
    await Promise.all(

      staffs.map(async e => {
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
          .whereIn("id", projectIds)
          .select(["*"]) : [];

        results.push({
          ...e,
          techs,
          projects
        })
      })
    );

    return {
      ...records,
      data: results
    };
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
    let projectIds: number[] = projectStaffs.map(e => e.projectId);
    let projects = (projectIds.length) ? await this.ProjectModel.query()
      .whereIn("id", projectIds)
      .select(["*"]) : [];

    return {
      ...staff,
      techs,
      projects
    }
  }

  async store() {

    let inputs = this.request.all();
    let allowFields = {
      name: "string",
      birth: "string",
      tel: "string",
      deparmentId: "number",
      techIds: ["number"]
    }

    let params = this.validate(inputs, allowFields, { removeNotAllow: false });
    let dataStaff = {
      name: params['name'],
      birth: params['birth'],
      tel: params['tel'],
      deparmentId: params['deparmentId']
    }

    let insertedStaff = await this.Model.insertOne(dataStaff);
    const staffId: number = insertedStaff.id;

    let techIds: number[] = params.techIds || [];
    let staff_techs: any[] = [];
    if (techIds.length) {
      let data: any[] = techIds.map(techId => ({ techId, staffId }));
      staff_techs = await this.StaffTechModel.insertMany(data);
    }

    return {
      staff: insertedStaff,
      staff_techs
    }
  }
}
