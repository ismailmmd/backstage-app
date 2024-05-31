import { helloWorldPlugin } from './plugin';

describe('hello-world', () => {
  it('should export plugin', () => {
    expect(helloWorldPlugin).toBeDefined();
  });
});
