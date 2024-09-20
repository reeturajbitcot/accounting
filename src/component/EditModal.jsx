import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTransaction } from "../store/slice/transactionSlice";
import { Snackbar, SnackbarContent } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

function EditModal({ handleClose, transactionType, data }) {
  let creditValue = 0;
  let debitValue = 0;
  const dispatch = useDispatch();
  const [description, setDescription] = useState(data.description);
  const [value, setValue] = useState(data.value);
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const creditList = useSelector((state) => state.accounting.creditList);
  const debitList = useSelector((state) => state.accounting.debitList);
  creditList.map((item) => (creditValue += parseInt(item.value)));
  debitList.map((item) => (debitValue += parseInt(item.value)));
  debitValue -= data.value;

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedData = {
      ...data,
      description,
      value,
    };
    let validationErrors = {};

    if (!description.trim()) {
      validationErrors.description = "Description cannot be empty.";
    }
    if (!value || parseFloat(value) <= 0) {
      validationErrors.value = "Please enter a valid value greater than 0.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (creditValue <= 0 && data.type === "debit") {
        setOpenSnackbar(true);
      } else if (
        creditValue > 0 &&
        data.type === "debit" &&
        value + debitValue > creditValue
      ) {
        setOpenSnackbar(true);
      } else {
        dispatch(updateTransaction(updatedData));
        handleClose();
      }
    }
  };
  const handleSnackbarClose = (event, reason) => {
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
        onClick={handleSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update {transactionType}
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="d-flex justify-content-center flex-column align-items-center"
          style={{
            paddingTop: "10px",
            gap: "10px",
          }}
        >
          <div style={{ width: "100%" }}>
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

          <div
            className="d-flex justify-content-end gap-4"
            style={{ width: "100%" }}
          >
            <button
              onClick={handleClose}
              type="button"
              className="btn btn-primary"
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
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
    </>
  );
}

export default EditModal;
