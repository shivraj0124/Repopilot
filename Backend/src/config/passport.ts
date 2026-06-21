import passport from "passport";
import {
  Strategy as GitHubStrategy,
} from "passport-github2";

console.log(process.env.GITHUB_CLIENT_ID);
console.log(process.env.GITHUB_CLIENT_SECRET);
passport.use(
  new GitHubStrategy(
    {
      clientID:
        process.env.GITHUB_CLIENT_ID!,
      clientSecret:
        process.env.GITHUB_CLIENT_SECRET!,
      callbackURL:
        `${process.env.NEXT_PUBLIC_API_URL}/auth/github/callback`,
    },
    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {
      return done(null, profile);
    }
  )
);

export default passport;