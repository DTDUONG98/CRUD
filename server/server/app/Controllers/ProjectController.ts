import BaseController from './BaseController'
import ProjectModel from '@app/Models/ProjectModel';
import ProjectTypeModel from '@app/Models/ProjectTypeModel';
import ProjectStatusModel from '@app/Models/ProjectStatusModel';
import TechStackModel from '@app/Models/TechStackModel';
import DeparmentModel from '@app/Models/DeparmentModel';
import StaffModel from '@app/Models/StaffModel';
import ProjectTechModel from '@app/Models/ProjectTechModel';
import ProjectStaffModel from '@app/Models/ProjectStaffModel';

import ApiException from '../Exceptions/ApiException';

export default class ProjectController extends BaseController {

    Model = ProjectModel;
    ProjectTypeModel = ProjectTypeModel;
    ProjectStatusModel = ProjectStatusModel;
    TechStackModel = TechStackModel;
    DeparmentModel = DeparmentModel;
    StaffModel = StaffModel;
    ProjectTechModel = ProjectTechModel;
    ProjectStaffModel = ProjectStaffModel;

    async index() {

        let inputs = this.request.all();
        let records = await this.Model.query().getForGridTable(inputs);
        let projects = records.data || [];
        let results: any[] = [];
        await Promise.all(

            projects.map(async project => {
                const projectId: number = project.id;
                /**
                 * Get Department
                 */
                let departmentId = project.deparmentId;
                let department = await this.DeparmentModel.getById(departmentId);
                /**
                 * Get ProjectType
                 */
                let projectTypeId = project.typeId;
                let projectType = await this.ProjectTypeModel.getById(projectTypeId);
                /**
                 * Get ProjectStatus
                 */
                let projectStatusId = project.statusId;
                let projectStatus = await this.ProjectStatusModel.getById(projectStatusId);
                /**
                 * Get TechStack
                 */
                let techs = await this.TechStackModel.query()
                    .join("project_techs", "project_techs.techId", "tech_stacks.id")
                    .where("project_techs.projectId", projectId)
                    .select(["tech_stacks.*"]);
                /**
                 * Get Staff
                 */
                let staffs = await this.StaffModel.query()
                    .join("project_staffs", "project_staffs.staffId", "staffs.id")
                    .where("project_staffs.projectId", projectId)
                    .select(["staffs.*"]);

                results.push({
                    ...project,
                    department,
                    projectType,
                    projectStatus,
                    techs,
                    staffs
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
        }
        let params = this.validate(inputs, allowFields, { removeNotAllow: false });
        const projectId: number = params['id'];
        if (!projectId) throw new ApiException(9996, "ID is required!");

        let project = await this.Model.getById(projectId);
        if (!project) throw new ApiException(6000, "Project doesn't exist!");

        /**
         * Get Department
         */
        let departmentId = project.deparmentId;
        let department = await this.DeparmentModel.getById(departmentId);
        /**
         * Get ProjectType
         */
        let projectTypeId = project.typeId;
        let projectType = await this.ProjectTypeModel.getById(projectTypeId);
        /**
         * Get ProjectStatus
         */
        let projectStatusId = project.statusId;
        let projectStatus = await this.ProjectStatusModel.getById(projectStatusId);
        /**
         * Get TechStack
         */
        let techs = await this.TechStackModel.query()
            .join("project_techs", "project_techs.techId", "tech_stacks.id")
            .where("project_techs.projectId", projectId)
            .select(["tech_stacks.*"]);
        /**
         * Get Staff
         */
        let staffs = await this.StaffModel.query()
            .join("project_staffs", "project_staffs.staffId", "staffs.id")
            .where("project_staffs.projectId", projectId)
            .select(["staffs.*"]);

        return {
            ...project,
            department,
            projectType,
            projectStatus,
            techs,
            staffs
        }
    }

    async store() {

        let inputs = this.request.all();
        let allowFields = {
            name: "string",
            typeId: "number",
            statusId: "number",
            deparmentId: "number",
            techIds: ["number"],
            staffIds: ["number"],
        }
        let params = this.validate(inputs, allowFields, { removeNotAllow: false });

        let dataProject = {
            name: params['name'],
            typeId: params['typeId'],
            statusId: params['statusId'],
            deparmentId: params['deparmentId']
        }

        let projectInserted = await this.Model.insertOne(dataProject);
        const projectId: number = projectInserted.id;

        /**
         * Insert techIds
         */
        let techs: any[] = [];
        if (Array.isArray(params['techIds'])) {
            let data: any[] = params['techIds'].map(techId => ({
                projectId: projectId,
                techId: techId
            }));
            techs = await this.ProjectTechModel.insertMany(data);
        }
        /**
         * Insert staffIds
         */
        let staffs: any[] = [];
        if (Array.isArray(params['staffIds'])) {
            let data: any[] = params['staffIds'].map(staffId => ({
                projectId: projectId,
                staffId: staffId
            }));

            staffs = await this.ProjectStaffModel.insertMany(data);
        }

        return {
            ...projectInserted,
            techs,
            staffs
        };
    }

}