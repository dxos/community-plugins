# DXOS Community Plugins

This repository is the source of truth for the list of community-authored plugins available in [DXOS Composer](https://composer.space).

The contents of `community-plugins.json` are fetched at runtime by Composer's plugin registry and rendered in the **Community** section. Merging a PR here is equivalent to admitting a plugin into the registry.

## How it works

1. A plugin author publishes a GitHub Release on their own repository containing two assets:
   - `manifest.json` — plugin metadata (`id`, `name`, `description`, `icon`, etc.) plus a `moduleFile` pointer.
   - `plugin.mjs` — the built ES module that Composer will dynamically import.
2. The author opens a PR against this repo adding one entry to `community-plugins.json`:
   ```json
   { "repo": "owner/repo" }
   ```
3. A maintainer reviews the PR (see [CONTRIBUTING.md](CONTRIBUTING.md)) and merges.
4. Composer's registry picks up the new entry within ~5 minutes (the edge cache refreshes on that interval).

## Building a community plugin

[`plugin-excalidraw`](https://github.com/dxos/plugin-excalidraw) is the canonical reference implementation — use it as your starting point.

### Vite configuration

Use `composerPlugin` from `@dxos/app-framework/vite-plugin` in your `vite.config.ts`. It accepts an `entry` path and a `meta` object, and automatically emits `dist/manifest.json` alongside the built `dist/plugin.mjs`. See `plugin-excalidraw/vite.config.ts` for the exact setup.

All `@dxos/*` dependencies must be pinned to the **same version** the Composer host is running. Track the `main` dist-tag on npm and bump them in lockstep.

### Local development

During development you can load your plugin from a local Vite dev server without publishing a release. In Composer, open Settings → Plugins → **Load by URL** and point it at your dev server (e.g. `http://localhost:5173/src/plugin.tsx`).

> **Note:** This only works against a bundled build of Composer — it does not work when running Composer from its own Vite dev server.

### Creating a release

Add a GitHub Actions workflow (`.github/workflows/release.yml`) triggered by `workflow_dispatch` with a `bump` input (`patch` / `minor` / `major`). The workflow should: bump the version with `npm version`, run `vite build`, commit and tag the result, then create a GitHub release attaching `dist/plugin.mjs` and `dist/manifest.json` as assets. See `plugin-excalidraw/.github/workflows/release.yml` for the full workflow.

### Register with the community registry

Once you have at least one release published, open a PR adding your entry to `community-plugins.json`:

```json
{ "repo": "your-github-username/your-plugin-repo" }
```

## Relationship to built-in (Official) plugins

The **Official** section of Composer's registry lists plugins that ship with Composer itself. The **Community** section — powered by this repo — lists third-party plugins that users install on demand.

## License

The manifest and tooling in this repository are MIT-licensed. Each listed plugin is governed by its own repository's license.
