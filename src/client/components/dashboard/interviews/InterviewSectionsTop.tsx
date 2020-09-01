import * as React from "react";
import { useState } from "react";

type ActiveButton =
  | "this week"
  | "previous interviews"
  | "future interviews"
  | "add interview";

const InterviewSectionsTop: React.FC<ThisProps> = ({ setShow, setFunc }) => {
  const [active, setActive] = useState<ActiveButton>("this week");

  const setActiveState = (e) => {
    setActive(e.target.value);
  };

  const topBtnClasses = "nav-link shadow-none m-auto";
  const topBtnStyle = {
    border: "none",
  };
  return (
    <ul className="nav nav-pills nav-fill nav-justified m-3">
      <li className="nav-item  m-auto ">
        <button
          className={`${topBtnClasses} ${
            active === "previous interviews" ? "active" : ""
          }`}
          style={topBtnStyle}
          value="previous interviews"
          onClick={(e) => {
            setShow(e);
            setFunc("show interviews");
            setActiveState(e);
          }}
        >
          previous interviews
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`${topBtnClasses} ${
            active === "this week" ? "active" : ""
          }`}
          value="this week"
          style={topBtnStyle}
          onClick={(e) => {
            setShow(e);
            setFunc("show interviews");
            setActiveState(e);
          }}
        >
          Interviews this week
        </button>
      </li>
      <li className="nav-item ">
        <button
          className={`${topBtnClasses} ${
            active === "future interviews" ? "active" : ""
          }`}
          style={topBtnStyle}
          value="future interviews"
          onClick={(e) => {
            setShow(e);
            setFunc("show interviews");
            setActiveState(e);
          }}
        >
          future interviews
        </button>
      </li>

      <li className="nav-item">
        <button
          className={`${topBtnClasses} ${
            active === "add interview" ? "active" : ""
          }`}
          style={topBtnStyle}
          value="add interview"
          onClick={(e) => {
            setFunc("add interview");
            setActiveState(e);
          }}
        >
          Add Interview +
        </button>
      </li>
    </ul>
  );
};

interface ThisProps {
  setShow: (event) => void;
  setFunc: (val: string) => void;
}

export default InterviewSectionsTop;
