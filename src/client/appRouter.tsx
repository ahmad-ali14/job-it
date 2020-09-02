import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home";

class AppRouter extends React.Component<IAppRouterProps, IAppRouterState> {
  render() {
    return (
      <div style={{ minHeight: "100vh" }} className="m-3">
        <Router>
          <Switch>
            <Route exact path="/">
              {" "}
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
export interface IAppRouterProps {}

export interface IAppRouterState {}
export default AppRouter;
