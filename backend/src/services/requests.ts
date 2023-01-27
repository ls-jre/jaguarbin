/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from 'express';
import { pgPool } from '../db/pg/pg_pool';
import { v4 as uuidv4 } from 'uuid';
import { RequestModel } from '../db/models/request';

const addRequestPG = async (binId: string, req: Request) => {
  const requestId = uuidv4();

  const query1 = 'SELECT * FROM bins WHERE bin_id = $1';

  const { rows } = await pgPool.query(query1, [binId]);

  const { id: binIdFK } = rows[0];

  const query2 =
    'INSERT INTO requests (bin_id_fk, request_id, header_accept, header_content_length, header_content_type, header_host, header_user_agent, method, path) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';

  const accept = req.get('Accept');
  const contentLength = req.get('Content-Length');
  const contentType = req.get('Content-Type');
  const host = req.get('Host');
  const userAgent = req.get('User-Agent');
  const method = req.method;
  const path = req.path;

  pgPool.query(query2, [
    binIdFK,
    requestId,
    accept,
    contentLength,
    contentType,
    host,
    userAgent,
    method,
    path,
  ]);

  return { requestId };
};

const addRequestMongo = async (
  binId: string,
  req: Request,
  requestId: string
) => {
  const newRequest = new RequestModel({
    bin_id: binId,
    request_id: requestId,
    data: {
      headers: req.headers,
      body: req.body,
    },
  });

  await newRequest.save();
};

const getRequest = async (requestId: string) => {
  const query = 'SELECT * FROM requests WHERE request_id = $1';
  const { rows } = await pgPool.query(query, [requestId]);
  const rawRequestData = rows[0];
  const { id, bin_id_fk, ...requestData } = rawRequestData;
  const requestMongo = await RequestModel.findOne({ request_id: requestId });
  requestData.data = requestMongo?.data;
  return requestData;
};

// const addRequestMongo = async (binId: string, req: Request) => {};
const addRequest = async (binId: string, req: Request) => {
  const { requestId } = await addRequestPG(binId, req);
  await addRequestMongo(binId, req, requestId);
  const request = await getRequest(requestId);
  return { request };
};

export default { addRequest };
