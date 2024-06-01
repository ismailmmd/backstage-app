import { useApi } from '@backstage/core-plugin-api';
import useAsyncRetry from 'react-use/esm/useAsyncRetry';
import { HelloWorldApi, helloWorldApiRef } from '../apis/HelloWorlApi';

/** @public */
export function useHelloWorldApi<T>(
  f: (api: HelloWorldApi) => Promise<T>,
  deps: any[] = [],
) {
  const notificationsApi = useApi(helloWorldApiRef);

  return useAsyncRetry(async () => {
    return await f(notificationsApi);
  }, deps);
}
