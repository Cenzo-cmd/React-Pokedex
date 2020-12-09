import React, { useState } from "react";
import mockData from "../../utils/mockData";
import { Typography, Link } from "@material-ui/core";
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
            <>
                <Typography variant="h1">
                    {`${id}.`} {firstLetterUpper(name)}
                    <img src={front_default} />
                </Typography>
                <img style={{ width: "300px", height: "300px" }} src={largeImage} />
                <Typography variant="h3">Pokemon Info</Typography>
                <Typography>
                    {"Species: "}
                    <Link href={species.url}>{species.name}</Link>
                </Typography>
                <Typography>Height: {height}</Typography>
                <Typography>Wight: {weight}</Typography>
                <Typography variant="h6">Types: </Typography>
                {types.map((typeInfo) => {
                    const { type } = typeInfo;
                    const { name } = type;
                    return (
                        <Typography key={name}> {`${name}`}</Typography>
                    )
                })}
            </>
        )
    };

    return (
        <>
            {generatePokemonJSX()}
        </>
    )
};

export default Pokemon;