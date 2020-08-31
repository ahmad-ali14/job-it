import * as React from "react";
import PropTypes from "prop-types";
import Login from "../user/login";
import { connect } from "react-redux";

class Main extends React.Component<IMainProps, IMainState> {
  static propTypes: { isAuthorised: PropTypes.Requireable<boolean> };
  render() {
    const { isAuthorised } = this.props;
    return (
      <main className="container my-5">
        <div style={{ height: "68vh" }}></div>
        {!isAuthorised && (
          <Login
            setAppError={(msg) => {
              console.log(msg);
            }}
          />
        )}
      </main>
    );
  }
}
export interface IMainProps {
  isAuthorised: boolean;
}

const mapStateToProps = (state) => ({ isAuthorised: state.user.isAuthorised });
export interface IMainState {}
export default connect(mapStateToProps, null)(Main);
