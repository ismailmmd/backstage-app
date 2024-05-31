import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const helloWorldPlugin = createPlugin({
  id: 'hello-world',
  routes: {
    root: rootRouteRef,
  },
});

export const HelloWorldPage = helloWorldPlugin.provide(
  createRoutableExtension({
    name: 'HelloWorldPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
