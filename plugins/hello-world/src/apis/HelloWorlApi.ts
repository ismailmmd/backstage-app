import { createApiRef } from "@backstage/core-plugin-api";

export interface HelloWorldApi {
    getAll(): Promise<{ key: string, value: string }[]>;
}

export const helloWorldApiRef = createApiRef<HelloWorldApi>({
    id: 'plugin.hello-world.service',
  });
