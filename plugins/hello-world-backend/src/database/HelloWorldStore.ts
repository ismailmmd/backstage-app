import { PluginDatabaseManager } from '@backstage/backend-common';
import { resolvePackagePath } from '@backstage/backend-plugin-api';
import { Knex } from 'knex';

const migrationsDir = resolvePackagePath(
    '@internal/backstage-plugin-hello-world-backend',
    'migrations',
  );

export class HelloWorldStore {

    private constructor(private readonly db: Knex) {}

    static async create(options: {
        database: PluginDatabaseManager;
      }): Promise<HelloWorldStore> {
        const { database } = options;
        const client = await database.getClient();

        console.log('Running migrations', migrationsDir);

          await client.migrate.latest({
            directory: migrationsDir,
          });

        return new HelloWorldStore(client);
      }
}
