import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { deleteTransaction } from "../store/slice/transactionSlice";
import EditModal from "./EditModal";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

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
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  borderRadius: "10px",
};

function CreditList() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const creditList = useSelector((state) => state.accounting.creditList);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [sureDeleteModal, setSureDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = ({ id }) => {
    setSureDeleteModal(true);
    setDeleteId(id);
  };

  const confirmDelete = () => {
    dispatch(deleteTransaction({ id: deleteId, type: "credit" }));
    handleDeleteModal();
  };

  const handleEdit = (data) => {
    setData(data);
    handleOpen();
  };

  const handleDeleteModal = () => {
    setSureDeleteModal(false);
  };

  return (
    <div style={{ width: "400px" }}>
      {creditList.length !== 0 && <h2>Credit list</h2>}
      <ul style={{ listStyle: "none" }} className="d-flex flex-column gap-2">
        {creditList.map((item, i) => {
          return (
            <li
              key={i}
              className="text-white"
              style={{
                backgroundColor: "#afe1af",
                borderRadius: "8px",
                padding: "2px 12px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center p-2">
                <p className="m-0">{item.description}</p>
                <div className="d-flex gap-2 justify-content-between align-items-center">
                  <p className="m-0">{item.value}</p>
                  <Tooltip title="Edit">
                    <IconButton
                      aria-label="edit"
                      size="small"
                      onClick={() => handleEdit(item)}
                    >
                      <EditIcon fontSize="inherit" sx={{ color: "grey" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => handleDelete({ id: item.id })}
                    >
                      <DeleteIcon sx={{ color: "red" }} fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <Modal
        open={sureDeleteModal}
        onClose={handleDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure want to delete.
          </Typography>
          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-primary" onClick={handleDeleteModal}>
              Close
            </button>
            <button className="btn btn-primary" onClick={confirmDelete}>
              Confirm
            </button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditModal
          handleClose={handleClose}
          transactionType="Credit"
          data={data}
        />
      </Modal>
    </div>
  );
}

export default CreditList;
