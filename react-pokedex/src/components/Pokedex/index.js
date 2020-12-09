import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Grid, Card, CardContent, CardMedia, CircularProgress, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "../../utils/functions";
import axios from "axios";

const useStyles = makeStyles({
    pokedexContainer: {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px",
    },
    cardMedia: {
        margin: "auto"
    },
    cardContent: {
        textAlign: "center"
    },
});


const Pokedex = props => {
    const classes = useStyles();
    const [pokemonData, setPokemomData] = useState({});
    const { history } = props;

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=807`).then(function (response) {
            const { data } = response;
            const { results } = data;
            const newPokemonData = {};
            results.forEach((pokemon, index) => {
                newPokemonData[index + 1] = {
                    //only pulling data we need, if we want more from API call just add ing this object
                    id: index + 1,
                    name: pokemon.name,
                    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
                }
            });
            setPokemomData(newPokemonData);
        });
    }, [])

    const getPokemonCard = (pokemonId) => {
        const { id, name, sprite } = pokemonData[pokemonId];

        // set for mobile screens item xs={12} sm={4}>
        console.log(pokemonData[`${pokemonId}`])
        return (
            <Grid item xs={4} key={pokemonId}>
                <Card onClick={() => history.push(`/${pokemonId}`)} >
                    <CardMedia className={classes.cardMedia} image={sprite} style={{ width: "130px", height: "130px" }} />

                    <CardContent className={classes.cardContent}>
                        <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
                    </CardContent>
                </Card>
            </Grid >
        )
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar />
            </AppBar>
            {pokemonData ?
                (
                    <Grid container spacing={2} className={classes.pokedexContainer}>
                        {Object.keys(pokemonData).map(pokemonId => getPokemonCard(pokemonId))}
                    </Grid>
                ) : (
                    <CircularProgress />
                )}



        </>
    )
};

export default Pokedex;