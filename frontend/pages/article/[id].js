import ReactMarkdown from "react-markdown";
import Head from "next/head";
import Link from "next/link";
import { Button, Heading } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default ({ article }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <Head>
        <title>{article.title}</title>
      </Head>
      <Heading as="h3" size="lg">
        {article.title}
      </Heading>
      <ReactMarkdown>{article.body}</ReactMarkdown>
      <br />
      <Button rightIcon={<ArrowForwardIcon />} colorScheme="cyan">
        <Link href="/">На главную</Link>
      </Button>
    </div>
  );
};

export const getStaticProps = async (context) => {
  const res = await fetch(
    `http://localhost:1337/articles/${context.params.id}`
  );
  const data = await res.json();

  return {
    props: {
      article: data,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:1337/articles");
  const articles = await res.json();

  const paths = articles.map((item) => ({
    params: { id: item.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};
