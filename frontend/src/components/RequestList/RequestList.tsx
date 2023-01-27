import RequestItem from './RequestItem';
import { RequestType } from '../../types';
import formatPath from '../../utils/pathFormatter';

interface RequestListProps {
  binId: string;
  requests: RequestType[];
  activeRequestId: string;
  setActiveRequestId: Function;
}

function RequestList({
  binId,
  requests,
  activeRequestId,
  setActiveRequestId,
}: RequestListProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-neutral-500">Requests</h2>
      <ul className="mt-4 border-t border-neutral-200">
        {requests.length > 0 ? (
          requests.map((request) => (
            <RequestItem
              key={request.request_id}
              displayPath={formatPath(binId, request.path)}
              request={request}
              active={activeRequestId === request.request_id}
              setActiveRequestId={setActiveRequestId}
            />
          ))
        ) : (
          <div className="mt-4 animate-pulse text-amber-600">
            Waiting for requests
          </div>
        )}
      </ul>
    </div>
  );
}

export default RequestList;
