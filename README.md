# DXOS Community Plugins

This repository is the source of truth for the list of community-authored plugins available in [DXOS Composer](https://composer.dxos.org).

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
4. Composer's registry picks up the new entry on the next load.

## Publishing a plugin

Use the [`@dxos/app-framework` Vite plugin](https://github.com/dxos/dxos/tree/main/packages/sdk/app-framework) to build your plugin. The `emitManifestPlugin` helper writes `dist/manifest.json` from your plugin's metadata so you can upload it as a release asset alongside the built module.

## Relationship to built-in (Official) plugins

The **Official** section of Composer's registry lists plugins that ship with Composer itself. The **Community** section — powered by this repo — lists third-party plugins that users install on demand.

## License

The manifest and tooling in this repository are MIT-licensed. Each listed plugin is governed by its own repository's license.
