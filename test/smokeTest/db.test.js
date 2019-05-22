const { client } = require('../../src/utils/passportQueries');

describe('database', () => {
  it('should be connected to server', async () => {
    const query = 'SELECT dateof(now()) FROM system.local';
    const result = await client.execute(query); 
    expect(result).toBeDefined();
  });
});
