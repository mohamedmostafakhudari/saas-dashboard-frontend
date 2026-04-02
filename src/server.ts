import app from './app';
import { config } from './config/env';

app.listen(config.port, () => {
  console.log(`[server] Running in ${config.nodeEnv} mode`);
  console.log(`[server] Listening on http://localhost:${config.port}`);
});
