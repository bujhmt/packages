import { formatFiles, generateFiles, joinPathFragments, Tree } from '@nx/devkit';

import { CreateMigrationGeneratorSchema } from './schema';

function timestamp(): string {
    const now = new Date();
    const pad = (value: number): string => String(value).padStart(2, '0');

    return [
        now.getUTCFullYear(),
        pad(now.getUTCMonth() + 1),
        pad(now.getUTCDate()),
        pad(now.getUTCHours()),
        pad(now.getUTCMinutes()),
        pad(now.getUTCSeconds()),
    ].join('');
}

export async function createMigrationGenerator(tree: Tree, options: CreateMigrationGeneratorSchema): Promise<void> {
    const { path, name } = options;
    const filename = `${timestamp()}_${name.toLowerCase()}`;

    generateFiles(tree, joinPathFragments(__dirname, 'files'), path, { filename });
    await formatFiles(tree);
}

export default createMigrationGenerator;
