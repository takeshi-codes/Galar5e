import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  database: process.env.MONGODB_URI,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => NextAuth(req, res, options);
