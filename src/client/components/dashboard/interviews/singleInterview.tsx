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
    const intervewId: string =
      typeof interview._id === "string"
        ? interview._id.substr(20, 24)
        : interview._id.toString().substr(20, 24);
    return (
      <tr>
        <th scope="row">{intervewId}</th>
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
