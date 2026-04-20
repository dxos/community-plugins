## Plugin registration

<!-- Use a descriptive title like: "Add <plugin name> (<owner/repo>)" -->

### Entry

- **Repo:** `owner/name`
- **Plugin id:** `com.example.my-plugin`
- **Plugin name:** `My Plugin`
- **Short description:** What does this plugin do?
- **Latest release URL:** https://github.com/owner/name/releases/latest

### Checklist

- [ ] Repo is public.
- [ ] Latest GitHub Release contains `manifest.json` and the module asset named in `manifest.moduleFile`.
- [ ] Plugin `id` is namespaced (reverse-domain) and unique within this registry.
- [ ] I have read [CONTRIBUTING.md](../CONTRIBUTING.md).
- [ ] Plugin does not exfiltrate user data or include unsolicited analytics. If it does call out to a server, the destination(s) are documented in the plugin's README.

### Notes for reviewers

<!-- Anything reviewers should know, screenshots, demos, etc. -->
