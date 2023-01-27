import pg from 'pg';
import config from '../../config';

const { DB_USER, DB_HOST, DB_PASS, DB_NAME, DB_PORT } = config;

export const pgPool = new pg.Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASS,
  port: parseInt(DB_PORT || '3001'),
});
