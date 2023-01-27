import express, { Request, Response } from 'express';
import binsService from './services/bins';
import requestsService from './services/requests';
import cors from 'cors';
require('express-async-errors');
const app = express();
app.use(express.json());
app.use(cors());

async function storeRequest(req: Request, binId: string) {
  const { request } = await requestsService.addRequest(binId, req);
  console.log('request added: ', request);
  return request
}

function emitRequest(request: any, binId: string) {
  const socket = app.get('io');

  // Emit the request data to any clients on the active bin Id
  const newRequestEventName = `new_request_to_${binId}`;
  console.log(newRequestEventName);
  socket.emit(newRequestEventName, { request });
}

// Retrieve bin
app.get('/bins/:binId', async (req: Request, res: Response) => {
  const { binId } = req.params;
  const binWithRequests = await binsService.getBinWithRequests(binId);
  return res.status(200).json(binWithRequests);
});

// Create bin
app.post('/bins', async (_: Request, res: Response) => {
  const binId = await binsService.createBin();
  return res.status(200).json({ binId });
});

// Update bin name
app.put('/bins/:binId', async (req: Request, res: Response) => {
  const { binId } = req.params;
  const updatedName = req.body['new_name'];
  await binsService.updateBinName(binId, updatedName);
  return res.status(200).json({ new_name: updatedName });
});

// Post a webhook
app.post(['/webhooks/:binId', '/webhooks/:binId/*'], async (req: Request, res: Response) => {
  const { binId } = req.params;
  const request = await storeRequest(req, binId);
  emitRequest(request, binId)

  return res.status(200).send();
});

// Get a webhook
app.get(['/webhooks/:binId', '/webhooks/:binId/*'], async (req: Request, res: Response) => {
  const { binId } = req.params;
  const request = await storeRequest(req, binId);
  emitRequest(request, binId)

  return res.status(200).send();
});

export default app;
