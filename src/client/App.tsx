import * as React from "react";
// import { domain } from "./helpers";
import Iuser from "../server/controllers/user/user.interface";

class App extends React.Component<IAppProps, IAppState> {
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
          this.state.users.map((e) => {
            return (
              <>
                <p>{e.firstName + " " + e.lastName}</p>
              </>
            );
          })}
      </main>
    );
  }
}

export interface IAppProps {}

export interface IAppState {
  users: Iuser[];
}

export default App;
