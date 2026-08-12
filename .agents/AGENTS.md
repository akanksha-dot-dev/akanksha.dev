## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)


## Autonomous Development (Kramak)
When you see "Start": read .kramak/spec/BOOTSTRAP.md and follow it.

### Kramak Strict Execution Rules
1. **Single Phase Per Session**: Never collapse Planning, Execution, and Audit into a single session.
2. **Handoff Handshake**: Upon completing Planning, update `state.json` (`phase: "executing"`), set `nextAction`, and output ONLY the single `nextAction` line.
3. **Git Branching (Step 4)**: Always run `git checkout -b pipeline/batch-XX` and set `state.currentBranch` before drafting work items.
4. **Log Preservation**: Always verify append targets when writing to `PLANNING-LOG.md` to prevent overwriting past batch logs.
