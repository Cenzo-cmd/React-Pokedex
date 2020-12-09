import React, { useState } from "react";
import mockData from "../../utils/mockData";
import { Typography } from "@material-ui/core";
import { firstLetterUpper } from "../../utils/functions";

const Pokemon = props => {
    const { match } = props;
    const { params } = match;
    const { pokemonId } = params;
    const [pokemon, setPokemon] = useState(mockData[`${pokemonId}`]);

    const generatePokemonJSX = () => {
        const { name, id, species, height, weight, types, sprites } = pokemon;
        const largeImage = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        const { front_default } = sprites;


        return (
            <Typography variant="h1">
                {`${id}.`} {firstLetterUpper(name)}
                <img src={front_default} />

            </Typography>
        )
    };

    return (
        <>
            {generatePokemonJSX()}
        </>
    )
};

export default Pokemon;