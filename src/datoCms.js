import { GraphQLClient } from "graphql-request";

const API_TOKEN = "23d68bb0bba7a845ee6e58c35fd841";
const client = new GraphQLClient("https://graphql.datocms.com/", {
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const fetchArticles = async () => {
  const query = `
    query {
      allArticles {
        id
        title
        _status
        _firstPublishedAt
        body
        slug
        image {
          url
        }
        article{
          id
          slug 
          image{
            url
          
        }
      }
    }
  `;

  const data = await client.request(query);
  return data.allArticles;
};
export const fetchArticle = async () => {
  const query2 = `
      query {
        article {
         id
         image{
          url
         }
         slug
         body
         title
        }
      }
    `;
  const data2 = await client.request(query2);
  return data2.article;
};

export default client;
