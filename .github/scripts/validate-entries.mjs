// Copyright 2026 DXOS.org
//
// Validates that each repo listed in community-plugins.json has a latest GitHub Release
// containing a manifest.json asset whose Plugin.Meta is well-formed and uniquely identified.

import { readFile } from 'node:fs/promises';

const MANIFEST_PATH = new URL('../../community-plugins.json', import.meta.url);
const GITHUB_TOKEN = process.env.GH_TOKEN;
if (!GITHUB_TOKEN) {
  console.error('GH_TOKEN not set.');
  process.exit(1);
}

const gh = async (url) => {
  const response = await fetch(url, {
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${GITHUB_TOKEN}`,
      'x-github-api-version': '2022-11-28',
    },
  });
  if (!response.ok) {
    throw new Error(`${url} failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

const { plugins } = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
const failures = [];
const ids = new Map();

for (const { repo } of plugins) {
  try {
    const release = await gh(`https://api.github.com/repos/${repo}/releases/latest`);
    const manifestAsset = release.assets.find((a) => a.name === 'manifest.json');
    if (!manifestAsset) {
      failures.push(`${repo}: latest release has no manifest.json asset`);
      continue;
    }
    const manifest = await fetch(manifestAsset.browser_download_url).then((r) => r.json());
    if (typeof manifest.id !== 'string' || typeof manifest.name !== 'string') {
      failures.push(`${repo}: manifest.json is missing required Plugin.Meta fields (id, name)`);
      continue;
    }
    const moduleFile = manifest.moduleFile ?? 'plugin.mjs';
    if (!release.assets.find((a) => a.name === moduleFile)) {
      failures.push(`${repo}: latest release has no module asset named ${moduleFile}`);
      continue;
    }
    const prior = ids.get(manifest.id);
    if (prior) {
      failures.push(`${repo}: plugin id ${manifest.id} conflicts with ${prior}`);
      continue;
    }
    ids.set(manifest.id, repo);
    console.log(`ok  ${repo}  -> ${manifest.id} @ ${release.tag_name}`);
  } catch (error) {
    failures.push(`${repo}: ${error.message}`);
  }
}

if (failures.length > 0) {
  console.error('\nValidation failures:');
  for (const failure of failures) {
    console.error(`  - ${failure}`);
  }
  process.exit(1);
}
