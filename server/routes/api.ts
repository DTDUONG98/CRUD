import Route from '@core/Routes'
const ExtendMiddleware = require("@app/Middlewares/ExtendMiddleware");

const AuthApiMiddleware = require('@app/Middlewares/AuthApiMiddleware');
//const { permission, permissionResource, permissionMethod } = require('@app/Middlewares/PermissionMiddleware');

Route.group(() => {
  // Route don't need verify
  Route.group(() => {

    Route.resource("/departments", "DepartmentController").name('departments')
    Route.resource('/project_types', "ProjectTypeController").name('project_types')
    Route.resource('/project_status', "ProjectStatusController").name("project_status")
    Route.resource('/customer_groups', "CustomerGroupController").name("customer_groups")
  }).middleware([]);

  // ---------------------------------- Auth Routes ---------------------------------------//
  Route.post("/login", "AuthController.login").name('auth.login')
  Route.post("/forgotPassword", "AuthController.forgotPassword").name('auth.forgotPassword')
  Route.get("/checkToken/:token", "AuthController.checkToken").name('auth.checkToken')
  Route.post("/resetPassword", "AuthController.resetPassword").name('auth.resetPassword')
  // ---------------------------------- End Auth Routes -----------------------------------//

  // ---------------------------------- Route Routes ---------------------------------------//
  Route.get("/routes", "RouteController.index").name('routes.index')
  // ---------------------------------- End Route Routes -----------------------------------//
  Route.group(() => {
    Route.post("/changePassword", "AuthController.changePassword").name("auth.changePassword")
    Route.post("/logout", "AuthController.logout").name('auth.logout')

    // ---------------------------------- Admin Routes ---------------------------------------//
    Route.resource("/admins", "AdminController").name('admins')
    Route.post("/admins/loginAs", "AdminController.loginAs").name('admins.loginAs')
    Route.get("/admins/generateOTP", "AdminController.generateOTP").name('admins.generateOTP')
    Route.post("/admins/submitOTP", "AdminController.submitOTP").name('admins.submitOTP')
    // ---------------------------------- End Admin Routes -----------------------------------//

    // ---------------------------------- Role Permission Routes ---------------------------------------//
    Route.get("/rolePermissions/getPermissionByGroupId", "RolePermissionController.getPermissionByGroupId").name('rolePermissions.getPermissionByGroupId')
    // ---------------------------------- End Role Permission Routes -----------------------------------//

    // ---------------------------------- Role Group Permission Routes ---------------------------------//
    Route.put("/roleGroupPermissions/update", "RoleGroupPermissionController.update").name('roleGroupPermissions.update')
    // ---------------------------------- End Role Group Permission Routes -----------------------------//

    // ---------------------------------- Role Group Routes ---------------------------------------//
    Route.resource("/roleGroups", "RoleGroupController").name('roleGroups')
    Route.get("/roleGroups/select2", "RoleGroupController.select2").name('roleGroups.select2')
    Route.get("/roleGroups/selectParent", "RoleGroupController.selectParent").name('roleGroups.selectParent')
    // ---------------------------------- End Role Group Routes -----------------------------------//

    // ---------------------------------- Group Routes ---------------------------------------//
    Route.resource("/groups", "GroupController").name('groups')
    Route.get("/groups/select2", "GroupController.select2").name('groups.select2')
    Route.get("/groups/selectParent", "GroupController.selectParent").name('groups.selectParent')
    // ---------------------------------- End Group Routes -----------------------------------//

  }).middleware([AuthApiMiddleware]);

}).middleware([ExtendMiddleware]).name('api').prefix("/api/v1")
