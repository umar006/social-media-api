import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/**/*.schema.ts',
  out: './src/database/migrations',
  driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
} satisfies Config;
