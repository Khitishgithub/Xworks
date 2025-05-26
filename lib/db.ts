import { Pool, Client } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'shortline.proxy.rlwy.net', 
  database: 'railway',
  password: 'NODWKQYSeqooyCKMROkiCcUlnNHwlySk',
  port: 59816, 
  ssl: {
    rejectUnauthorized: false, 
  },
});

export const getClient = async (): Promise<Client> => {
  const client = await pool.connect();
  return client;
};
