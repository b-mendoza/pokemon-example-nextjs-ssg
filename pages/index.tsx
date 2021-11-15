import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Card, Col, Container, FormControl, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';

import { Pokemon } from 'typings';

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

type APIResponse = {
  pokemonList: Pokemon[];
};

const getPokemon = async (_: string, query: string) => {
  const { data } = await axios.get<APIResponse>(
    `/api/search?q=${encodeURI(query)}`,
  );

  return data.pokemonList.map((pokemon) => ({
    ...pokemon,
    image: `/pokemon/${pokemon.name.english
      .toLowerCase()
      .replace(' ', '-')}.jpg`,
  }));
};

function Home() {
  const [query, setQuery] = useState('');

  const { data } = useQuery(['searchQuery', query], () =>
    getPokemon('searchQuery', query),
  );

  const handleSearch = (event: React.ChangeEvent<FormControlElement>) => {
    const input = event.target as HTMLInputElement;

    const inputValue = input.value;

    setQuery(inputValue);
  };

  return (
    <>
      <main>
        <Head>
          <title>Pokemon</title>
        </Head>

        <Container className="p-0">
          <FormControl
            aria-label="Search"
            className="mb-4"
            placeholder="Search"
            value={query}
            onChange={handleSearch}
          />

          {data ? (
            <Row xs={1} md={2} lg={3} xl={4}>
              {data.map((pokemon) => {
                const { id, name, type, image } = pokemon;

                return (
                  <Col key={id} className="mb-4">
                    <Link
                      href={`/pokemon/${encodeURI(name.english)}`}
                      prefetch={false}
                    >
                      <a>
                        <Card>
                          <Image
                            alt={name.english}
                            height={270}
                            layout="responsive"
                            priority
                            src={image}
                            title={name.english}
                            width={270}
                          />

                          <Card.Body>
                            <Card.Title>{name.english}</Card.Title>
                            <Card.Subtitle>{type.join(', ')}</Card.Subtitle>
                          </Card.Body>
                        </Card>
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

export default Home;
