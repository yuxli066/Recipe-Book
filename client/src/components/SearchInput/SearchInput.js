import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

export default function SearchInput() {
  return (
    <Stack
      spacing={2}
      sx={{
        width: 300,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "2em",
      }}
    >
      <Autocomplete
        freeSolo
        id="recipe-search-bar"
        disableClearable
        options={recipes.map((option) => option.RecipeName)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </Stack>
  );
}

// TODO: temp placeholder, will pull from db later
const recipes = [
  { RecipeName: "Kung Pao Chicken", Origin: "No Idea" },
  { RecipeName: "Xiao Long Bao", Origin: "ShangHai" },
];
