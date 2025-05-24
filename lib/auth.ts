import { getClient } from './db';

interface Users {
  id: number;
  username: string;
  name: string;
  email: string;
  password: string;
  user_type_id: number;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  reset_password_token?: string; 
  reset_password_expires?: Date; 
}


export const authenticateUser = async (email: string, password: string): Promise<Users | null> => {
  const client = await getClient();
  try {
   
    let result = await client.query<Users>('SELECT * FROM users WHERE email = $1', [email]);
    let user = result.rows[0];

    
    if (!user) {
      result = await client.query<Users>('SELECT * FROM corpUser WHERE email = $1', [email]);
      user = result.rows[0];
    }

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Compare the password directly (plain text comparison)
    if (password !== user.password) {
      throw new Error('Invalid email or password');
    }

    return user;  
  } finally {
    client.release();
  }
};
