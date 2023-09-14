import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { gql, request } from "graphql-request";
import client from "./datoCms";

function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
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
      } catch (error) {
        console.error("Error fetching article:", error);
      }
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
      {article.image && <img src={article.image.url} alt={article.title} />}
      <div dangerouslySetInnerHTML={{ __html: article.body }} />
    </div>
  );
}

export default ArticlePage;
