import { PluginDatabaseManager } from '@backstage/backend-common';
import { resolvePackagePath } from '@backstage/backend-plugin-api';
import { Knex } from 'knex';

const migrationsDir = resolvePackagePath(
  '@internal/backstage-plugin-hello-world-backend',
  'migrations',
);

export type KeyValue = {
  key: string;
  value: string;
}

export class HelloWorldStore {

  private constructor(private readonly db: Knex) { }

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

  async selectAll(): Promise<KeyValue[]> {
    const rows = await this.db<KeyValue>('key_value').select(['key', 'value']);

    return [{key: '1', value: 'John Doe'}, {key: '2', value: 'Jane Doe2'}, {key: '3', value: 'Jane Doe3'}, ...rows];
  }

  async insert(key: string, value: string): Promise<KeyValue> {
    await this.db<KeyValue>('key_value').insert({ key, value });
    return { key, value };
  }

  async delete(key: string): Promise<void> {
    await this.db<KeyValue>('key_value').where('key', key).delete();
  }

  async update(key: string, value: string): Promise<void> {
    await this.db<KeyValue>('key_value').where('key', key).update({ value });
  }
}
