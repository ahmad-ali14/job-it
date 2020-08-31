import * as React from "react";
// import { domain } from "./helpers";
// import Iuser from "../server/controllers/user/user.interface";
import Login from "./components/user/login";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//const mainImage = require("./assets/imgs/main.svg");
// import main from "./assets/imgs/main.svg";
import { IuserWithoutPassword } from "../shared/types/user.types";
import { getUserData, setIsAuthorised } from "./redux/user/user.actions";
import Loading from "./components/helpers/loading";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import AppRouter from "./appRouter";

class App extends React.Component<IAppProps, IAppState> {
  static propTypes: {
    user: PropTypes.Requireable<object>;
    isAuthorised: PropTypes.Requireable<boolean>;
    interviews: PropTypes.Requireable<any[]>;
    err: PropTypes.Requireable<string>;
    token: PropTypes.Requireable<string>;
    getUserData: PropTypes.Validator<(token: string, userId: string) => void>;
    isLoading: PropTypes.Requireable<boolean>;
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
    const { user, err, isAuthorised, isLoading } = this.props;
    return (
      <>
        <Header isAuthorised={isAuthorised} />
        {isLoading ? <Loading /> : <AppRouter />}
        <Footer />
      </>
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
  isLoading: boolean;
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
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  isAuthorised: state.user.isAuthorised,
  interviews: state.user.interviews,
  err: state.user.err,
  token: state.user.token,
  isLoading: state.user.isLoading,
});

export default connect(mapStateToProps, { getUserData })(App);
