import * as React from "react";

class Loading extends React.Component<ILoadingProps, ILoadingState> {
  render() {
    return (
      <main className="container my-5">
        <div className="bg-info text-center text-white">
          <h1>PLEASE WAIT ...</h1>
        </div>
      </main>
    );
  }
}
export interface ILoadingProps {}

export interface ILoadingState {}
export default Loading;
