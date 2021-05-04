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

export const routes = [
  {
    path: "/login",
    exact: true,
    component: LoginPage,
  },
  {
    path: "/category/project-type",
    exact: true,
    component: ProjectType,
  },
  {
    path: "/category/project-status",
    exact: true,
    component: ProjectStatus,
  },
  {
    path: "/category/tech-stack",
    exact: true,
    component: TechStack,
  },
  {
    path: "/category/customer-group",
    exact: true,
    component: CustomerGroup,
  },
  {
    path: "/manager/departments",
    exact: true,
    component: Departments,
  },
  {
    path: "/manager/staffs",
    exact: true,
    component: Staffs,
  },
  {
    path: "/manager/projects",
    exact: true,
    component: Projects,
  },
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
  {
    path: "/category/project-type/create",
    exact: true,
    component: ProjectTypeCreate,
  },
];
