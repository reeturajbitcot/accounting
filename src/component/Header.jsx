import React from "react";
import { getMonth, getYear } from "../lib/helperFunction";
import { useSelector } from "react-redux";
import backgroundImage from "../assets/images/pexel.jpg";
import Chip from "@mui/material/Chip";

function Header() {
  let creditValue = 0;
  let debitValue = 0;
  const creditList = useSelector((state) => state.accounting.creditList);
  const debitList = useSelector((state) => state.accounting.debitList);
  creditList.map((item) => (creditValue += +item.value));
  debitList.map((item) => (debitValue += +item.value));

  const percentage = () => {
    if (creditValue === 0) {
      return 0;
    }
    return Math.round((debitValue / creditValue) * 100);
  };

  return (
    <div
      className="d-flex justify-content-center flex-column "
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(10px)",
        padding: "60px",
      }}
    >
      <p className="text-white h4">{`Available Budget in ${getMonth()} ${getYear()}`}</p>
      <p className="text-white h1">{creditValue - debitValue}</p>
      <div className="d-flex flex-column justify-content-center gap-4 align-items-center">
        <div
          className="d-flex bg-success text-light justify-content-around align-items-center"
          style={{ width: "400px", height: "60px" }}
        >
          <p className="m-0">INCOME</p>
          <div className="d-flex gap-3">
            <p className="m-0">+ {creditValue}</p>
          </div>
        </div>
        <div
          className="d-flex bg-danger text-light justify-content-around align-items-center"
          style={{ width: "400px", height: "60px" }}
        >
          <p className="m-0">EXPENSES</p>
          <div className="d-flex gap-3">
            <p className="m-0">- {debitValue}</p>
            <Chip
              sx={{ color: "white", fontSize: "12px" }}
              label={`${percentage()} %`}
              size="small"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
