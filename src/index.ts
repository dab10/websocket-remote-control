import { httpServer } from "./http_server/index";
import "dotenv/config";
import { WebSocket, WebSocketServer, createWebSocketStream, Server } from "ws";
import { handler } from "./handler";


const HTTP_PORT = Number(process.env.HTTP_PORT) || 8181;
const WSS_PORT = Number(process.env.WSS_PORT) || 8080;

console.log(`Start static http server on http://localhost:${HTTP_PORT} !`);
httpServer.listen(HTTP_PORT);

const wsServer = new WebSocketServer({ port: WSS_PORT }, () => console.log(`Start web socket server on ws://localhost:${WSS_PORT} !`));

const onConnect = (wsClient: WebSocket) => {
  console.log('App ready to work');
  const duplex = createWebSocketStream(wsClient, { encoding: 'utf-8', decodeStrings: false });
  handler(duplex);  

  wsClient.on('close', () => {    
    duplex.destroy();
    console.log('Duplex stream closed \n');
  })
}

const exitApp = (wss: Server<WebSocket>) => {
  console.log('Closing web socket server...');
  wss.clients.forEach((item) => {
    item.close();
    console.log('Websocket connection closed');
  })
  wss.close();
  console.log('Web socket server closed \n');
}

wsServer.on('connection',  onConnect);

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => exitApp(wsServer));
