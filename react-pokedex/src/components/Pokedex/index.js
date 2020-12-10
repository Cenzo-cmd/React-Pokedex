import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Grid, Card, CardContent, CardMedia, CircularProgress, Typography, TextField } from "@material-ui/core";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { toFirstCharUppercase } from "../../utils/functions";
import axios from "axios";

const useStyles = makeStyles(theme => ({
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
    searchContainer: {
        display: "flex",
        backgroundColor: fade(theme.palette.common.white, 0.15),
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "5px",
        marginBottom: "5px"
    },
    searchIcon: {
        alignSelf: "flex-end",
        marginBottom: "5px"
    },
    searchInput: {
        width: "200px",
        margin: "5px"
    }

}));


const Pokedex = props => {
    const classes = useStyles();
    const [pokemonData, setPokemomData] = useState({});
    const [filtered, setFiltered] = useState("");
    const { history } = props;

    const handleChange = (e) => {
        setFiltered(e.target.value);
    };

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1500`).then(function (response) {
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
                <Toolbar>
                    <div className={classes.searchContainer}>
                        <SearchIcon className={classes.searchIcon} />
                        <TextField className={classes.searchInput} onChange={handleChange} label="Search for a Pokemon" variant="standard" />
                    </div>
                </Toolbar>
            </AppBar>
            {pokemonData ?
                (
                    <Grid container spacing={2} className={classes.pokedexContainer}>
                        {Object.keys(pokemonData).map(pokemonId =>
                            pokemonData[pokemonId].name.includes(filtered) &&
                            getPokemonCard(pokemonId))}
                    </Grid>
                ) : (
                    <CircularProgress />
                )}



        </>
    )
};

export default Pokedex;