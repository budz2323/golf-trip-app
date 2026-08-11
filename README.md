# Golf Trip App

A self-contained app: one Render service serves both the page (everyone opens
this URL) and the API it syncs to. No Claude account needed for anyone.

## Deploy to Render

1. Push this whole folder (server.js, package.json, public/index.html) to a
   GitHub repo (e.g. `golf-trip-app`).
2. In Render: **New +** -> **Web Service** -> connect that repo.
3. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
4. Deploy. Render gives you a URL like `https://golf-trip-xxxx.onrender.com`.
5. Share that single URL with your group (text, group chat, whatever).
   That's it — no Claude link, no account, no per-device setup. Everyone
   opens the same page and edits the same live data.

## Notes

- Free tier sleeps after 15 min idle; first request after that takes
  ~30-60s to wake up (the "Waking up server..." badge covers this).
- Data lives in `data.json` on the server's disk. It survives sleep/wake,
  but a fresh deploy (pushing new code) will reset it.
- No auth on this - anyone with the link can read/write. Fine for a
  private group trip; don't reuse this pattern for anything sensitive.
- The artifact's "Advanced: use a different API server" box is now
  optional — leave it blank and it'll just talk to whichever server is
  hosting the page. Only touch it if you ever split the two apart again.
