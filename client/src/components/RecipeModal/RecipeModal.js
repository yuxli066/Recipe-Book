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
import RecipeIngredients from "../RecipeIngredients";

export default function RecipeModal({
  open,
  handleClose,
  recipe,
  recipeDetails,
}) {
  const steps = recipeDetails.directions.split("|");
  let ingredients = recipeDetails.ingredients.split("|");
  let start = -5;
  ingredients = ingredients.map((i) => {
    start += 5;
    return ingredients.slice(start, start + 5);
  });
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
        <Zoom in={open} style={{ transitionDelay: "500ms" }}>
          <Box className={styles.modal}>
            <CloseIcon
              sx={{ fontSize: 70 }}
              className={styles.close_button}
              onClick={handleClose}
            />
            <Container maxWidth="md">
              {/* <Box className={styles.image_container}>
                <img
                  className={styles.recipe_image}
                  src={`data:image/png;base64,${recipe.imageUrl}`}
                  alt={`${recipe.name.replace(" ", "-")}`}
                />
              </Box> */}
              <Container
                style={{
                  width: "98%",
                }}
              >
                <Typography
                  id={`transition-modal-${recipe.name.replace(" ", "-")}`}
                  variant="h2"
                  component="h1"
                  align={"left"}
                >
                  {recipe.name}
                </Typography>
                <Typography variant="subtitle1" component="h1">
                  <i>"{recipeDetails.notes}"</i>
                </Typography>
              </Container>
              <TextDivider text={"About"} />
              <Container style={{ width: "90%" }}>
                <Typography
                  id={`transition-modal-${recipe.name.replace(
                    " ",
                    "-"
                  )}-description`}
                  align={"left"}
                  variant="h6"
                >
                  {recipe.description}
                </Typography>
              </Container>
              <br />
              <TextDivider text={"Ingredients"} />
              <Container style={{ width: "90%" }}>
                <RecipeIngredients ingredients={ingredients} />
              </Container>
              <br />
              <TextDivider text={"Directions"} />
              <Container style={{ width: "90%" }}>
                <RecipeInstructions steps={steps} />
              </Container>
            </Container>
          </Box>
        </Zoom>
      </Modal>
    </div>
  );
}
