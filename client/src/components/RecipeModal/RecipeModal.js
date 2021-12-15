import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Zoom from "@mui/material/Zoom";
import Typography from "@mui/material/Typography";
import styles from "./style.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Container from "@mui/material/Container";
import Divider from '@mui/material/Divider';

export default function RecipeModal({ open, handleClose, recipe }) {
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
        >
          <Box className={styles.modal}>
            <CloseIcon
              sx={{ fontSize: 70 }}
              className={styles.close_button}
              onClick={handleClose}
            />
            <Container maxWidth="md">
              <Box className={styles.image_container}>
                <img className={styles.recipe_image} src={recipe.imageUrl} alt={`${recipe.name.replace(' ','-')}`}/>
              </Box>
              <Typography id={`transition-modal-${recipe.name.replace(' ','-')}`} variant="h2" component="h1" align={"left"}>
                { recipe.name }
              </Typography>
              <Divider
                  sx={{
                    '&.MuiDivider-root': {
                      '&::before': {
                        borderTop: `thin solid crimson`
                      },
                      '&::after': {
                        borderTop: `thin solid crimson`
                      }
                    }
                  }}
                  textAlign="left"
                  variant="middle"
              >
                    <Typography variant="h6">About</Typography>
              </Divider>
              <Typography id={`transition-modal-${recipe.name.replace(' ','-')}-description`} align={"left"} variant="h6">
                { recipe.description }
              </Typography>
              <br />
              <Divider
                  sx={{
                    '&.MuiDivider-root': {
                      '&::before': {
                        borderTop: `thin solid crimson`
                      },
                      '&::after': {
                        borderTop: `thin solid crimson`
                      }
                    }
                  }}
                  textAlign="left"
                  variant="middle"
              >
                  <Typography variant="h6">Directions</Typography>
              </Divider>
            </Container>
          </Box>
        </Zoom>
      </Modal>
    </div>
  );
}
