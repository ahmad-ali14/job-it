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
        ? interview._id
        : interview._id.toString();
    return (
      <tr key={intervewId}>
        <th scope="row">{intervewId.substr(20, 24)}</th>
        <td>{interview.company}</td>
        <td>{new Date(interview.time).toLocaleDateString()}</td>
        <td>
          <ul
            className="list-group list-group-flush"
            style={{ listStyleType: "decimal" }}
          >
            {interview.comments && interview.comments.length > 0 ? (
              interview.comments.map((e) => (
                <li key={intervewId}>
                  <p className=""> {e}</p>
                </li>
              ))
            ) : (
              <p className="text-sm text-muted text-secondary">
                No comments yet
              </p>
            )}
          </ul>
        </td>
        <td>
          <button type="submit" className="btn btn-success mr-3">
            update
          </button>
          <button type="submit" className="btn btn-danger">
            delete
          </button>
        </td>
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
