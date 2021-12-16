import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import KitchenIcon from '@mui/icons-material/Kitchen';

export default function RecipeIngredients({ ingredients }) {
    return (
        <>
            {
                ingredients.map((iList, index) => {
                    return iList.length > 0 &&
                        (
                            <List
                                dense={true}
                                key={`ingredient-sublist-${index}`}
                                sx={{
                                    display: "inline-block",
                                    verticalAlign: "top",
                                    maxWidth: "50%"
                                }}
                            >
                                {
                                    iList.map(i => (
                                        <ListItem key={i}>
                                            <ListItemIcon sx={{ minWidth: "30px" }}>
                                                <KitchenIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={i}
                                            />
                                        </ListItem>
                                    ))
                                }
                            </List>
                        )
                })
            }
        </>
    );
}