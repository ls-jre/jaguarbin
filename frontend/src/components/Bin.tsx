import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import Header from './Header';
import BinMetadata from './BinMetadata/BinMetadata';
import RequestList from './RequestList/RequestList';
import RequestDetail from './RequestDetail/RequestDetail';

import binService from '../services/binService';

import { BinType, RequestType } from '../types';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const socket = io(SOCKET_URL);

function Bin() {
  const navigate = useNavigate();

  const [bin, setBin] = useState<BinType | null>(null);
  const [activeRequestId, setActiveRequestId] = useState('');

  const activeRequest = bin?.requests.find(
    (request: RequestType) => request.request_id === activeRequestId
  );

  const { binId } = useParams();
  if (!binId) return null;

  // Initial data fetch for bin
  useEffect(() => {
    const fetchBin = async () => {
      const binData = await binService.getBin(binId);
      if (!binData) navigate('/');

      setBin(binData);

      if (binData.requests.length > 0) {
        setActiveRequestId(binData.requests[0].request_id);
      }
    };

    fetchBin();
  }, []);

  // Use socket.io to listen for new requests to the active bin
  const newRequestEventName = `new_request_to_${binId}`;

  useEffect(() => {
    socket.on(
      newRequestEventName,
      (data: { binId: string; request: RequestType }) => {
        // Prepend the newly-received request to the local bin's requests
        if (bin) {
          const newBin = {
            ...bin,
            requests: [data.request, ...bin.requests],
          };
          setBin(newBin);
        }
      }
    );

    // Stop listening for new requests when active bin is closed
    return () => {
      socket.off(newRequestEventName);
    };
  });

  return (
    <div className="mx-auto mt-12 mb-10 max-w-5xl p-2 sm:p-4">
      <Header />
      {bin && <BinMetadata binId={binId} binName={bin.name} />}
      <div className="mt-8 grid grid-cols-12 gap-4 animate-in fade-in slide-in-from-bottom-1 duration-700 sm:gap-10">
        <div className="col-span-4 mt-2">
          {bin && (
            <RequestList
              binId={binId}
              requests={bin.requests}
              activeRequestId={activeRequestId}
              setActiveRequestId={setActiveRequestId}
            />
          )}
        </div>
        <div className="col-span-8 animate-in fade-in slide-in-from-bottom-1 duration-500">
          {activeRequestId && (
            <RequestDetail binId={binId} request={activeRequest} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Bin;
