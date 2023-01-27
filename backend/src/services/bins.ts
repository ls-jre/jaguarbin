/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestModel } from '../db/models/request';
import { pgPool } from '../db/pg/pg_pool';
import { v4 as uuidv4 } from 'uuid';

const getBinWithRequestMetadata = async (binId: string) => {
  const query =
    'SELECT * FROM bins AS b LEFT JOIN requests AS r ON r.bin_id_fk = b.id WHERE b.bin_id = $1 ORDER BY created_at DESC';

  const { rows } = await pgPool.query(query, [binId]);
  if (rows.length === 0) return null;

  const { bin_id, name } = rows[0];

  const requestsMetadata = rows.map((row: any) => {
    const { id, bin_id_fk, bin_id, name, ...remaining } = row; // Omit Postgres primary key (id)
    return remaining;
  });

  return {
    bin_id,
    name,
    requests: requestsMetadata[0].request_id ? requestsMetadata : [],
  };
};

const getBinRequestsData = async (binId: string) => {
  // Mongoose model already removes the db ID; no need to do it here
  const requests = await RequestModel.find({
    bin_id: binId,
  });
  if (requests.length === 0) return null;

  const requestsData: any = {};

  requests.forEach((request) => {
    requestsData[request.request_id] = request.data;
  });

  return requestsData;
};

const getBinWithRequests = async (binId: string) => {
  const binWithRequests = await getBinWithRequestMetadata(binId);
  const binRequestsData = await getBinRequestsData(binId);
  if (!binWithRequests) return null;

  binWithRequests.requests = binWithRequests.requests.map((request) => {
    return {
      ...request,
      data: binRequestsData[request.request_id],
    };
  });

  return binWithRequests;
};

const createBin = async (name = 'My Bin') => {
  const binId = uuidv4();
  const query = 'INSERT INTO bins (bin_id, name) VALUES ($1, $2)';
  await pgPool.query(query, [binId, name]);
  return binId;
};

const updateBinName = async (binId: string, updatedName: string) => {
  const query = 'UPDATE bins SET name = $1 WHERE bins.bin_id = $2';
  await pgPool.query(query, [updatedName, binId]);
  return updatedName;
};

export default {
  getBinWithRequests,
  createBin,
  updateBinName,
};
