import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SingleInterview from "./singleInterview";

class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
  constructor(props) {
    super(props);
    this.state = {
      interviews: [],
      previousInterviews: [],
      thisWeekInterviews: [],
      futureInterviews: [],
      show: "this week",
    };
  }
  static propTypes: {
    interviews: PropTypes.Requireable<any[]>;
  };

  componentWillMount() {
    if (this.props.interviews && this.props.interviews.length > 0) {
      const pre = [];
      const now = [];
      const next = [];
      const dateNow = Date.now();
      const dateAfterWeek = dateNow + 7 * 24 * 60 * 60 * 1000;

      this.props.interviews.forEach((e) => {
        switch (true) {
          case e.time < dateNow:
            pre.push(e);
            break;
          case e.time > dateAfterWeek:
            next.push(e);
            break;
          default:
            now.push(e);
        }
      });

      this.setState(
        {
          previousInterviews: pre,
          thisWeekInterviews: now,
          futureInterviews: next,
        },
        () => console.log(this.state)
      );
    }
  }

  chooseInterviewData = () => {
    const show = this.state.show;
    switch (show) {
      case "this week":
        return this.state.thisWeekInterviews;
        break;
      case "future interviews":
        return this.state.futureInterviews;
        break;
      case "previous interviews":
        return this.state.previousInterviews;
        break;

      default:
        return [];
        break;
    }
  };

  setShow = (e) => {
    console.log(e.target);

    this.setState({ show: e.target.value }, () =>
      console.log("set show", this.state)
    );
  };

  componentWillUpdate() {
    this.chooseInterviewData();
  }

  render() {
    const interviewData = this.chooseInterviewData();
    return (
      <>
        <div className="bg-info text-center text-white">
          <h1>Dashboard</h1>
        </div>
        <div className="row">
          <div className="col-12">
            <ul className="nav nav-pills nav-fill nav-justified">
              <li className="nav-item">
                <button
                  className="nav-link"
                  value="previous interviews"
                  onClick={this.setShow}
                >
                  previous interviews
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link active"
                  value="this week"
                  onClick={this.setShow}
                >
                  Interviews this week
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  value="future interviews"
                  onClick={this.setShow}
                >
                  future interviews
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">company</th>
                  <th scope="col">time</th>
                  <th scope="col">number of comments</th>
                </tr>
              </thead>
              <tbody>
                {interviewData &&
                  interviewData.length > 0 &&
                  interviewData.map((e) => (
                    <SingleInterview key={e._id} interview={e} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
export interface IDashboardProps {
  interviews: any[];
}

export interface IDashboardState {
  interviews: any[];
  previousInterviews: any[];
  thisWeekInterviews: any[];
  futureInterviews: any[];
  show: "this week" | "previous interviews" | "future interviews";
}

const mapStateToProps = (state) => ({
  interviews: state.user.interviews,
});
export default connect(mapStateToProps, null)(Dashboard);
