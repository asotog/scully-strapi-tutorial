import { ScullyConfig } from '@scullyio/scully';
import './scully/plugins/postsPagesPlugin';

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "scully-strapi-tutorial",
  outDir: './dist/static',
  routes: {
    '/p/:postId': {
      type: 'postsPagesPlugin'
    }
  }
};