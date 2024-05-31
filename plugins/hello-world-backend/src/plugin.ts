import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './service/router';
import { HelloWorldStore } from './database/HelloWorldStore';

/**
 * helloWorldPlugin backend plugin
 *
 * @public
 */
export const helloWorldPlugin = createBackendPlugin({
  pluginId: 'hello-world',
  register(env) {
    env.registerInit({
      deps: {
        httpRouter: coreServices.httpRouter,
        logger: coreServices.logger,
        database: coreServices.database,
      },
      async init({
        httpRouter,
        logger,
        database,
      }) {

        const helloWorldModel = await HelloWorldStore.create({database});

        httpRouter.use(
          await createRouter({
            logger,
            helloWorldModel,
          }),
        );

        httpRouter.addAuthPolicy({
          path: '/health',
          allow: 'unauthenticated',
        });
      },
    });
  },
});
