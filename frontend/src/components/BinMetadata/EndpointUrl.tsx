import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';

const WEBHOOK_HOST = import.meta.env.VITE_WEBHOOK_HOST;

interface EndpointUrlProps {
  binId: string;
}

function EndpointUrl({ binId }: EndpointUrlProps) {
  const endpoint = `${WEBHOOK_HOST}/${binId}`;

  const notifyCopyEndpoint = () =>
    toast('Copied endpoint', { duration: 2000, icon: '🐆' });

  return (
    <div className="mt-3 mb-6 flex items-center">
      <CopyToClipboard text={endpoint} onCopy={notifyCopyEndpoint}>
        <div className="group cursor-pointer">
          <span className="font-mono text-neutral-500 group-hover:text-amber-600">
            {endpoint}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="ml-2 mb-1 inline-block h-6 w-6 text-neutral-400 group-hover:text-amber-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
              />
            </svg>
          </span>
        </div>
      </CopyToClipboard>
    </div>
  );
}

export default EndpointUrl;
