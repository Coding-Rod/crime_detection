import { Strategy, ExtractJwt } from 'passport-jwt';

import { config } from '../../../config';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

const JwtStrategy = new Strategy(options, async (payload: any, done: any) => {
  try {
    done(null, payload);
  } catch (error) {
    done(error, false);
  }
});

export { JwtStrategy };
