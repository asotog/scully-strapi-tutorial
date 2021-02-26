require("dotenv").config();
const fs = require("fs");

fs.writeFileSync(
  "env.ts",
  `
export const ENV = {
  CMS_BASE_URL: '${process.env.CMS_BASE_URL}',
  GRAPHQL_API_URL: '${process.env.GRAPHQL_API_URL}',
  GRAPHQL_API_TOKEN: '${process.env.GRAPHQL_API_TOKEN}'
};
`
);
