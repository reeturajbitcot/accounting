import React from "react";
import { getMonth, getYear } from "../lib/helperFunction";
import { useSelector } from "react-redux";

function Header() {
  let creditValue = 0;
  let debitValue = 0;
  const creditList = useSelector((state) => state.accounting.creditList);
  const debitList = useSelector((state) => state.accounting.debitList);
  creditList.map((item) => (creditValue += +item.value));
  debitList.map((item) => (debitValue += +item.value));

  return (
    <div className="d-flex justify-content-center flex-column">
      <p>{`Available Budget in ${getMonth()} ${getYear()}`}</p>
      <p>{creditValue - debitValue}</p>
      <div
        className="d-flex bg-success text-light justify-content-around"
        style={{ width: "400px" }}
      >
        <p>INCOME</p>
        <div className="d-flex gap-3">
          <p>+ {creditValue}</p>
          <p>percentage</p>
        </div>
      </div>
      <div
        className="d-flex bg-danger text-light justify-content-around"
        style={{ width: "400px" }}
      >
        <p>EXPENSES</p>
        <div className="d-flex gap-3">
          <p>- {debitValue}</p>
          <p>percentage</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
