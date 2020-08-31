import * as React from "react";
class Header extends React.Component<IHeaderProps, IHeaderState> {
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
                You're a{" "}
                {this.props.isAuthorised ? "Authorised" : "NOT Authorised"} ,
                Your Id: {window.localStorage.getItem("userId")}
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
                  My Portfolio
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item active ml-1">
                <div>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      console.log("logiing out");
                    }}
                  >
                    Logout
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export interface IHeaderProps {
  isAuthorised: boolean;
}

export interface IHeaderState {}
export default Header;
