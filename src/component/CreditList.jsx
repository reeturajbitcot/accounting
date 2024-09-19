import React from "react";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

function CreditList() {
  const creditList = useSelector((state) => state.accounting.creditList);
  return (
    <div style={{ width: "300px" }}>
      <h2>Credit list</h2>
      <ul style={{ listStyle: "none" }}>
        {creditList.map((item, i) => {
          return (
            <li key={i}>
              <div className="d-flex justify-content-between">
                <p>{item.description}</p>
                <div className="d-flex gap-2 ">
                  <p>{item.value}</p>
                  <IconButton aria-label="edit" size="small">
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton aria-label="delete" size="small">
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CreditList;
