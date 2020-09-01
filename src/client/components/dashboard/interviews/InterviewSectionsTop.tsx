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

  return (
    <ul className="nav nav-pills nav-fill nav-justified m-3">
      <li className="nav-item  m-auto ">
        <button
          className={
            "nav-link shadow-none m-auto" + active === "previous interviews"
              ? "active"
              : ""
          }
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
          className={"nav-link shadow-none m-auto"}
          value="this week"
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
          className={
            "nav-link shadow-none m-auto" + active === "future interviews"
              ? "active"
              : ""
          }
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
          value="add interview"
          className={
            "nav-link shadow-none m-auto" + active === "add interviews"
              ? "active"
              : ""
          }
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
