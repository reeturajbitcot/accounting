import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useDispatch } from "react-redux";
import { addTransaction } from "../store/slice/transactionSlice";

function Accounting() {
  const [radioValue, setRadioValue] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};
    // Validation logic
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
      console.log("Form submitted");
    }
    dispatch(addTransaction({ type: radioValue, description, value }));
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={radioValue}
            onChange={(e) => setRadioValue(e.target.value)}
          >
            <FormControlLabel
              value="credit"
              control={<Radio />}
              label="Credit"
            />
            <FormControlLabel value="debit" control={<Radio />} label="Debit" />
          </RadioGroup>
          {errors.radioValue && (
            <p style={{ color: "red" }}>{errors.radioValue}</p>
          )}
        </FormControl>

        <div style={{ width: "400px" }}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
            />
            {errors.value && <p style={{ color: "red" }}>{errors.value}</p>}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
export default Accounting;
