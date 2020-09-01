import * as React from "react";

class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
  render() {
    return (
      <main className="container my-5">
        <div className="bg-info text-center text-white">
          <h1>Dashboard</h1>
        </div>
      </main>
    );
  }
}
export interface IDashboardProps {}

export interface IDashboardState {}
export default Dashboard;
