import Route from '@core/Routes'
/**
 * Route:
 * Function:
 *    Method: get, post, put, delete, resource
 *    Route.<method>(path, Action).middleware([middleware1, middleware2])
 *    Ex: Route.get("/user", "UserController.index").middleware([auth])
 *    Route.resource("/user", "UserController")
 *
 *    Route.group(() =>{...}).prefix(path).middleware([middleware1, middleware2])
 *    Ex: Route.group(() =>{
 *        Route.get("/user", "UserController.index")
 *        Route.group("/user", "UserController.index")
 *        require("./setting") //load all router in ./setting.js
 *    }).prefix("/api/v1").middleware([auth])
 */
require("./api")

require("./admin")
Route.get(`/staff/login`, `pages/staff/dncAccounts/login`).name(`staffLogin.index`).sidebar(`staffLogin.index`)
Route.get("/health", function ({ request, response, next }) {
  response.status(200).send("OK");
})

Route.router.use("/", require("express").static('@root/../public'));

