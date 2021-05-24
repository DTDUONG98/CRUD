import React from "react";
import "./App.css";
import { LoginPage } from "./page/login/login";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { routes } from "./routers/routers.config";
import { PageTransition } from "@steveeeie/react-page-transition";
import { Navbar } from "./components/navbar-header/navbar";
import { SidebarLeft } from "./components/sidebar-left/sidebar-left";
function App() {
  const reactRouter = () => {
    return routes.map((route, i) => {
      return (
        <Route
          path={route.path}
          key={i}
          exact={route.exact}
          component={route.component}
        />
      );
    });
  };
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Redirect from="/" exact to="/login" />
        <Route
          render={({ location }) => {
            return (
              <div className="App min-h-screen flex flex-row">
                <SidebarLeft />
                <div className="flex flex-col w-10/12">
                  <Navbar />
                  <PageTransition
                    preset="moveToRightFromLeft"
                    transitionKey={location.pathname}
                    enterAnimation="scaleUp"
                    exitAnimation="moveToRightFade"
                  >
                    <Switch location={location}>{reactRouter()}</Switch>
                  </PageTransition>
                </div>
              </div>
            );
          }}
        />
      </Switch>
    </Router>
  );
}
export default App;