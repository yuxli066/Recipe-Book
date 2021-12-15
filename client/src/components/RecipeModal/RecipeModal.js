import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Zoom from "@mui/material/Zoom";
import Typography from "@mui/material/Typography";
import customStyles from "./style.module.css";
import CloseIcon from "@mui/icons-material/Close";

export default function RecipeModal({ open, handleClose }) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{ border: "none !important" }}
        disableAutoFocus
        disableEscapeKeyDown
        hideBackdrop
      >
        <Zoom
          in={open}
          style={{ transitionDelay: "500ms" }}
          easing={{ exit: "500ms" }}
        >
          <Box className={customStyles.modal}>
            <Box>
              <CloseIcon
                sx={{ fontSize: 70 }}
                className={customStyles.close_button}
                onClick={handleClose}
              />
            </Box>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Zoom>
      </Modal>
    </div>
  );
}
