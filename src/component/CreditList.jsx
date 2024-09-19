import React from "react";
import { useSelector } from "react-redux";

function CreditList() {
  const creditList = useSelector((state) => state.accounting.creditList);
  return (
    <div>
      <h2>Credit list</h2>
      <ul style={{ listStyle: "none" }}>
        {creditList.map((item, i) => {
          return (
            <li key={i}>
              <div className="d-flex gap-3">
                <p>{item.description}</p>
                <p>{item.value}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CreditList;
