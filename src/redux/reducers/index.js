import { combineReducers } from 'redux';
import customerReducer from '../../modules/customer-group/customer-group.reducer';
import projectTypeReducer from '../../modules/project-type/project-type.reducers';
import projectStatusReducer from '../../modules/project-status/project-status.reducer';
import techStackReducer from '../../modules/tech-stack/tech-stack.reducer';
import departmentReducer from '../../modules/departments/department.reducer';
import projectsReducer from '../../modules/projects/projects.reducer';
import staffsReducer from '../../modules/staffs/staffs.reducer';
import reportReducer from '../../modules/report-project/report-project.reducer';

const rootReducer = combineReducers({
    customer: customerReducer,
    projectType: projectTypeReducer,
    projectStatus: projectStatusReducer,
    techStack: techStackReducer,
    department: departmentReducer,
    projects: projectsReducer,
    staffs: staffsReducer,
    report: reportReducer,
});

export default rootReducer;