import * as React from "react";
import SingleInterview from "./singleInterview";
import { Interview } from "../../../../shared/types/interview.types";

const InterviewsTable: React.FC<ThisProps> = ({ interviewData }) => {
  return (
    <table className="table m-3">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">company</th>
          <th scope="col">time</th>
          <th scope="col">comments</th>
          <th scope="col">Actions </th>
        </tr>
      </thead>
      <tbody>
        {interviewData &&
          interviewData.length > 0 &&
          interviewData.map((e) => (
            <SingleInterview key={e._id.toString()} interview={e} />
          ))}
      </tbody>
    </table>
  );
};

interface ThisProps {
  interviewData: Interview[];
}

export default InterviewsTable;
