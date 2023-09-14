import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GraphQLClient, gql } from "graphql-request";

function ArticlePage() {
  const { slug } = useParams(null);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
      const API_TOKEN = "23d68bb0bba7a845ee6e58c35fd841";
      const client = new GraphQLClient("https://graphql.datocms.com/", {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      const query = gql`
        query getArticle($slug: String!) {
          article(filter: { slug: { eq: $slug } }) {
            title
            body
            image {
              url
            }
          }
        }
      `;

      const variables = {
        slug: slug,
      };

      const data = await client.request(query, variables);
      setArticle(data.article);
    }

    fetchArticle();
  }, [slug]);
  if (!article) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Link to="/">Torna alla homepage</Link>
      <h1>{article.title}</h1>
      {article.image && <img src="{article.image.url" alt=""></img>}
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
}

export default ArticlePage;
