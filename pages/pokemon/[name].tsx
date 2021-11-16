import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

import pokemonList from 'pokemon.json';

import { Pokemon } from 'typings/pokemon';

import PokemonData from 'components/PokemonData';

type PokemonViewProps = {
  data: Pokemon | null;
};

function PokemonView({ data }: PokemonViewProps) {
  if (!data) return null;

  const { name } = data;

  return (
    <>
      <Head>
        <title>{name.english || 'Pokemon'}</title>
      </Head>

      <main>
        <Container>
          <PokemonData {...data} />

          <footer>
            <Link href="/">
              <a>
                <p>
                  <strong>Back to Home</strong>
                </p>
              </a>
            </Link>
          </footer>
        </Container>
      </main>

      <style jsx>{`
        main {
          padding: 1.5rem;
        }
      `}</style>
    </>
  );
}

type RouteParams = {
  name: string;
};

export const getStaticPaths: GetStaticPaths<RouteParams> = () => ({
  fallback: false,
  paths: pokemonList.map((pokemon) => {
    const { name } = pokemon;

    return {
      params: { name: name.english },
    };
  }),
});

export const getStaticProps: GetStaticProps<PokemonViewProps, RouteParams> = (
  context,
) => {
  const { params } = context;

  const typedPokemonList = pokemonList as Pokemon[];

  const pokemon = typedPokemonList.find((pokemon) => {
    const { name } = pokemon;

    return name.english === params?.name;
  });

  return {
    props: { data: pokemon ?? null },
  };
};

export default PokemonView;
