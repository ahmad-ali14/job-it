import * as React from "react";
class Footer extends React.Component<IFooterProps, IFooterState> {
  render() {
    return (
      <footer className="footer">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
          <div className="container">
            <a className="navbar-brand" href="/">
              <i className="material-icons">
                Job-it, a place to organise all your job hunting.{" "}
              </i>
            </a>
          </div>
        </nav>
      </footer>
    );
  }
}
export interface IFooterProps {}

export interface IFooterState {}
export default Footer;
