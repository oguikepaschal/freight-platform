import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getDb, schema } from "@freight/database";
import NextAuth from "next-auth";
import type { DefaultSession, Session } from "next-auth";
import Google from "next-auth/providers/google";
import { redirect } from "next/navigation";

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

// The single place AUTH_ADMIN_ALLOWED_EMAILS is parsed. Read on every call,
// not at module load, so the signIn callback and requireAdmin always agree.
// A missing or empty list denies everyone.
export function isAllowedAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const allowed = (process.env.AUTH_ADMIN_ALLOWED_EMAILS ?? "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.trim().toLowerCase());
}

// Cookie names distinct from the portal's (both apps share localhost and the
// /api/auth path in development). Custom names don't get Auth.js's automatic
// __Secure-/__Host- prefix, so it's added here, and useSecureCookies is pinned
// to the same value so the prefix and the Secure flag always agree.
const secureCookies =
  process.env.VERCEL === "1" || (process.env.AUTH_URL ?? "").startsWith("https:");
const cookiePrefix = secureCookies ? "__Secure-" : "";

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  // Fail closed: without these, Auth.js would silently fall back to the
  // portal's AUTH_SECRET / AUTH_GOOGLE_* values. This runs per request, not
  // at build time, so `next build` works without them.
  const secret = process.env.AUTH_ADMIN_SECRET;
  const clientId = process.env.AUTH_ADMIN_GOOGLE_ID;
  const clientSecret = process.env.AUTH_ADMIN_GOOGLE_SECRET;
  if (!secret || !clientId || !clientSecret) {
    throw new Error(
      "Admin auth is not configured: set AUTH_ADMIN_SECRET, AUTH_ADMIN_GOOGLE_ID and AUTH_ADMIN_GOOGLE_SECRET",
    );
  }

  return {
    secret,
    adapter: DrizzleAdapter(getDb(), {
      usersTable: schema.staff,
      accountsTable: schema.staffAccounts,
      sessionsTable: schema.staffSessions,
      verificationTokensTable: schema.staffVerificationTokens,
    }),
    providers: [Google({ clientId, clientSecret })],
    // Explicit rather than relying on the adapter-present default, so the
    // strategy stays database-backed even if providers change later.
    session: { strategy: "database" },
    useSecureCookies: secureCookies,
    cookies: {
      sessionToken: { name: `${cookiePrefix}admin.session-token` },
      callbackUrl: { name: `${cookiePrefix}admin.callback-url` },
      csrfToken: { name: `${secureCookies ? "__Host-" : ""}admin.csrf-token` },
      pkceCodeVerifier: { name: `${cookiePrefix}admin.pkce.code_verifier` },
      state: { name: `${cookiePrefix}admin.state` },
      nonce: { name: `${cookiePrefix}admin.nonce` },
    },
    callbacks: {
      // Reject the sign-in outright for any Google account not on the
      // allowlist. requireAdmin re-checks it on every request as well.
      async signIn({ profile }) {
        return isAllowedAdminEmail(profile?.email);
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
  };
});

// Every admin page, layout and server action calls this first, before any
// data is read or written. It checks the session AND the allowlist on every
// call, so removing an email from AUTH_ADMIN_ALLOWED_EMAILS blocks that user
// on their next request instead of when their 30-day session expires.
// Failure redirects to sign-in, which also works from server actions.
export async function requireAdmin(): Promise<Session> {
  const session = await auth();
  if (!session?.user?.id || !isAllowedAdminEmail(session.user.email)) {
    redirect("/api/auth/signin");
  }
  return session;
}
