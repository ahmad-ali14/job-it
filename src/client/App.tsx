import * as React from "react";
// import { domain } from "./helpers";
// import Iuser from "../server/controllers/user/user.interface";
import Login from "./components/user/loging";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//const mainImage = require("./assets/imgs/main.svg");
// import main from "./assets/imgs/main.svg";
import { IuserWithoutPassword } from "../shared/types/user.types";
import { getUserData, setIsAuthorised } from "./redux/user/user.actions";

class App extends React.Component<IAppProps, IAppState> {
  static propTypes: {
    user: PropTypes.Requireable<object>;
    isAuthorised: PropTypes.Requireable<boolean>;
    interviews: PropTypes.Requireable<any[]>;
    err: PropTypes.Requireable<string>;
    token: PropTypes.Requireable<string>;
    getUserData: PropTypes.Validator<(token: string, userId: string) => void>;
  };

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      err: null,
    };
  }

  setAppError = (msg) => this.setState({ err: msg });

  async componentWillMount() {
    const userId = window.localStorage.getItem("userId");
    const token = window.localStorage.getItem("token");

    console.log(token, userId);

    if (!userId || !token || userId === "" || token === "") {
      setIsAuthorised(false);
    } else {
      console.log("get user data");

      this.props.getUserData(token, userId);
    }
  }

  render() {
    const { user, interviews, err, isAuthorised, token } = this.props;
    return (
      <main className="container my-5">
        {(err || this.state.err) && (
          <div className="bg-danger text-white text-xl-center">
            {err || this.state.err}
          </div>
        )}

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
  getUserData: Function;
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
  getUserData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  isAuthorised: state.user.isAuthorised,
  interviews: state.user.interviews,
  err: state.user.err,
  token: state.user.token,
});

export default connect(mapStateToProps, { getUserData })(App);
