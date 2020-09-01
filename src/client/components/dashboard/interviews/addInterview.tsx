import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addInterviewToUser } from "../../../redux/user/user.actions";
import { InterviewWithoutId } from "../../../../shared/types/interview.types";

type InputValues = "company" | "time" | "comments";

interface IAddInterviewProps {
  addInterviewToUser: (
    data: InterviewWithoutId,
    token: string,
    userId: string
  ) => void;
}
interface IAddInterviewState {
  company: string;
  time: string;
  comments: string[];
  comment: string;
}

class AddInterview extends React.Component<
  IAddInterviewProps,
  IAddInterviewState
> {
  // static propTypes: {
  //   addInterviewToUser: PropTypes.Validator<
  //     (data: InterviewWithoutId, userId: string, token: string) => void
  //   >;
  // };
  constructor(props: IAddInterviewProps) {
    super(props);
    this.state = {
      company: "",
      time: "",
      comment: "",
      comments: [],
    };
  }

  handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const key = e.currentTarget.name;
    const value: string = e.currentTarget.value;
    if (Object.keys(this.state).includes(key)) {
      this.setState(
        ({ [key]: value } as unknown) as Pick<
          IAddInterviewState,
          keyof IAddInterviewState
        >,
        () => console.log(this.state)
      );
    }
  };
  submitComment = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    if (!this.state.comment || this.state.comment === "") {
      return;
    }
    this.setState(
      { comments: [...this.state.comments, this.state.comment], comment: "" },
      () => console.log(this.state)
    );
  };

  submitInterview = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log("interview to submit", this.state);
    const token: string = window.localStorage.getItem("token");
    const userId: string = window.localStorage.getItem("userId");
    const interviewtoSubmit: InterviewWithoutId = {
      company: this.state.company,
      time: Date.parse(this.state.time),
      comments: this.state.comments,
    };
    this.props.addInterviewToUser(interviewtoSubmit, token, userId);
  };

  render() {
    return (
      <>
        <table className="table m-3">
          <tbody>
            <tr>
              <td>
                <p>Interview data</p>
                <form>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Company</label>
                      <input
                        type="email"
                        className="form-control"
                        onChange={this.handleChange}
                        name="company"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Time</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        onChange={this.handleChange}
                        name="time"
                      />
                    </div>
                  </div>
                </form>
              </td>
              <td>
                <div>
                  <p> comments</p>
                  <ul>
                    {this.state.comments &&
                      this.state.comments.length > 0 &&
                      this.state.comments.map((e) => (
                        <li>
                          <p>{e}</p>
                        </li>
                      ))}
                  </ul>
                </div>
                <hr />
                <form>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <textarea
                        className="form-control"
                        name="comment"
                        value={this.state.comment}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={this.submitComment}
                    className={`btn ${
                      this.state.comment.length > 0
                        ? " btn-success"
                        : " btn-secondary disabled"
                    }  `}
                  >
                    Add comment
                  </button>
                </form>
              </td>
            </tr>
            <tr className="">
              <td colSpan={2} className="text-center">
                <button
                  type="submit"
                  onClick={this.submitInterview}
                  className="btn btn-success mr-3"
                >
                  Save Interview
                </button>
                <button type="submit" className="btn btn-danger">
                  Discard changes
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { addInterviewToUser })(AddInterview);
