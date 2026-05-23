# @bujhmt/packages

Monorepo of small, reusable packages published to npm under the
[`@bujhmt`](https://www.npmjs.com/~bujhmt) scope. Built with [Nx](https://nx.dev).

## Packages

| Package | Description |
| ------- | ----------- |
| [`@bujhmt/nx-kysely-migrations`](packages/nx-kysely-migrations) | Nx generator that scaffolds [Kysely](https://kysely.dev) migration files (`nx g @bujhmt/nx-kysely-migrations:create`). |

## Develop

```bash
npm install
npx nx run-many -t build lint    # build & lint all projects
npx nx release                   # version + changelog + publish (run from root)
```
