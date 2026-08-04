import type { IncomingMessage } from 'node:http';
import type { Plugin } from 'vite';

type Route = {
  path: string;
  methods: string[];
  module: string;
};

// netlify.toml의 redirects와 동일한 매핑을 로컬 dev 서버에서 재현합니다.
const routes: Route[] = [
  {
    path: '/api/pre-register',
    methods: ['POST'],
    module: '/netlify/functions/pre-register.ts',
  },
  {
    path: '/api/pre-register-count',
    methods: ['GET'],
    module: '/netlify/functions/pre-register-count.ts',
  },
  {
    path: '/api/withdraw',
    methods: ['POST'],
    module: '/netlify/functions/withdraw.ts',
  },
];

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk: Buffer | string) => {
      data += chunk.toString();
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

export function localApiPlugin(): Plugin {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = (req.url ?? '').split('?')[0];
        const route = routes.find((item) => item.path === pathname);

        if (!route) {
          next();
          return;
        }

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        const method = req.method ?? 'GET';

        if (!route.methods.includes(method)) {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        try {
          const body = method === 'GET' ? null : await readBody(req);
          const { handler } = await server.ssrLoadModule(route.module);
          const result = await handler({
            httpMethod: method,
            body,
          });

          res.statusCode = result.statusCode;
          for (const [key, value] of Object.entries(result.headers ?? {})) {
            res.setHeader(key, value as string);
          }
          res.end(result.body);
        } catch (err) {
          console.error(`[local-api] ${route.path} error:`, err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Internal server error' }));
        }
      });
    },
  };
}
