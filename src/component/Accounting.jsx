import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../store/slice/transactionSlice";
import { v4 as uuidv4 } from "uuid";
import { Snackbar, SnackbarContent } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function Accounting() {
  let creditValue = 0;
  let debitValue = 0;
  const [radioValue, setRadioValue] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch();
  const creditList = useSelector((state) => state.accounting.creditList);
  const debitList = useSelector((state) => state.accounting.debitList);
  creditList.map((item) => (creditValue += parseInt(item.value)));
  debitList.map((item) => (debitValue += parseInt(item.value)));

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!radioValue) {
      validationErrors.radioValue = "Please select a transaction type.";
    }
    if (!description.trim()) {
      validationErrors.description = "Description cannot be empty.";
    }
    if (!value || parseFloat(value) <= 0) {
      validationErrors.value = "Please enter a valid value greater than 0.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (creditValue <= 0 && radioValue === "debit") {
        setOpenSnackbar(true);
      } else if (
        creditValue > 0 &&
        radioValue === "debit" &&
        value + debitValue > creditValue
      ) {
        setOpenSnackbar(true);
      } else {
        setOpenSnackbar(false);
        setDescription("");
        setRadioValue("");
        setValue("");
        dispatch(
          addTransaction({
            id: uuidv4(),
            type: radioValue,
            description,
            value,
          })
        );
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="d-flex justify-content-center align-items-center"
        style={{
          padding: "20px",
          gap: "40px",
        }}
      >
        <FormControl component="fieldset">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={radioValue}
            onChange={(e) => setRadioValue(e.target.value)}
            sx={{ display: "flex", gap: "10px" }}
          >
            <FormControlLabel
              value="credit"
              control={
                <Radio
                  sx={{ color: "gray", "&.Mui-checked": { color: "green" } }}
                />
              }
              label="Credit"
            />
            <FormControlLabel
              value="debit"
              control={
                <Radio
                  sx={{ color: "gray", "&.Mui-checked": { color: "red" } }}
                />
              }
              label="Debit"
            />
          </RadioGroup>
          {errors.radioValue && (
            <p style={{ color: "red" }}>{errors.radioValue}</p>
          )}
        </FormControl>

        <div style={{ width: "400px" }}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="input_no"
              placeholder="Add Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                display: "flex",
                width: "100%",
                padding: ".375rem .75rem",
                borderColor: "#dee2e6",
                borderWidth: "1px",
                borderRadius: "0.375rem",
              }}
            />
            {errors.description && (
              <p style={{ color: "red" }}>{errors.description}</p>
            )}
          </div>

          <div className="input-group mb-3">
            <input
              type="number"
              className="input_no"
              placeholder="Value"
              value={value}
              onChange={(e) => setValue(parseFloat(e.target.value))}
              style={{
                display: "flex",
                width: "100%",
                padding: ".375rem .75rem",
                borderColor: "#dee2e6",
                borderWidth: "1px",
                borderRadius: "0.375rem",
              }}
            />
            {errors.value && <p style={{ color: "red" }}>{errors.value}</p>}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {/* {creditError && <p style={{ color: "red" }}></p>} */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <SnackbarContent
          message="Expenses are crossing available balance"
          sx={{
            backgroundColor: "red",
            color: "white",
          }}
          action={action}
        />
      </Snackbar>
    </div>
  );
}
export default Accounting;
