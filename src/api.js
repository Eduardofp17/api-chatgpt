import {once} from 'node:events';
import {createServer} from 'node:http';

const port = 3000;

async function gptRoute(request, response) {
    try {
      let requestBody = '';
  
      request.on('data', (chunk) => {
        requestBody += chunk;
      });
  
      request.on('end', () => {
        requestBody = JSON.parse(requestBody);
  
        if (requestBody.prompt == '' || !requestBody.prompt) {
          response.writeHead(400);
          response.end(JSON.stringify({ error: 'Empty body, please fill the field.' }));
        } else {
          response.end('ok');
        }
      });
    } catch (error) {
      response.writeHead(500);
      response.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
  }
  
  
  
async function handler(request, response) {
    if(request.url === '/test-gpt-api' && request.method === 'POST') {
        return gptRoute(request, response);
    }
    response.end('hello world');
}

const app = createServer(handler).listen(port, () => console.log(`Listening at: ${port} port`));

export {app};