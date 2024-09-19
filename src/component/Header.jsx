import React from "react";
import { getMonth, getYear } from "../lib/helperFunction";
import { useSelector } from "react-redux";

function Header() {
  const finalValue = useSelector((state) => state.accounting.total);
  const debitValue = useSelector((state) => state.accounting.debit);
  const creditValue = useSelector((state) => state.accounting.credit);

  return (
    <div className="d-flex justify-content-center flex-column">
      <p>{`Available Budget in ${getMonth()} ${getYear()}`}</p>
      <p>{finalValue}</p>
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
