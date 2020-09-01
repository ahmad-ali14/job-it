import * as React from "react";

class NotFound extends React.Component<INotFoundProps, INotFoundState> {
  render() {
    return (
      <main className="container my-5">
        <div className="bg-danger text-center text-white">
          <h3> Page Not Found </h3>
        </div>
      </main>
    );
  }
}
export interface INotFoundProps {}

export interface INotFoundState {}
export default NotFound;
