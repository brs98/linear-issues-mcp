import * as dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

// Define environment variable schema
const envSchema = z.object({
  LINEAR_API_KEY: z.string().min(1, 'Linear API key is required'),
  SERVER_NAME: z.string().default('linear-issues-mcp'),
  SERVER_VERSION: z.string().default('1.0.0'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

// Parse and validate environment variables
export const env = envSchema.parse({
  LINEAR_API_KEY: process.env.LINEAR_API_KEY,
  SERVER_NAME: process.env.SERVER_NAME,
  SERVER_VERSION: process.env.SERVER_VERSION,
  LOG_LEVEL: process.env.LOG_LEVEL,
});

// Export config object
export const appConfig = {
  linear: {
    apiKey: env.LINEAR_API_KEY,
    baseUrl: 'https://api.linear.app/graphql',
  },
  server: {
    name: env.SERVER_NAME,
    version: env.SERVER_VERSION,
  },
  logging: {
    level: env.LOG_LEVEL,
  },
}; 