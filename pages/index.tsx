// import { GetStaticProps } from 'next';

import Head from 'next/head';
import Link from 'next/link';
import { Col, Container, FormControl, Row } from 'react-bootstrap';
import useSWR from 'swr';

import PokemonCard from 'components/PokemonCard';

import { Pokemon } from 'typings/pokemon';
import { CustomPageProps } from 'typings/shared';
import { GetStaticProps } from 'next';

// import { CustomPageProps } from 'typings/shared';

type APIResponse = {
  pokemonList: Pokemon[];
};

const initialURLRequest = `/api/search?q=${encodeURI('')}`;

function Home() {
  const { data: response } = useSWR<APIResponse>(initialURLRequest);

  const pokemonList = response?.pokemonList;

  // const handleSearch: React.ComponentProps<typeof FormControl>['onChange'] = (
  //   event,
  // ) => {
  //   const input = event.target as HTMLInputElement;

  //   const inputValue = input.value;
  // };

  return (
    <>
      <Head>
        <title>Pokemon</title>
      </Head>

      <main>
        <Container className="p-0">
          <FormControl
            aria-label="Search"
            className="mb-4"
            placeholder="Search"
            // onChange={handleSearch}
          />

          {pokemonList ? (
            <Row xs={1} md={2} lg={3} xl={4}>
              {pokemonList.map((pokemon) => {
                const { id, name } = pokemon;

                return (
                  <Col key={id} className="mb-4">
                    <Link
                      href={`/pokemon/${encodeURI(name.english)}`}
                      prefetch={false}
                    >
                      <a>
                        <PokemonCard {...pokemon} />
                      </a>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          ) : null}
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

export const getStaticProps: GetStaticProps<CustomPageProps> = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ABSOLUTE_SERVER_URL}${initialURLRequest}`,
    );

    const data = (await response.json()) as Promise<APIResponse>;

    return {
      props: {
        fallback: { [`${initialURLRequest}`]: data },
      },
    };
  } catch {
    return {
      props: {
        fallback: { [`${initialURLRequest}`]: null },
      },
    };
  }
};

export default Home;
