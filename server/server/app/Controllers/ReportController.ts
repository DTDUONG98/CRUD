import BaseController from './BaseController';
import ProjectModel from '@app/Models/ProjectModel';
import ProjectTypeModel from '@app/Models/ProjectTypeModel';
import ProjectStatusModel from '@app/Models/ProjectStatusModel';
import TechStackModel from '@app/Models/TechStackModel';

import _ from 'lodash';

export default class ReportController extends BaseController {

    ProjectModel = ProjectModel;
    ProjectTypeModel = ProjectTypeModel;
    ProjectStatusModel = ProjectStatusModel;
    TechStackModel = TechStackModel;

    async getStatisticProject() {

        let inputs = this.request.all();
        let allowFields = {
            statusId: "number",
            typeId: "number",
            techId: "number",
            startDate: "string",
            endDate: "string",
        }
        let params = this.validate(inputs, allowFields, {removeNotAllow: false});
        const select = [`projects.typeId as typeId`, `projects.statusId as statusId`, `project_techs.techId as techId`];
        let query = this.ProjectModel.query()
            query.join("project_techs", "project_techs.projectId", "projects.id");
        
        /**
         * Filter
         */
        for (let key in params) {

            switch(key) {
                case "statusId": {
                    if (params['statusId']) query.where("projects.statusId", params['statusId']);
                    break;
                }
                case "typeId": {
                    if (params['typeId']) query.where("projects.typeId", params['typeId']);
                }
                case "startDate": {
                    if (params['startDate']) query.where("projects.createdAt", ">=", params['startDate']);
                    break;
                }
                case "endDate": {
                    if (params['endDate']) query.where("projects.createdAt", "<=", params['endDate']);
                    break;
                }
                case "techId": {
                    if (params['techId']) {
                        query.where("project_techs.techId", params['techId']);           
                    }
                    break;
                }
            }
        }

        let records: any[] = await query
            .groupByRaw(`("projects"."typeId", "projects"."statusId", "techId")`)
            .count('*', {as: 'total'})
            .select(select);

        let results: any[] = [];
        await Promise.all(
            records.map( async e => {

                let project_type: any = await this.ProjectTypeModel.getById(e.typeId);
                let project_status: any = await this.ProjectStatusModel.getById(e.statusId);
                let tech_stacks: any = await this.TechStackModel.getById(e.techId);
                
                results.push({
                    ...e,
                    project_status,
                    project_type,
                    tech_stacks
                })
            })
        )
        return results;
    }
}