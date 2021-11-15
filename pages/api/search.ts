import { Pokemon } from 'typings';
import { NextApiRequest, NextApiResponse } from 'next';

import pokemon from 'pokemon.json';

type Data = {
  pokemonList: Pokemon[];
};

export default function searchPokemon(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const typedPokemonList = pokemon as Pokemon[];

  const filter = req.query.q ? new RegExp(req.query.q as string, 'i') : /.*/;

  res.status(200).json({
    pokemonList: typedPokemonList
      .filter(({ name: { english } }) => filter.exec(english))
      .slice(0, 10),
  });
}
