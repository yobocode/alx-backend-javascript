import express from 'express';
import mapRoutes from './routes';

const app = express();
const host = '127.0.0.1';
const port = 1245;

mapRoutes(app);
app.listen(port, host, () => {
  process.stdout.write(`Server listening on http://${host}:${port}/`);
});

export default app;
