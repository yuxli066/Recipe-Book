import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Zoom from "@mui/material/Zoom";
import Typography from "@mui/material/Typography";
import styles from "./style.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Container from "@mui/material/Container";

// steppers
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';

// custom comps
import TextDivider from "../Divider";

const steps = [
    {
        label: 'Select campaign settings',
        description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
    },
    {
        label: 'Create an ad group',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'Create an ad',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
];

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
                    <Stepper orientation="vertical" sx={{
                        '.MuiStepIcon-root': {
                            'circle': {
                                color: "crimson !important"
                            }
                        }
                    }}>
                        {steps.map((step, index) => (
                            <Step key={step.label} active={true}>
                                <StepLabel
                                    optional={
                                        index === 2 ? (
                                            <Typography variant="caption">Last step</Typography>
                                        ) : null
                                    }
                                />
                                <StepContent>
                                    <Typography>{step.description}</Typography>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                </Container>
              </Container>
          </Box>
        </Zoom>
      </Modal>
    </div>
  );
}
