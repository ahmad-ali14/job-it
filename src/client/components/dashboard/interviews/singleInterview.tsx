import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class SingleInterview extends React.Component<
  ISingleInterviewProps,
  ISingleInterviewState
> {
  static propTypes: {
    isAuthorised: PropTypes.Requireable<boolean>;
    interview: PropTypes.Requireable<any>;
  };
  render() {
    const { isAuthorised, interview } = this.props;
    return (
      <tr>
        <th scope="row">{interview._id.substr(20, 24)}</th>
        <td>{interview.company}</td>
        <td>{new Date(interview.time).toLocaleDateString()}</td>
        <td>{interview.comments.length}</td>
      </tr>
    );
  }
}
export interface ISingleInterviewProps {
  isAuthorised: boolean;
  interview: any;
}

const mapStateToProps = (state) => ({ isAuthorised: state.user.isAuthorised });
export interface ISingleInterviewState {}
export default connect(mapStateToProps, null)(SingleInterview);
