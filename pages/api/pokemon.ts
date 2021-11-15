import { Pokemon } from 'typings';
import { NextApiRequest, NextApiResponse } from 'next';

import pokemon from 'pokemon.json';

type Data = Pokemon;

export default function getPokemon(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (!req.query.name) {
    res.statusCode = 400;

    res.end('Must Have a Name');

    return;
  }

  const found = pokemon.filter(
    ({ name: { english } }) => english === req.query.name,
  );

  if (found.length) res.setHeader('Content-Type', 'application/json');

  res.statusCode = found.length ? 200 : 404;

  res.end(
    found.length
      ? JSON.stringify(found[0])
      : `Pokemon ${req.query.name as string} - Not Found`,
  );
}
