# Contributing a Community Plugin

Thanks for your interest in publishing a plugin to Composer's community registry!

## Prerequisites

Before opening a PR, your plugin repository must meet the following requirements:

- [ ] **Public GitHub repository.** Private repos cannot be fetched by Composer clients.
- [ ] **Latest Release exists.** The DXOS registry resolves every entry by fetching the repo's latest GitHub Release.
- [ ] **Release has `manifest.json` asset.** Must contain valid `Plugin.Meta` (at minimum `id` and `name`) plus a `moduleFile` field naming the module asset. Built automatically by `emitManifestPlugin`.
- [ ] **Release has the module asset** named by `manifest.moduleFile` (defaults to `plugin.mjs`).
- [ ] **Plugin id is namespaced.** Use reverse-domain form, e.g. `com.example.my-plugin`. Ids must be globally unique across the registry.
- [ ] **No secrets or runtime analytics beyond what is disclosed.** The plugin will run in the user's browser with access to their space data.

## PR checklist

Open your PR against `main` with a single change: adding an entry to the `plugins` array of `community-plugins.json`. Use the [pull request template](.github/PULL_REQUEST_TEMPLATE.md).

```json
{ "repo": "owner/name" }
```

The CI workflow will:

1. Validate `community-plugins.json` against the JSON Schema.
2. Check that your repo exists, is public, and has a latest release with the required assets.
3. Check that your plugin `id` is unique within the registry.

## Review

Maintainers look at: plugin purpose, source quality, safety posture, and author responsiveness. We may ask for changes, request additional documentation (screenshots, threat model summary), or decline listings that don't fit the registry's scope.

## Removing or renaming a plugin

Open a PR to remove or rename the entry, with a short rationale. Note that plugin `id` renames break existing installs; consider using a new id and deprecating the old one instead.
