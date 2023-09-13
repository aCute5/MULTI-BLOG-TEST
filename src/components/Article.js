// src/components/ArticlePage.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import datoCms from "../datoCms";

function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await datoCms.request(`
          query {
            article(filter: { slug: { eq: "${slug}" } }) {
              title
              content
              coverImage {
                url
              }
            }
          }
        `);

        setArticle(response.article);
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
      <img src={article.coverImage.url} alt={article.title} />
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
}

export default ArticlePage;
