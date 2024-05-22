import { Component } from "react";
// import history from "./history";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", message: "" };
  }
  render() {
    return (
      <div className="">
        <h4 className="m-1 p-2 border-bottom">Login</h4>

        {/*Email starts here*/}
        <div className="form-group form-row">
          <label className="col-lg-4 p-2">Email:</label>
          <input
            type="text"
            className="form-control m-1 p-2"
            value={this.state.email}
            onChange={(event) => {
              this.setState({ email: event.target.value });
              //   console.log(this.state.email);
            }}
          />
        </div>

        {/*Password starts here*/}
        <div className="form-group form-row">
          <label className="col-lg-4 p-2">Password:</label>
          <input
            type="password"
            className="form-control m-1 p-2"
            value={this.state.password}
            onChange={(event) => {
              this.setState({ password: event.target.value });
            }}
          />
        </div>

        <div className="text-end">
          {this.state.message}
          <button className="btn btn-primary m-1" onClick={this.onLoginClick}>
            Login
          </button>
        </div>
      </div>
    );
  }
  /*Function to handle the login button click */
  onLoginClick = async () => {
    console.log("onLoginclick",this.state);

    var response = await fetch(
      `http://localhost:5000/users?email=${this.state.email}&password=${this.state.password}`,
      { method: "GET" }
    );

    var body = await response.json();
    console.log(body);
    if (body.length > 0) {
      //success
      this.setState({
        message: <span className="text-success">Successfully Logged-in</span>,
      });
      //call updateIsLoggedInStatus of parent component to update the status as true
      this.props.updateIsLoggedInStatus(true);

      //navigate to dashboard
    //   history.replace("/dashboard");

    } else {
      //error
      this.setState({
        message: (
          <span className="text-danger">Invalid Login, please try again</span>
        ),
      });
    }
  };
}
