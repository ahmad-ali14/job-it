import * as React from "react";
// import { domain } from "./helpers";
// import Iuser from "../server/controllers/user/user.interface";
import Login from "./components/user/loging";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const mainImage = require("./assets/imgs/main.svg");
// import main from "./assets/imgs/main.svg";
import { IuserWithoutPassword } from "../shared/types/user.types";

class App extends React.Component<IAppProps, IAppState> {
  static propTypes: {
    user: PropTypes.Requireable<object>;
    isAuthorised: PropTypes.Requireable<boolean>;
    interviews: PropTypes.Requireable<any[]>;
    err: PropTypes.Requireable<string>;
    token: PropTypes.Requireable<string>;
  };

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      err: null,
    };
  }

  setAppError = (msg) => this.setState({ err: msg });
  // async componentDidMount() {
  //   try {
  //     let r = await fetch(`/api/user/all`);
  //     let results = await r.json();
  //     this.setState({ users: results });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  render() {
    const { user, interviews, err, isAuthorised, token } = this.props;
    return (
      <main className="container my-5">
        {/* <p>here</p>
        {this.state.users.length > 0 &&
          this.state.users.map((e, i) => {
            return <p key={`user ${i}`}>{e.firstName + " " + e.lastName}</p>;
          })}

        <hr />

        <img src={mainImage} alt="mainImage" />
        <hr /> */}

        {(err || this.state.err) && (
          <div className="bg-danger text-white text-xl-center">
            {err || this.state.err}
          </div>
        )}

        {/* {this.state.err && (
          <div className="bg-danger text-white text-xl-center">
            {this.state.err}
          </div>
        )} */}

        {user && (
          <p>
            you are:{" "}
            {`${user.firstName} ${user.lastName} and your email is ${user.email}  `}
          </p>
        )}

        {isAuthorised ? (
          <p style={{ color: "green" }}>You are Authorised </p>
        ) : (
          <p style={{ color: "red" }}>you are NOT Authorised</p>
        )}

        {!isAuthorised && <Login setAppError={this.setAppError} />}
      </main>
    );
  }
}

export interface IAppProps {
  user: IuserWithoutPassword;
  interviews: [];
  isAuthorised: boolean;
  err: string;
  token: string;
}

export interface IAppState {
  err: string | null;
}

App.propTypes = {
  user: PropTypes.object,
  isAuthorised: PropTypes.bool,
  interviews: PropTypes.array,
  err: PropTypes.string,
  token: PropTypes.string,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  isAuthorised: state.user.isAuthorised,
  interviews: state.user.interviews,
  err: state.user.err,
  token: state.user.token,
});

export default connect(mapStateToProps, null)(App);
