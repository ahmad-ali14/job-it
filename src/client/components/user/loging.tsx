import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userLogin } from "../../redux/user/user.actions";

class Login extends React.Component<any, any> {
  static propTypes: { userLogin: any };
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  submitLogin = (e) => {
    e.preventDefault();
    this.props.userLogin(this.state.email, this.state.password);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.submitLogin}>
          <div>
            <label>Title: </label>
            <br />
            <input
              type="text"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <br />
          <div>
            <label>password: </label>
            <br />
            <input
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </div>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
};

export default connect(null, { userLogin })(Login);
