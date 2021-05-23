import BaseController from './BaseController';
import IssueModel from '@app/Models/IssueModel';
import ProjectModel from '@app/Models/ProjectModel';

import _ from 'lodash';
import ApiException from '../Exceptions/ApiException';

export default class IssueController extends BaseController {

    Model = IssueModel;
    ProjectModel = ProjectModel;

    async index() {

        let issues = await this.Model.getAll();
        let results = _.groupBy(issues, (e) => e.status);
        return results;
    }

    async getByProjectId() {

        let inputs = this.request.all();
        let allowFields = {
            projectId: "number!"
        }

        let params = this.validate(inputs, allowFields, {removeNotAllows: false});
        const projectId = params['projectId'];
        if (!projectId) throw new ApiException(9996, "projectID is required!");
        
        const project = await this.ProjectModel.getById(projectId);
        if (!project) throw new ApiException(7002, 'Project is not exist');
        
        let data = await this.Model.query()
            .where("projectId", projectId)
            .getForGridTable(inputs);
        return data;
    }
}