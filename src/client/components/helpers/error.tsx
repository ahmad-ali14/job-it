import * as React from "react";

class AppError extends React.Component<IAppErrorProps, IAppErrorState> {
  render() {
    const { err } = this.props;
    return (
      <main className="container my-5">
        <div className="bg-danger text-center text-white">
          <h3>{err}</h3>
        </div>
      </main>
    );
  }
}
export interface IAppErrorProps {
  err: string;
}

export interface IAppErrorState {}
export default AppError;
