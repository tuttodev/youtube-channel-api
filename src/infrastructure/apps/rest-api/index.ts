import { Server } from './src/server'

try {
  const port = process.env.PORT || 2426
  new Server(port).start()
} catch (e) {
  console.log(e);
  process.exit(1);
}

process.on('uncaughtException', err => {
  console.log('uncaughtException', err);
  process.exit(1);
});