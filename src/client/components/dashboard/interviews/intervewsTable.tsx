import * as React from "react";
import SingleInterview from "./SingleInterview";
import { Interview } from "../../../../shared/types/interview.types";

const InterviewsTable: React.FC<ThisProps> = ({ interviewData }) => {
  return (
    <table className="table m-2">
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
