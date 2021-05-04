import LinkTo from 'components/LinkTo';
import { Pokemon as PokemonType } from 'models';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import pokemon from 'pokemon.json';
import { Col, Container, Row } from 'react-bootstrap';

type Props = {
  data: PokemonType;
};

function Pokemon({ data }: Props) {
  return (
    <>
      <div>
        <Head>
          <title>{(data ? data.name.english : null) || 'Pokemon'}</title>
        </Head>

        <Container>
          {data ? (
            <>
              <Row>
                <Col xs={6}>
                  <h1>{data.name.english}</h1>

                  <br />

                  {Object.entries(data.base).map(([key, value]) => (
                    <Row key={key}>
                      <Col xs={3}>
                        <p>{key}</p>
                      </Col>
                      <Col xs={4}>
                        <h5>{value}</h5>
                      </Col>
                    </Row>
                  ))}
                </Col>

                <Col xs={6}>
                  <Image
                    src={`/pokemon/${data.name.english
                      .toLowerCase()
                      .replace(' ', '-')}.jpg`}
                    height={350}
                    width={350}
                  />
                </Col>
              </Row>
            </>
          ) : null}

          <LinkTo href="/">
            <h3>Return to Home</h3>
          </LinkTo>
        </Container>
      </div>

      <style jsx>{`
        div {
          padding: 3rem;
        }
      `}</style>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: pokemon.map(({ name: { english } }) => ({
    params: { name: english },
  })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: {
    data: pokemon.filter(
      ({ name: { english } }) => english === params?.name,
    )[0],
  },
});

export default Pokemon;
