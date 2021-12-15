import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
// import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Rating from "@mui/material/Rating";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// custom comps
// import SearchInput from "../SearchInput";
import RecipeModal from "../RecipeModal";

// services
import { getRecipes } from "../../services/recipeService";

// styles
import styles from "./style.module.css";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Leo Li
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme({
  typography: {
    fontFamily: [
      'Architects Daughter',
      'cursive'
    ].join(',')
  }
});

export default function FoodAlbum() {
  // states
  const [recipes, setRecipes] = useState([]);
  const [ currentOpen, setCurrentOpen ] = useState({
    "imageUrl": "http://localhost.com",
    "name": "PlaceHolder",
    "description": "PlaceHolder",
    "rating": 5
  });
  const [open, setOpen] = React.useState(false);

  const handleOpen = (currentRecipe) => {
    setCurrentOpen(currentRecipe);
    setOpen(true);
  };
  const handleClose = () => {
    // clear recipe info
    setOpen(false);
  };

  useEffect(() => {
    getRecipes.then((recipes) => {
      setRecipes(recipes);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/*<Container className={`${open ? styles.hide : styles.display}`}>*/}
      {/*  <SearchInput />*/}
      {/*</Container>*/}
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgColor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container
            maxWidth="sm"
            className={`${open ? styles.hide : styles.display}`}
          >
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Recipe Book
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              A collection of Chinese cuisine recipes you can make from the
              comfort of your home.
            </Typography>
            {/*<Stack*/}
            {/*  sx={{ pt: 4 }}*/}
            {/*  direction="row"*/}
            {/*  spacing={2}*/}
            {/*  justifyContent="center"*/}
            {/*>*/}
            {/*  <Button variant="contained">Add New Recipe</Button>*/}
            {/*</Stack>*/}
          </Container>
        </Box>
        <Container sx={{ py: 3, zIndex: 800 }} maxWidth="md">
          {/* End hero unit */}
          <Grid
            container
            spacing={4}
            className={`${open ? styles.hide : styles.display}`}
          >
            {recipes &&
              recipes.map((card, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "150px",
                      display: "inline-block",
                      flexDirection: "column",
                    }}
                    onClick={() => handleOpen(card)}
                  >
                    <CardMedia
                      component="img"
                      sx={
                        {
                          // 16:9
                        }
                      }
                      image={card.imageUrl}
                      className={styles.thumbnail}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.name}
                      </Typography>
                      <Typography>{card.description}</Typography>
                    </CardContent>
                    <Rating name="simple-controlled" value={card.rating} />
                    <CardActions>
                      <Button size="small">Read Step by Step</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
          <Box
            className={`${styles.modal_overlay} ${
              open ? styles.display : styles.hide
            }`}
          />
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        />
        <Copyright />
      </Box>
      <RecipeModal handleClose={handleClose} open={open} recipe={currentOpen}/>
      {/* End footer */}
    </ThemeProvider>
  );
}
