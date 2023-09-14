import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import datoCms from "./datoCms";
import "./App.css";

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
    <div class="root">
      <header>
        <navbar class="navbar">
          <div class="logo">
            <img src="/multi.png" alt=""></img>
          </div>
          <h1>Multi Blog</h1>
        </navbar>
      </header>
      <section class="article">
        <ul class="cardarticle">
          {articles.map((article) => (
            <li key={article.slug}>
              <h2 class="title">{article.title}</h2>
              <img class="image" src={article.image.url} alt={article.title} />
              <p>{article.body}</p>
              <Link to={`/article/${article.slug}`}>Vai all' Articolo </Link>
            </li>
          ))}
          {}
        </ul>
      </section>
    </div>
  );
}

export default HomePage;
