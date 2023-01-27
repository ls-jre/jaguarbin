import { methodColors, hoverColors, bgColors } from '../../utils/colors';
import formatDate from '../../utils/dateFormatter';
import { RequestType } from '../../types';

interface RequestItemProps {
  displayPath: string;
  request: RequestType;
  active: boolean;
  setActiveRequestId: Function;
}

function RequestItem({
  displayPath,
  request,
  active,
  setActiveRequestId,
}: RequestItemProps) {
  const selectRequest = () => {
    setActiveRequestId(request.request_id);
  };

  return (
    <li>
      <button
        type="button"
        className={`w-full cursor-pointer border-b border-neutral-200 py-4 px-2 text-left font-mono ${
          active && bgColors[request.method]
        } ${hoverColors[request.method]}`}
        onClick={selectRequest}
      >
        <p>
          <span className={`text-sm ${methodColors[request.method]}`}>
            {request.method}
          </span>
          <span className="ml-1 text-sm text-neutral-700">{displayPath}</span>
        </p>
        <p className="mt-1 text-xs text-neutral-400">
          {formatDate(request.created_at)}
        </p>
      </button>
    </li>
  );
}

export default RequestItem;
