# The Vault — Delhi (website)

A premium marketing site for Delhi’s first dedicated poker venue: dark theme, gold accents, animations, and four pages (Home, About, Games & Tables, Contact).

## What you need

- **Node.js** 18 or newer ([nodejs.org](https://nodejs.org))
- **npm** (comes with Node)

## Run it on your computer

1. Open Terminal and go to this project folder:

   ```bash
   cd delhi-poker-room
   ```

2. Install dependencies (first time only):

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. In your browser, open **http://localhost:3000**

You should see the home page. Use the navigation to visit About, Games & Tables, and Contact.

## Build for production (optional)

```bash
npm run build
npm start
```

This checks that the site builds correctly and runs the production server locally.

## Deploy to Vercel (free)

1. Push this folder to a **GitHub** repository (or use Vercel’s direct upload if you prefer).
2. Go to [vercel.com](https://vercel.com) and sign up or log in.
3. Click **Add New Project** → import your GitHub repo (or upload the folder).
4. Vercel detects Next.js; leave defaults and click **Deploy**.
5. After a minute or two you get a URL like `your-project.vercel.app`.

Optional: add a custom domain in the Vercel project under **Settings → Domains**.

## Environment variable (WhatsApp button)

1. Copy `.env.local.example` to `.env.local`.
2. Set `NEXT_PUBLIC_WHATSAPP` to the venue WhatsApp number in international format **without** the plus sign (example for India: `919876543210`).
3. Restart `npm run dev` after changing `.env.local`.

## What to replace before launch

Search the codebase for comments marked `REPLACE:` or `ADD:`:

- Address and Google Maps iframe
- WhatsApp links and Instagram handle

Venue photos and **`/logo.png`** live in **`/public`**.

---

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, and GSAP.
