import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { helloWorldPlugin, HelloWorldPage } from '../src/plugin';

createDevApp()
  .registerPlugin(helloWorldPlugin)
  .addPage({
    element: <HelloWorldPage />,
    title: 'Root Page',
    path: '/hello-world',
  })
  .render();
