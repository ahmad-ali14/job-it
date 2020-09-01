import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logUserOut } from "../../redux/user/user.actions";

class Header extends React.Component<IHeaderProps, IHeaderState> {
  static propTypes: {
    logUserOut: PropTypes.Validator<() => void>;
    isAuthorised: PropTypes.Requireable<boolean>;
  };
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div className="container">
          <a className="navbar-brand" href="/">
            <i className="material-icons">Job-it</i>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="nav navbar-nav text-center">
              <i className="material-icons text-white ml-5">
                You're{" "}
                {this.props.isAuthorised ? "Authorised" : "NOT Authorised"} ,
                Your Id: {window.localStorage.getItem("userId") || "Null"}
              </i>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a
                  className="nav-link"
                  href="http://ahmad-ali.co.uk/"
                  target="_blank"
                >
                  {" "}
                  My Account
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              {this.props.isAuthorised ? (
                <li className="nav-item active ml-1">
                  <div>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        this.props.logUserOut();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </li>
              ) : (
                <li className="nav-item active ml-1">
                  <div>
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        console.log("logiing out");
                      }}
                    >
                      Login
                    </button>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
interface IHeaderProps {
  isAuthorised: boolean;
  logUserOut: () => void;
}

interface IHeaderState {}

const mapStateToProps = (state) => ({
  isAuthorised: state.user.isAuthorised,
});

export default connect(mapStateToProps, { logUserOut })(Header);
