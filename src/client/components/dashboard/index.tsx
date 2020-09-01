import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Interviews from "./interviews/";

class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
  render() {
    return (
      <>
        <div className="bg-info text-center text-white">
          <h1>Dashboard</h1>
        </div>
        <div>
          <Interviews />
        </div>
      </>
    );
  }
}

interface IDashboardProps {}
interface IDashboardState {}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(Dashboard);
