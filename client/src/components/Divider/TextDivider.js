import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import * as React from "react";

export default function TextDivider ({ text }) {
    return (
        <Divider
            sx={{
                '&.MuiDivider-root': {
                    '&::before': {
                        borderTop: `thin solid crimson`
                    },
                    '&::after': {
                        borderTop: `thin solid crimson`
                    }
                },
                paddingTop: "1em"
            }}
            textAlign="left"
            variant="middle"
        >
            <Typography variant="h6">{text}</Typography>
        </Divider>
    );
}