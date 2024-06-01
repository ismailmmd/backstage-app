import {
  createApiFactory,
  createPlugin,
  createRoutableExtension,
  discoveryApiRef,
  fetchApiRef,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import { helloWorldApiRef } from './apis/HelloWorlApi';
import { HelloWorldClient } from './apis/HelloWorldClient';

export const helloWorldPlugin = createPlugin({
  id: 'hello-world',
  routes: {
    root: rootRouteRef,
  },
  apis: [
    createApiFactory({
      api: helloWorldApiRef,
      deps: { discoveryApi: discoveryApiRef, fetchApi: fetchApiRef },
      factory: ({ discoveryApi, fetchApi }) =>
        new HelloWorldClient({ discoveryApi, fetchApi }),
    }),
  ]
});

export const HelloWorldPage = helloWorldPlugin.provide(
  createRoutableExtension({
    name: 'HelloWorldPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
