import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import StepContent from "@mui/material/StepContent";


export default function RecipeInstructions ({steps}) {
    return (
        <Stepper style={{ paddingBottom: "2em" }} orientation="vertical" sx={{
            '.MuiStepIcon-root': {
                'circle': {
                    color: "crimson !important"
                }
            }
        }}>
            {steps.map((step, index) => (
                <Step key={`recipe-instruction-${index}`} active={true}>
                    <StepLabel
                        optional={
                            index === steps.length - 1 ? (
                                <Typography variant="caption">Last step</Typography>
                            ) : null
                        }
                    />
                    <StepContent>
                        <Typography>{step}</Typography>
                    </StepContent>
                </Step>
            ))}
        </Stepper>
    );
}