import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { gql, request } from "graphql-request";

function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const query = gql`
          query getArticle($slug: String!) {
            article(slug: $slug} }) {
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

        const endpoint =
          "https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr";

        const data = await request(endpoint, query, variables);
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
