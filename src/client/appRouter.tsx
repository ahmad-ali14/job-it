import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home";

class AppRouter extends React.Component<IAppRouterProps, IAppRouterState> {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            {" "}
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}
export interface IAppRouterProps {}

export interface IAppRouterState {}
export default AppRouter;
