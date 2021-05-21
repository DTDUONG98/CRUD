import BaseController from './BaseController';
import IssueModel from '@app/Models/IssueModel';
import _ from 'lodash';
import ApiException from '../Exceptions/ApiException';

export default class IssueController extends BaseController {

    Model = IssueModel;

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
        let projectId = params['projectId'];
        if (!projectId) throw new ApiException(9996, "projectID is required!");
        
        let data = await this.Model.query().getForGridTable(inputs);
        return data;
    }
}