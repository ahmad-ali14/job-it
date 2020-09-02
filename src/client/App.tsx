import * as React from "react";
import { connect } from "react-redux";
import { IuserWithoutPassword } from "../shared/types/user.types";
import { getUserData, setIsAuthorised } from "./redux/user/user.actions";
import Loading from "./components/helpers/loading";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import AppRouter from "./appRouter";

class App extends React.Component<IAppProps, IAppState> {
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

    if (!userId || !token || userId === "" || token === "") {
      setIsAuthorised(false);
    } else {
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
  getUserData: (token: string, userId: string) => void;
  isLoading: boolean;
}

export interface IAppState {
  err: string | null;
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  isAuthorised: state.user.isAuthorised,
  interviews: state.user.interviews,
  err: state.user.err,
  token: state.user.token,
  isLoading: state.app.loading,
});

export default connect(mapStateToProps, { getUserData })(App);
