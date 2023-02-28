import { Strategy } from 'passport-local';
import { comparePassword } from '../../auth/pass-hash';
import boom from '@hapi/boom';

import { client } from '../../../db/config';

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (username: string, password: string, done: any) => {
    try {
      const user = await client.query("SELECT * FROM users WHERE email = $1", [username]);
      if (!user.rows[0]) done(boom.unauthorized(), false);

      const isValid = await comparePassword(password, user.rows[0].password);
      if (!isValid) done(boom.unauthorized(), false);

      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

export { LocalStrategy };
