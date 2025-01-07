import { AppRoutes } from '@/utils/AppRoutes';
import { isDevelopment } from '@/utils/environment';
import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

const handler = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID || '',
      clientSecret: process.env.KEYCLOAK_SECRET || '',
      issuer: process.env.KEYCLOAK_ISSUER,
      authorization: {
        params: {
          scope: 'openid email profile',
          prompt: 'login',
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    }
  },
  pages: {
    signIn: AppRoutes.LOGIN,
    signOut: AppRoutes.LOGIN_WITH_LOGOUT,
  },
  events: {
    async signOut({ token }) {
      if (token?.accessToken) {
        try {
          const issuerUrl = process.env.KEYCLOAK_ISSUER;
          const logoutUrl = `${issuerUrl}/protocol/openid-connect/logout`;
          await fetch(logoutUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `client_id=${process.env.KEYCLOAK_ID}&refresh_token=${token.accessToken}`,
          });
        } catch (error) {
          if (isDevelopment) {
            console.error('Chyba pri odhlasovani z Keycloak:', error);
          }
        }
      }
    },
  }
});

export { handler as GET, handler as POST }; 