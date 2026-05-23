# @bujhmt/nx-kysely-migrations

Nx generator for scaffolding [Kysely](https://kysely.dev) migration files.

Kysely has no built-in "make migration", so files are created by hand: pick a sortable
timestamp prefix, name the file, write the `up`/`down` boilerplate. This does it in one command.

## Usage

```bash
# positional
npx nx g @bujhmt/nx-kysely-migrations:create <path> <name>
npx nx g @bujhmt/nx-kysely-migrations:create apps/api/src/db/migrations create_users

# named flags (equivalent)
npx nx g @bujhmt/nx-kysely-migrations:create --path=apps/api/src/db/migrations --name=create_users
```

Creates `<path>/<timestamp>_<name>.ts` with an `up`/`down` skeleton. The timestamp is a
compact UTC `YYYYMMDDHHmmss` — filesystem-safe and alphabetically sorted, which is how
Kysely orders migrations. Omit an argument and the generator prompts for it.

| Option | Index | Required | Description                          |
| ------ | ----- | -------- | ------------------------------------ |
| `path` | 0     | yes      | Folder to place the migration in     |
| `name` | 1     | yes      | Migration name (e.g. `create_users`) |

## In another workspace

```bash
npm i -D @bujhmt/nx-kysely-migrations
```

Running the migrations themselves is up to your project (Kysely `Migrator` +
`FileMigrationProvider` pointed at the folder above) — this plugin only creates files.

## Develop

```bash
nx build nx-kysely-migrations   # CommonJS output + templates + generators.json
nx lint nx-kysely-migrations
```

The template lives at `src/generators/create/files/__filename__.ts.template`. The
`.template` suffix keeps it out of `tsc` (so the `kysely` import doesn't break the build)
and lets it ship to `dist` as an asset; `generateFiles` strips the suffix on generation.
