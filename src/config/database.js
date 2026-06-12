import 'dotenv/config';

import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const { DATABASE_URL, NEON_LOCAL_PROXY_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

if (NEON_LOCAL_PROXY_URL) {
  neonConfig.fetchEndpoint = NEON_LOCAL_PROXY_URL;
  neonConfig.poolQueryViaFetch = true;
  neonConfig.useSecureWebSocket = false;
}

const sql = neon(DATABASE_URL);
const db = drizzle(sql);

export { db, sql };
