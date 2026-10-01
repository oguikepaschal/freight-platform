import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getDb, schema } from "@freight/database";
import NextAuth from "next-auth";
import type { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";

// Auth.js's default `session` callback leaves id off the session. Assignment
// records session.user.id as staff.id, so the callback below re-adds it and
// this augmentation types it as string — same pattern as apps/portal/auth.ts.
declare module "next-auth" {
  // Declaration merging, not a new binding — eslint's base no-unused-vars
  // can't see the merge and misreads this as dead code.
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const ALLOWED_ADMIN_EMAILS = (process.env.AUTH_ADMIN_ALLOWED_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export const { handlers, auth, signIn, signOut } = NextAuth(() => ({
  // Auth.js falls back to AUTH_SECRET when `secret` is unset — set it
  // explicitly so admin sessions never end up signed with the portal's
  // secret in an environment where both are present.
  secret: process.env.AUTH_ADMIN_SECRET,
  adapter: DrizzleAdapter(getDb(), {
    usersTable: schema.staff,
    accountsTable: schema.staffAccounts,
    sessionsTable: schema.staffSessions,
    verificationTokensTable: schema.staffVerificationTokens,
  }),
  providers: [
    Google({
      clientId: process.env.AUTH_ADMIN_GOOGLE_ID,
      clientSecret: process.env.AUTH_ADMIN_GOOGLE_SECRET,
    }),
  ],
  // Explicit rather than relying on the adapter-present default, so the
  // strategy stays database-backed even if providers change later.
  session: { strategy: "database" },
  callbacks: {
    // Reject the sign-in outright — not just hiding UI afterward — for
    // any Google account not on the admin allowlist.
    async signIn({ profile }) {
      if (!profile?.email) return false;
      return ALLOWED_ADMIN_EMAILS.includes(profile.email.toLowerCase());
    },
    // Database sessions receive the full adapter user record — `user.id` is
    // staff.id. Rebuilt to the default callback's minimal shape plus id, so
    // adapter-internal fields don't leak into the session payload.
    session({ session, user }) {
      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
        expires: session.expires,
      };
    },
  },
}));
