import BaseController from './BaseController'
import DeparmentModel from "@app/Models/DeparmentModel";
import DepartmentTechModel from '@app/Models/DepartmentTechModel';
import TechStackModel from '@app/Models/TechStackModel';
import StaffModel from '@app/Models/StaffModel';
import ProjectModel from '@app/Models/ProjectModel'

import ApiException from '../Exceptions/ApiException';

export default class DepartmentController extends BaseController {

  Model: typeof DeparmentModel = DeparmentModel;
  DepartmentTechModel = DepartmentTechModel;
  TechStackModel = TechStackModel;
  StaffModel = StaffModel;
  ProjectModel = ProjectModel;

  async index() {

    let inputs = this.request.all();

    let records = await this.Model
      .query()
      .getForGridTable(inputs);
    let departments = records.data || [];
    let results: any[] = [];
    for (let department of departments) {

      let department_techs = await this.DepartmentTechModel.query()
        .where("deparmentId", "=", department.id)
        .select(["*"]);
      let techIds: number[] = department_techs.map(e => e.techId);

      let techs = (techIds.length) ? await this.TechStackModel.query()
        .whereIn("id", techIds)
        .select(["*"]) : [];
      let staffs = await this.StaffModel.query()
        .where("deparmentId", department.id)
        .select(["*"]);
      /**
       * Get Project
       */
      let projects = await this.ProjectModel.query()
        .where("deparmentId", department.id)
        .select(["*"]);

      results.push({
        ...department,
        tech_stacks: techs,
        staffs: staffs,
        projects
      });
    }

    return {
      ...records,
      data: results
    };
  }

  async detail() {

    let params = this.request.all()
    let id = params.id;
    if (!id) throw new ApiException(9996, "ID is required!");
    let department: any = await this.Model.query().findById(id);
    if (!department) {
      throw new ApiException(7002, 'Data not found')
    }
    let department_techs = await this.DepartmentTechModel.query()
      .where("deparmentId", "=", department.id)
      .select(["*"]);
    let techIds: number[] = department_techs.map(e => e.techId);

    let techs = (techIds.length) ? await this.TechStackModel.query()
      .whereIn("id", techIds)
      .select(["*"]) : [];
    let staffs = await this.StaffModel.query()
      .where("deparmentId", department.id)
      .select(["*"]);
    /**
       * Get Project
       */
    let projects = await this.ProjectModel.query()
      .where("deparmentId", department.id)
      .select(["*"]);

    department = {
      ...department,
      tech_stacks: techs,
      staffs: staffs,
      projects
    }
    return department;
  }

  async store() {

    let inputs = this.request.all();
    let allowFields = {
      name: "string",
      functions: "string",
      mission: "string",
      description: "string",
      techIds: ["number"]
    }
    let params = this.validate(inputs, allowFields, { removeNotAllow: false });
    let dataDepartment = {
      name: params['name'],
      functions: params['functions'],
      mission: params['mission'],
      description: params['description']
    }
    let inserted = await this.Model.insertOne(dataDepartment);
    let departmentId: number = inserted.id;
    let techIds: number[] = params['techIds'];
    let insertedDepartmentTech: any[];
    if (techIds.length) {
      let data: any[] = techIds.map(e => ({
        deparmentId: departmentId,
        techId: e
      }));
      insertedDepartmentTech = await this.DepartmentTechModel.insertMany(data);
    }

    return {
      department: inserted,
      department_techs: insertedDepartmentTech
    }
  }

  async update() {

    let inputs = this.request.all();
    let allowFields = {
      id: "number!",
      name: "string",
      functions: "string",
      mission: "string",
      description: "string",
      techIds: ["number"]
    }
    let params = this.validate(inputs, allowFields, { removeNotAllow: false });
    const deparmentId: number = params['id'];
    if (!deparmentId) throw new ApiException(9996, "ID is required!");


    let dataDepartment = {
      name: params['name'],
      functions: params['functions'],
      mission: params['mission'],
      description: params['description']
    }

    /**
     * Update DepartmentTech
     */
    let updateDepartment = await this.Model.updateOne(deparmentId, dataDepartment);
    /**
     * Update relation table : deparment_techs
     */
    await this.DepartmentTechModel.deleteByCondition({deparmentId: deparmentId});
    let techIds: number[] = params['techIds'] || [];
    let dataDepartmentTechs: any[] = techIds.map(techId => ({techId, deparmentId}));
    let updateDepartmentTech = await this.DepartmentTechModel.insertMany(dataDepartmentTechs);
    return {
      updateDepartment,
      updateDepartmentTech
    }
  }
}
