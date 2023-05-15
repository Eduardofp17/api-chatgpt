import { describe, before, after, it } from 'node:test';
import { deepStrictEqual, strictEqual } from 'node:assert';
describe('Api workfow', () => {
    let server = {};

    before(async () => {
        server = (await import('./api.js')).app;
        await new Promise(resolve => server.once('listening', resolve))
    })

    it('should receive bad request given a empty body', async () => {
        const prompt = JSON.stringify({prompt: ''});
        const request = await fetch('http://localhost:3000/test-gpt-api', {
            method: 'POST',
            body: prompt
        })
        strictEqual(request.status, 400)
        const response = await request.json();
        deepStrictEqual(response, {error: 'Empty body, please fill the field.'})
    })
    after(done => server.close(done))
})