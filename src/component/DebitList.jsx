import React from "react";
import { useSelector } from "react-redux";

function DebitList() {
  const debitList = useSelector((state) => state.accounting.debitList);
  return (
    <div>
      <h2>Debit list</h2>
      <ul style={{ listStyle: "none" }}>
        {debitList.map((item, i) => {
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

export default DebitList;
