import { DiscoveryApi, FetchApi } from "@backstage/core-plugin-api";
import { HelloWorldApi } from "./HelloWorlApi";

export class HelloWorldClient implements HelloWorldApi {
    private readonly discoveryApi: DiscoveryApi;
    private readonly fetchApi: FetchApi;

    public constructor(options: {
        discoveryApi: DiscoveryApi;
        fetchApi: FetchApi;
    }) {
        this.discoveryApi = options.discoveryApi;
        this.fetchApi = options.fetchApi;
    }

    public async getAll(): Promise<{ key: string; value: string; }[]> {
        return this.request<{ key: string; value: string; }[]>('notifications');
    }

    private async request<T>(path: string, init?: any): Promise<T> {
        const baseUrl = `${await this.discoveryApi.getBaseUrl('hello-world')}/`;
        const url = new URL(path, baseUrl);

        const response = await this.fetchApi.fetch(url.toString(), init);
        console.log('response', response);

        if (!response.ok) {
          console.log('ERROR------', response);
        }

        return response.json() as Promise<T>;
      }
}
