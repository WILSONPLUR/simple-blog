import Link from "next/link";
import Head from "next/head";
import {
  Button,
  Heading,
  Container,
  List,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

export default function Home({ articles }) {
  return (
    <Container maxW="container.lg">
      <div
        style={{
          marginTop: "50px",
        }}
      >
        <Head>
          <title>Главная</title>
          <link
            rel="shortcut icon"
            type="image/png"
            href="../public/blog.png"
          />
        </Head>
        {articles.map((item, i) => {
          return (
            <UnorderedList key={i} style={{ marginLeft: "40px" }}>
              <ListItem
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  textAlign: "center",
                }}
              >
                <Heading as="h3" size="lg" style={{ marginBottom: "20px" }}>
                  {item.title}
                </Heading>
                <Button rightIcon={<ViewIcon />} colorScheme="blue">
                  <Link href={`/article/${item.id}`}>Читать</Link>
                </Button>
              </ListItem>
            </UnorderedList>
          );
        })}
      </div>
    </Container>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:1337/articles");
  const data = await res.json();

  return {
    props: {
      articles: data,
    },
    revalidate: 1,
  };
};
