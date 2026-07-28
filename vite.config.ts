import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { localApiPlugin } from './vite-plugin-local-api'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  for (const key of [
    'NOTION_TOKEN',
    'NOTION_DATABASE_ID',
    'NOTION_PROP_TITLE',
    'NOTION_PROP_EMAIL',
    'NOTION_PROP_PHONE',
    'NOTION_PROP_INQUIRY_TYPE',
    'NOTION_INQUIRY_TYPE_VALUE',
    'NOTION_PROP_SUBMITTED_DATE',
  ]) {
    if (env[key]) {
      process.env[key] = env[key]
    }
  }

  return {
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    localApiPlugin(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
  }
})
