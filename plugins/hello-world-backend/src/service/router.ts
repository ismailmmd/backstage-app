import { errorHandler } from '@backstage/backend-common';
import { LoggerService } from '@backstage/backend-plugin-api';
import express from 'express';
import Router from 'express-promise-router';
import { HelloWorldStore } from '../database/HelloWorldStore';

export interface RouterOptions {
  logger: LoggerService;
  helloWorldModel: HelloWorldStore;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;

  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  router.get('/notifications', (_, res) => {
    const data = options.helloWorldModel.selectAll();
    res.json(data);
  });

  router.post('/notifications', async (req, res) => {
    const { key, value } = req.body;
    const data = await options.helloWorldModel.insert(key, value);
    res.json(data);
  });

  router.delete('/notifications/:key', async (req, res) => {
    const { key } = req.params;
    await options.helloWorldModel.delete(key);
    res.status(204).end();
  });

  router.put('/notifications/:key', async (req, res) => {
    const { key } = req.params;
    const { value } = req.body;
    await options.helloWorldModel.update(key, value);
    res.status(204).end();
  });

  router.use(errorHandler());
  return router;
}
