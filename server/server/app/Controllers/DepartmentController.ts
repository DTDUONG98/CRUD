import BaseController from './BaseController'
import DeparmentModel from "@app/Models/DeparmentModel";
import DepartmentTechModel from '@app/Models/DepartmentTechModel';
import TechStackModel from '@app/Models/TechStackModel';
import StaffModel from '@app/Models/StaffModel';

import ApiException from '../Exceptions/ApiException';

export default class DepartmentController extends BaseController {

  Model: typeof DeparmentModel = DeparmentModel;
  DepartmentTechModel = DepartmentTechModel;
  TechStackModel = TechStackModel;
  StaffModel = StaffModel;

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
      let techIds: number[] = department_techs.map( e => e.techId);
  
      let techs = (techIds.length) ? await this.TechStackModel.query()
        .whereIn("id", techIds)
        .select(["*"]) : [];
      let staffs = await this.StaffModel.query()
        .where("deparmentId", department.id)
        .select(["*"]);
  
      results.push({
        ...department,
        tech_stacks: techs,
        staffs: staffs
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
    
    department = {
      ...department,
      tech_stacks: techs,
      staffs: staffs
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
    let dataDepartment = {
      id: params['id'],
      name: params['name'],
      functions: params['functions'],
      mission: params['mission'],
      description: params['description']
    }
    // Check isExist
    let exist = await this.Model.getById(dataDepartment.id);
    if (!exist) throw new ApiException(6000, "Department doesn't exist!");
    const id: number = dataDepartment.id;
    delete dataDepartment.id;
    let updateDepartment = await this.Model.updateOne(id, dataDepartment);

    /**
     * Update DepartmentTech
     */
    let techIds: number[] = params['techIds'];
    // Check techId exist
    let existTechIds: number[] = [];
    techIds.map(async e => {
      let exist = await this.TechStackModel.getById(e);
      if (exist) existTechIds.push(e);
    })
    techIds = existTechIds; // asign again to techIds

    if (techIds.length) {

      let departmentTechs: any[] = await  this.DepartmentTechModel.getByCondition({deparmentId: id});
      let techIdDBs: number[] = departmentTechs.map(e => e.techId);
      let insertIds:number[] = [];
      let deleteIds:number[] = [];
      
      techIds.map( e => {
        if (!techIdDBs.includes(e)) insertIds.push(e);
      });
      techIdDBs.map( e => {
        if (!techIds.includes(e)) deleteIds.push(e);
      });
      // Save data
      let dataInserts = insertIds.map(e => ({
        deparmentId: id,
        techId: e
      }));
      if (dataInserts.length) await this.DepartmentTechModel.insertMany(dataInserts);
      let dataDeletes = deleteIds.map( e => ({
        deparmentId: id,
        techId: e
      }));
      if (dataDeletes) {
        await Promise.all(dataDeletes.map( e => this.DepartmentTechModel.deleteByCondition(e)))
      }
    }

    return {
      department: await this.Model.getById(id),
      department_techs: await this.DepartmentTechModel.getByCondition({deparmentId: id})
    }
  }
}
