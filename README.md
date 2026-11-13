# sveltekit-supabase-crud

SvelteKit app with a home page, a shop page that loads products from a public HTTP API, a commands page that stores command strings in Supabase and runs one on the server, and a route that echoes the request `user-agent` header. The npm package name is `sveltekit-supabase-crud` (`private`, version `0.0.1`).

The home page heading is "SvelteKit/Supabase CRUD, API fetch, Headers, and maybe...0Auth". The source does not implement an OAuth flow.

## Prerequisites

- Node.js and npm. `package.json` does not set an `engines` field. `.npmrc` sets `engine-strict=true`. `npm ci` completed with Node.js v22.23.4 and npm 10.9.9.
- A Supabase project for `/commands` and `/api`. Those modules create a client with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. `dotenv` loads a `.env` file from the project root when those modules load. `.gitignore` ignores `.env` and `.env.*` (it keeps `.env.example`, which is not in the repo).
- The Supabase calls use a table named `commands`. Inserts write `id` and `command`. Updates set `command` where `id` matches. Deletes match `id`. Reads use `select('*')`.
- `/shop` calls `https://dummyjson.com/products?limit=10` while the page loads.

Create a root `.env` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Fill in the Supabase project URL and anon key. Leave this file uncommitted.

## Install, build, run, and test

`package.json` scripts are `dev` (`vite dev`), `build` (`vite build`), and `preview` (`vite preview`). There is no test script.

```bash
npm ci
npm run dev
npm run build
npm run preview
```

Dev server on loopback port 5173:

```bash
npm run dev -- --host 127.0.0.1 --port 5173
```

Then open `http://127.0.0.1:5173/`.

`npm run build` uses `@sveltejs/adapter-auto` from `svelte.config.js`. With the Supabase variables unset, prerender prints `Error: supabaseUrl is required` for the Supabase modules, and the build still exits 0. The adapter then prints that it could not detect a supported production environment.

Preview that build:

```bash
npm run preview -- --host 127.0.0.1 --port 4173
```

## Usage

`src/routes/+layout.svelte` links to `/`, `/shop`, `/commands`, and `/what-is-my-user-agent`.

### Home

`/` renders a figure (alt text "Wolf and dark moon", caption "Super Mondo Ultra Mega Software"), the heading quoted above, and links to SvelteKit and Supabase.

### Shop

`/shop` loads the DummyJSON payload and renders each product's first image, `title`, and `description`. The request uses `limit=10`.

### User agent

`GET /what-is-my-user-agent` returns JSON with the request `user-agent` header:

```bash
curl -sS http://127.0.0.1:5173/what-is-my-user-agent
```

```json
{"userAgent":"<user-agent header>"}
```

The same path responded on the preview server at `http://127.0.0.1:4173/what-is-my-user-agent`.

### Commands

`/commands` loads every `commands` row on the server and lists `command` with an input, plus Add, Edit, Delete, and Execute.

With the Supabase variables unset, `GET /commands` and `GET /api` return HTTP 500.

Add creates a UUID v4 in the browser and `POST`s it to `/api`:

```bash
curl -sS -X POST http://127.0.0.1:5173/api \
  -H 'content-type: application/json' \
  -d '{"id":"00000000-0000-4000-8000-000000000000","command":"your-command"}'
```

`src/routes/api/+server.js` inserts `{ id, command }` and returns status 201 with `{"message":"Success"}`. The insert call is not awaited.

Edit sends `PUT /api/:id` with the command text:

```bash
curl -sS -X PUT http://127.0.0.1:5173/api/00000000-0000-4000-8000-000000000000 \
  -H 'content-type: application/json' \
  -d '{"command":"your-command"}'
```

`src/routes/api/[id]/+server.js` updates `command` where `id` equals the path parameter, then returns status 201 with `{"message":"Success"}`. The update call is not awaited.

Delete:

```bash
curl -sS -X DELETE http://127.0.0.1:5173/api/00000000-0000-4000-8000-000000000000
```

That handler deletes the row with that `id` and returns the same success response. The delete call is not awaited.

`GET /api` selects all `commands` rows and returns status 200 with those rows passed to `Response`.

Execute `POST`s the command string to `/api/spawn/<command>`:

```bash
curl -sS -X POST http://127.0.0.1:5173/api/spawn/your-command \
  -H 'content-type: application/json' \
  -d '{"command":"your-command"}'
```

`src/routes/api/spawn/[command]/+server.js` reads `command` from the JSON body (the path segment is not what it spawns). It splits that string on spaces, runs the first token with `child_process.spawn`, and uses the rest as arguments. Status 201; the body is the JSON-encoded combined stdout and stderr. The route has no auth check. Run it only on a machine where that is acceptable.

In `src/routes/commands/+page.svelte`, the Edit, Delete, and Execute handlers are called while each row is rendered, because the template invokes those functions directly.

`src/routes/commands/+page.server.js` exports `POST`. The page does not call that action. The handler references `uuidv4` and `req.body`, which that file does not define.

## Layout

```
src/app.html
src/routes/+layout.svelte
src/routes/+page.svelte
src/routes/shop/+page.js
src/routes/shop/+page.svelte
src/routes/commands/+page.server.js
src/routes/commands/+page.svelte
src/routes/what-is-my-user-agent/+server.js
src/routes/api/+server.js
src/routes/api/[id]/+server.js
src/routes/api/spawn/[command]/+server.js
static/favicon.png
svelte.config.js
vite.config.js
package.json
```

`svelte.config.js` registers `@sveltejs/adapter-auto`. `vite.config.js` registers the SvelteKit Vite plugin.

## License

This repository has no `LICENSE` file.
