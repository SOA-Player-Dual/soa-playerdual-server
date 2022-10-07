import passport from 'passport';
import passportGoogle, {
  Profile,
  VerifyCallback,
} from 'passport-google-oauth20';
import 'dotenv/config';

const GoogleStrategy = passportGoogle.Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
      scope: ['profile'],
    },
    (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      _done: VerifyCallback,
    ) => {
      _done(null, profile);
    },
  ),
);
