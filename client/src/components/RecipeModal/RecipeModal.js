import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Zoom from "@mui/material/Zoom";
import Typography from "@mui/material/Typography";
import styles from "./style.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Container from "@mui/material/Container";

// custom comps
import TextDivider from "../Divider";
import RecipeInstructions from "../RecipeInstructions";

export default function RecipeModal({ open, handleClose, recipe, recipeDetails }) {
  const steps = recipeDetails.directions.split("|");
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
              <TextDivider text={"About"}/>
              <Container style={{width: "90%"}}>
                <Typography id={`transition-modal-${recipe.name.replace(' ','-')}-description`} align={"left"} variant="h6">
                    { recipe.description }
                </Typography>
              </Container>
              <br />
              <TextDivider text={"Ingredients"}/>
              <br />
              <TextDivider text={"Directions"}/>
                <Container style={{width: "90%"}}>
                    <RecipeInstructions steps={steps} />
                </Container>
              </Container>
          </Box>
        </Zoom>
      </Modal>
    </div>
  );
}
