# Warwick Law Society Website

A website for Warwick Law Society with a **members-only area** gated by the
[Warwick SU Membership API](https://www.warwicksu.com/membershipapi/about/).
Only people with a valid, current Warwick Law Society membership can log in
and see it.

This guide assumes no coding experience - follow it step by step.

## What's in the members area

- **Application Tracker** - key vacation scheme / training contract deadlines
- **Alumni Network** - a directory of Warwick Law alumni in commercial law
- **Commercial Awareness Forum** - a space to discuss commercial news

Right now the Alumni Network and Application Tracker show sample rows that
committee members can edit directly (see "Editing content" below). The
Forum shows a sample post - letting members actually post to it needs a
database and is a good next step (see "What's not built yet").

## How the login works

1. Each member generates their own personal **membership key** from the
   Warwick SU website (via the Membership API tool on the Warwick Law
   Society exec page).
2. They enter that key on this site's `/login` page.
3. The site asks the Warwick SU Membership API, server-to-server, "is this
   person a current member of Warwick Law Society?" using the society's
   organisation key.
4. If yes, they get a secure login cookie and can see `/members` and
   everything under it. If not, they're told membership couldn't be
   verified.

The society's organisation key is never put in the website's code or sent
to anyone's browser - it's only used on the server, via an environment
variable (explained below), so it can't be stolen by someone viewing the
page source.

## Deploying this site (recommended: Vercel)

[Vercel](https://vercel.com) is a free hosting service made by the creators
of Next.js (the framework this site uses). It deploys straight from this
GitHub repository - no server to manage.

1. Go to [vercel.com](https://vercel.com) and sign up (you can sign up with
   your GitHub account).
2. Click **Add New... -> Project**, and select this GitHub repository
   (`Warwick-Law-Society-Website`).
3. Vercel will detect it's a Next.js project automatically - you don't need
   to change any build settings.
4. Before clicking Deploy, open **Environment Variables** and add:
   - `WARWICK_SU_ORG_KEY` - your Warwick Law Society organisation key from
     the Membership API tool
   - `SESSION_SECRET` - any long random string (at least 32 characters).
     If you're not sure what to put, ask whoever manages the site's code to
     generate one, or use an online "random password generator" for a
     32+ character string.
5. Click **Deploy**. After a minute or two, Vercel gives you a live URL.
6. Once it works, you can connect your own domain (e.g.
   `warwicklawsociety.com`) under the project's **Settings -> Domains**.

Every time new changes are pushed to this repository's main branch, Vercel
automatically redeploys the site.

## Running it on your own computer (optional)

Only needed if someone wants to test changes before they go live.

1. Install [Node.js](https://nodejs.org) (the LTS version).
2. In this folder, run:
   ```
   npm install
   cp .env.local.example .env.local
   ```
3. Open `.env.local` and fill in `WARWICK_SU_ORG_KEY` and `SESSION_SECRET`
   (see above). **Never commit this file or share it** - it's already
   excluded from git via `.gitignore`.
4. Run:
   ```
   npm run dev
   ```
5. Open <http://localhost:3000> in a browser.

## Editing content

- **Alumni Network**: edit the `alumni` list near the top of
  `app/members/alumni/page.js`.
- **Application Tracker**: edit the `applicationWindows` list near the top
  of `app/members/tracker/page.js`.

Each entry is a plain block like:

```js
{
  name: "Jane Doe",
  gradYear: "2022",
  firm: "Example LLP",
  role: "Trainee Solicitor",
  linkedin: "https://linkedin.com/in/example",
},
```

Copy, paste, and edit a block to add a new row - no other code needs to
change. Commit and push the change (or ask someone who can) and Vercel will
redeploy the site automatically.

## What's not built yet

This is a real, working members gate, but two features are intentionally
left as previews for a future update, since they need more than static
pages:

- **Posting to the Forum**: needs a database to store posts/replies and a
  way to tell members apart (not just "is a member", but "which member").
- **A personal Application Tracker** (each member tracking their own
  applications, rather than one shared list): also needs individual member
  accounts and a database.

A good next step would be adding a small hosted database (e.g. Vercel
Postgres or Supabase) once the login gate above is live and working.

## A note on the Warwick SU API response format

The Warwick SU Membership API's exact response format for "is this person a
member" isn't fully documented publicly. `lib/warwickSu.js` handles the most
likely formats (plain "True"/"False" text, JSON, or a simple XML tag). If
logins don't behave as expected after deploying, check the server logs
(Vercel: Project -> your deployment -> Functions/Logs) for a line starting
"Warwick SU isMember raw response:" - it shows exactly what the API sent
back, which is enough to adjust the code if needed.
