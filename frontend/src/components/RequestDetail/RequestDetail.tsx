import { JsonViewer } from '@textea/json-viewer';
import { methodColors, borderColors, bgColors } from '../../utils/colors';
import { RequestType } from '../../types';
import datetimeToString from '../../utils/dateFormatter';
import formatPath from '../../utils/pathFormatter';

interface RequestDetailProps {
  binId: string;
  request: RequestType;
}

function RequestDetail({ binId, request }: RequestDetailProps) {
  return (
    <div
      className={`rounded-xl border bg-white ${borderColors[request.method]}`}
    >
      <div
        className={`flex items-baseline justify-between rounded-t-xl border-b py-3 px-6 font-mono ${
          borderColors[request.method]
        } ${bgColors[request.method]}`}
      >
        <h2 className="text-lg font-semibold text-neutral-800">
          <span className={`${methodColors[request.method]}`}>
            {request.method}
          </span>
          <span className="ml-2">{formatPath(binId, request.path)}</span>
        </h2>
        <span className="text-sm text-neutral-500">
          {datetimeToString(request.created_at)}
        </span>
      </div>
      <div
        className={`border-b px-6 pt-6 pb-8 ${borderColors[request.method]}`}
      >
        <h3 className="mb-4 text-xl font-semibold text-neutral-500">Headers</h3>
        <JsonViewer value={request.data.headers} />
      </div>
      <div className="px-6 pt-6 pb-8">
        <h3 className="mb-4 text-xl font-semibold text-neutral-500">Payload</h3>
        {request.data.body ? (
          <JsonViewer value={request.data.body} />
        ) : (
          <p className="text-neutral-500">Payload empty</p>
        )}
      </div>
    </div>
  );
}

export default RequestDetail;
