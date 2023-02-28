import passport from 'passport';
import { JwtStrategy } from './strategies/jwt.strategy';

passport.use(JwtStrategy);
