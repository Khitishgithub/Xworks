
import { Pool, Client } from 'pg';

// Define the database configuration
const pool = new Pool({
  user: 'postgres',  
  host: 'localhost',     
  database: 'postgres',  
  password: 'postgres', 
  port: 5432,  
});


export const getClient = async (): Promise<Client> => {
  const client = await pool.connect();
  return client;
};


