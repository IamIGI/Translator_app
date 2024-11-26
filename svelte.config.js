import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    paths: {
      base: '/translator', // This makes the app accessible under the /portfolio path
    },
    adapter: adapter({
      fallback: 'index.html', // Use index.html as the fallback for single-page apps
      assets: 'public', // Static assets are placed in the public folder
      pages: 'public', // The build output will be placed here
    }),
    alias: {
      $assets: 'src/assets',
    },
  },
};

export default config;
