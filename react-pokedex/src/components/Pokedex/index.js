import React from "react";
import { AppBar, Toolbar, Grid, Card, CardContent } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles({
    pokedexContainer: {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px",
    }
});

const getPokemonCard = () => {
    // set for mobile screens item xs={12} sm={4}>
    return (
        <Grid item xs={4}>
            <Card>
                <CardContent>
                    Hi
                </CardContent>
            </Card>
        </Grid>
    )
}

const Pokedex = () => {
    const classes = useStyles();
    return (
        <>
            <AppBar position="static">
                <Toolbar />
            </AppBar>
            <Grid container spacing={2} className={classes.pokedexContainer}>
                {getPokemonCard()}
                {getPokemonCard()}
                {getPokemonCard()}
                {getPokemonCard()}
                {getPokemonCard()}
                {getPokemonCard()}
            </Grid>
        </>
    )
};

export default Pokedex;