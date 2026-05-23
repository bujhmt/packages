# @bujhmt — public packages

Монорепо на [Nx](https://nx.dev) для публічних TypeScript-бібліотек, які виносяться
з проєктів і реюзаються всюди. Кожен пакет публікується в публічний npm під scope
[`@bujhmt`](https://www.npmjs.com/~bujhmt).

> Зараз `packages/` порожній — це чистий старт. Додавай реальні ліби генератором (нижче).

## Передумови

- Node 20+
- npm (репо використовує npm workspaces)

```bash
npm install
```

## Створити нову бібліотеку

```bash
# Публікована ліба (потрапляє в реліз, scope:public)
npx nx g @nx/js:lib packages/<name> \
  --publishable \
  --importPath=@bujhmt/<name> \
  --bundler=vite \
  --unitTestRunner=vitest \
  --linter=eslint \
  --tags=scope:public
```

Для **внутрішнього** хелпера, який не публікується (доступний усім публічним лібам,
але сам не релізиться), додай у його `package.json` `"private": true` і тег `scope:shared`.

## Щоденні команди

```bash
npx nx run-many -t build           # зібрати всі пакети
npx nx run-many -t test            # тести
npx nx run-many -t lint typecheck  # лінт + перевірка типів
npx nx affected -t build test      # тільки те, що зачепили зміни (для CI)
npx nx graph                       # граф залежностей
```

## Module boundaries

Залежності між пакетами обмежені тегами через `@nx/enforce-module-boundaries`
(див. `eslint.config.mjs`):

| Тег            | Кому призначений            | Може залежати від         |
| -------------- | --------------------------- | ------------------------- |
| `scope:shared` | внутрішні хелпери (private) | `scope:shared`            |
| `scope:public` | публіковані бібліотеки      | `scope:shared`, `scope:public` |

Порушення (наприклад, публічна ліба тягне щось не з цих тегів) ловиться на `nx lint`.

## Публікація

`nx release` керує версіонуванням і публікацією. Кореневий пакет
(`@bujhmt/source`) виключений з релізів — релізяться лише справжні пакети.

```bash
# Локальна репетиція в Verdaccio (нічого не йде в реальний npm)
npx nx local-registry            # запустити локальний registry на :4873
npx nx release --dry-run         # подивитися, що зміниться

# Реальний реліз у публічний npm (потрібен npm login)
npx nx release                   # підняти версії, тег, changelog
npx nx release publish           # опублікувати
```

Перед першим релізом переконайся, що залогінений: `npm whoami` / `npm login`.
Публічні scoped-пакети публікуються з `--access public` (Nx робить це автоматично,
коли в `package.json` пакета вказано `"publishConfig": { "access": "public" }`).

## Структура

```
packages/            # сюди йдуть бібліотеки (поки порожньо)
nx.json              # конфіг Nx: плагіни, release, кеш
tsconfig.base.json   # базовий TS-конфіг (customConditions: @bujhmt/source)
eslint.config.mjs    # лінт + module boundaries
.verdaccio/          # конфіг локального registry для тесту публікації
```
