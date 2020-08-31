import * as React from "react";
import Main from "./main";
import Dashboard from "../dashboard";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Home extends React.Component<IHomeProps, IHomeState> {
  static PropTypes: { isAuthorised: PropTypes.Requireable<boolean> };
  render() {
    const { isAuthorised } = this.props;

    return <>{isAuthorised ? <Dashboard /> : <Main />}</>;
  }
}
export interface IHomeProps {
  isAuthorised: boolean;
}

export interface IHomeState {}

const mapStateToProps = (state) => ({
  isAuthorised: state.user.isAuthorised,
});

export default connect(mapStateToProps, null)(Home);
