import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  driver: 'expo', // Important: explicitly set driver to expo
  schema: './db/schema.ts',
  out: './drizzle',
});
