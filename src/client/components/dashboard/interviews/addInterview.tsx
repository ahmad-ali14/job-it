import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class AddInterview extends React.Component<
  IAddInterviewProps,
  IAddInterviewState
> {
  static propTypes: {};
  render() {
    return (
      <>
        <span>Add Interview</span>
      </>
    );
  }
}
export interface IAddInterviewProps {}

const mapStateToProps = (state) => ({});
export interface IAddInterviewState {}
export default connect(mapStateToProps, null)(AddInterview);
