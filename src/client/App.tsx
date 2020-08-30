import * as React from "react";
// import { domain } from "./helpers";
import Iuser from "../server/controllers/user/user.interface";
import Login from "./components/user/loging";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class App extends React.Component<IAppProps, IAppState> {
  static propTypes: {};
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      users: [],
    };
  }

  async componentDidMount() {
    try {
      let r = await fetch(`/api/user/all`);
      let results = await r.json();
      this.setState({ users: results });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <main className="container my-5">
        <p>here</p>
        {this.state.users.length > 0 &&
          this.state.users.map((e, i) => {
            return <p key={`user ${i}`}>{e.firstName + " " + e.lastName}</p>;
          })}

        <hr />

        <hr />

        <Login />
      </main>
    );
  }
}

export interface IAppProps {}

export interface IAppState {
  users: Iuser[];
}

App.propTypes = {
  user: PropTypes.object,
  isAuthorised: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  isAuthorised: state.user.isAuthorised,
});

export default connect(mapStateToProps, null)(App);
