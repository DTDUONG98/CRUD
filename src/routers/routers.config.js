import { LoginPage } from "../page/login/login";
import { ProjectType } from "../page/category/project-type/project.type";
import { CustomerGroup } from '../page/category/customer-group/customer-group';
import { ProjectStatus } from '../page/category/project-status/project-status';
import { TechStack } from '../page/category/tech-stack/tech-stack';
import { Departments } from '../page/manager/departments/departments';
import { Projects } from '../page/manager/project/projects';
import { Staffs } from '../page/manager/staffs/staffs';
import { ProjectQuantity } from '../page/report/project-quantity/project-quantity';
import { StaffsQuantity } from '../page/report/staff-quantity/staff-quantity';
import { ProjectTypeCreate } from '../page/category/project-type/create-project-type';
import { ProjectStatusCreate } from '../page/category/project-status/create-project-status';
import { TechStackCreate } from '../page/category/tech-stack/create-tech-stack';
import { CustomerGroupCreate } from '../page/category/customer-group/create-customer-group';
import { DepartmentsCreate } from '../page/manager/departments/create-departments';
import { StaffsCreate } from '../page/manager/staffs/staffs-create';
import { ProjectsCreate } from '../page/manager/project/create-projects';
import { CustomersDetails } from '../page/category/customer-group/detail-customer-group';
import { ProjectTypeDetails } from '../page/category/project-type/detail-project-type';
import { ProjectStatusDetails } from '../page/category/project-status/detail-project-status';
import { DetailTechStack } from '../page/category/tech-stack/detail-tech-stack';
import { DetailStaffs } from '../page/manager/staffs/detail-staff';
import { DetailProjects } from '../page/manager/project/detail-projects';

export const routes = [
  // login
  {
    path: "/login",
    exact: true,
    component: LoginPage,
  },


  // category porject type
  {
    path: "/category/project-type",
    exact: true,
    component: ProjectType,
  },
  {
    path: "/category/project-type/create",
    exact: true,
    component: ProjectTypeCreate,
  },
  {
    path: "/category/project-type/:id",
    exact: true,
    component: ProjectTypeDetails,
  },

  // category project status
  {
    path: "/category/project-status",
    exact: true,
    component: ProjectStatus,
  },
  {
    path: "/category/project-status/create",
    exact: true,
    component: ProjectStatusCreate,
  },
  {
    path: "/category/project-status/:id",
    exact: true,
    component: ProjectStatusDetails,
  },

  // catrgory tech stack
  {
    path: "/category/tech-stack",
    exact: true,
    component: TechStack,
  },
  {
    path: "/category/tech-stack/create",
    exact: true,
    component: TechStackCreate,
  },
  {
    path: "/category/tech-stack/:id",
    exact: true,
    component: DetailTechStack,
  },

  // category customer group
  {
    path: "/category/customer-group",
    exact: true,
    component: CustomerGroup,
  },
  {
    path: "/category/customer-group/create",
    exact: true,
    component: CustomerGroupCreate,
  },
  {
    path: "/category/customer-group/:id",
    exact: true,
    component: CustomersDetails,
  },

  // manager department
  {
    path: "/manager/departments",
    exact: true,
    component: Departments,
  },
  {
    path: "/manager/departments/create",
    exact: true,
    component: DepartmentsCreate,
  },


  // manager staff
  {
    path: "/manager/staffs",
    exact: true,
    component: Staffs,
  },
  {
    path: "/manager/staffs/create",
    exact: true,
    component: StaffsCreate,
  },
  {
    path: "/manager/staffs/:id",
    exact: true,
    component: DetailStaffs,
  },


  // manager projects
  {
    path: "/manager/projects",
    exact: true,
    component: Projects,
  },
  {
    path: "/manager/projects/create",
    exact: true,
    component: ProjectsCreate,
  },
  {
    path: "/manager/projects/:id",
    exact: true,
    component: DetailProjects,
  },

  // report 
  {
    path: "/report/project-quantity",
    exact: true,
    component: ProjectQuantity,
  },
  {
    path: "/report/staff-quantity",
    exact: true,
    component: StaffsQuantity,
  },
];
