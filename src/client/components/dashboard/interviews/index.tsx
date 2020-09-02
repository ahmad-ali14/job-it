import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { chooseInterviewData, prepareInterviewsIntoSections } from "./helpers";
import InterviewSectionsTop from "./InterviewSectionsTop";
import InterviewsTable from "./intervewsTable";
import AddInterview from "./addInterview";
import {
  changeCurrenetInterviewSection,
  changeCurrenetInterviewFunctionality,
} from "../../../redux/app/app.actions";

import {
  CurrentInterviewSectionType,
  CurrentInterviewFunctionalityType,
} from "../../../../shared/types/app.types";

class Interviews extends React.Component<IInterviewsProps, IInterviewsState> {
  constructor(props) {
    super(props);
    this.state = {
      interviews: [],
      previousInterviews: [],
      thisWeekInterviews: [],
      futureInterviews: [],
      show: "this week",
      Func: "show interviews",
    };
  }
  static propTypes: {
    interviews: PropTypes.Requireable<any[]>;
  };

  componentWillMount() {
    prepareInterviewsIntoSections(this);
  }

  setShow = (e) => {
    const value: CurrentInterviewSectionType = e.target.value;
    this.props.changeCurrenetInterviewSection(value);
  };

  setFunc = (val) => {
    //this.setState({ Func: val });
    this.props.changeCurrenetInterviewFunctionality(val);
  };

  componentWillUpdate() {
    chooseInterviewData(this);
  }

  render() {
    const interviewData = chooseInterviewData(this);
    return (
      <>
        <div className="bg-info text-center text-white">
          <h1>Interviews</h1>
        </div>

        <div className="row">
          <div className="col-12">
            <InterviewSectionsTop
              setShow={this.setShow}
              setFunc={this.setFunc}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            {this.props.currentFunctionality === "show interviews" && (
              <InterviewsTable interviewData={interviewData} />
            )}
            {this.props.currentFunctionality == "add interview" && (
              <AddInterview />
            )}
          </div>
        </div>
      </>
    );
  }
}
export interface IInterviewsProps {
  interviews: any[];
  currentSection: CurrentInterviewSectionType;
  currentFunctionality: CurrentInterviewFunctionalityType;
  changeCurrenetInterviewSection: (value: CurrentInterviewSectionType) => void;
  changeCurrenetInterviewFunctionality: (
    value: CurrentInterviewFunctionalityType
  ) => void;
}

export interface IInterviewsState {
  interviews: any[];
  previousInterviews: any[];
  thisWeekInterviews: any[];
  futureInterviews: any[];
  show: "this week" | "previous interviews" | "future interviews";
  Func: "show interviews" | "add interview";
}

const mapStateToProps = (state) => ({
  interviews: state.user.interviews,
  currentSection: state.app.currentInterviewSection,
  currentFunctionality: state.app.currentInterviewFunctionality,
});
export default connect(mapStateToProps, {
  changeCurrenetInterviewSection,
  changeCurrenetInterviewFunctionality,
})(Interviews);
