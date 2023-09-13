// src/components/HomePage.js
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
            {/* <img src={article.coverImage.url} alt={article.title} />  */}
            <h2>{article.title}</h2>
            <p></p>
            <Link to={`/article/${article.slug}`}>Leggi di più</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
