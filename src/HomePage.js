import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import datoCms from "./datoCms";

function HomePage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await datoCms.request(`
          query {
            allArticles {
              slug
              title
              body
              image{
                url
              }
            }
          }
        `);

        setArticles(response.allArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.slug}>
            <img src={article.image.url} alt={article.title} />
            <h2>{article.title}</h2>
            <p>{article.body}</p>
            <Link to={`/article/${article.slug}`}>Leggi di più</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
